const CACHE_NAME = 'pulperia-v16';
const ESPERA_RED_MS = 4000;   // si la red tarda más que esto y ya hay copia guardada, se usa la copia
const urlsToCache = [
  './',
  './index.html',
  './icono-192.png',
  './icono-512.png'
];
// Además de los archivos de la propia app, solo se guardan las fuentes de Google (la letra Inter)
const HOSTS_PERMITIDOS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);   // borra la copia vieja (v13), que guardaba todas las fotos
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Solo se atienden pedidos de lectura (GET). Los pedidos al catálogo de Google (POST) van directo a internet.
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const esMia = url.origin === self.location.origin;
  // Las fotos (Loyverse y el servicio de fotos) y cualquier otro sitio van directo: el navegador ya las guarda a su manera.
  if (!esMia && HOSTS_PERMITIDOS.indexOf(url.hostname) === -1) return;

  const intento = fetch(req);

  // Cuando la red responde (aunque sea tarde), se guarda la respuesta si es buena, para la próxima vez.
  const registro = intento.then(response => {
    const buena = response && ((response.ok && (response.type === 'basic' || response.type === 'cors')) ||
                  (response.type === 'opaque' && url.hostname === 'fonts.googleapis.com'));
    if (!buena) return;
    const copia = response.clone();   // se copia de inmediato, antes de que la página lea la respuesta
    return caches.open(CACHE_NAME).then(cache => cache.put(req, copia)).catch(() => {});
  }, () => {});
  event.waitUntil(registro);

  event.respondWith((async () => {
    try {
      // La red tiene ESPERA_RED_MS para responder; si no, se usa la copia guardada.
      return await Promise.race([
        intento,
        new Promise((_, rechazar) => setTimeout(() => rechazar(new Error('lento')), ESPERA_RED_MS))
      ]);
    } catch (e) {
      const guardada = await caches.match(req);
      if (guardada) return guardada;
      if (req.mode === 'navigate') {
        const inicio = await caches.match('./index.html');   // sin internet o muy lento: abre la última versión de la app
        if (inicio) return inicio;
      }
      return intento;   // sin copia guardada: se sigue esperando a la red
    }
  })());
});

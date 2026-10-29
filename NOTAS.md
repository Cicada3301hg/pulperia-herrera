# Notas de la app

## 1. Qué es

App de catálogo **Pulpería Herrera**, instalable como PWA (nombre corto en el teléfono: **Mi Pul**).
Publicada en https://cicada3301hg.github.io/pulperia-herrera/ (GitHub Pages, rama `main`).
Hoy la usa solo su dueño.

## 2. Reglas de trabajo

- Antes de cualquier cambio visual se muestra una demo y el dueño elige.
- Cada orden empieza leyendo y resumiendo el código; no se edita nada hasta que el dueño apruebe.
- Nunca tocar lo que la orden no pida (carrito, Mis pedidos, barra inferior, barra de búsqueda, modales).
  Se comparan los estilos computados antes y después para confirmarlo.
- Pruebas con Chrome headless a 390 px y 320 px.
- Publicar así: commit **sin** Co-Authored-By, `merge --ff-only` a `main`, push solo de `main`,
  y volver a la rama `prueba-claude-code`.
- Trato respetuoso y serio, sin coloquialismos; explicaciones en lenguaje simple.
- Los cambios pequeños se agrupan en una sola orden para gastar menos uso.

## 3. Decisiones de diseño ya tomadas

- Estilo de panel de control oscuro con relieve: azul marino, dorado y verde.
- Encabezado apilado y centrado: casita dorada (30 px) con líneas doradas a los lados;
  debajo, el nombre en letra Cinzel con efecto 3D.
- Barra de búsqueda hundida: lupa a la izquierda; a la derecha, la X (si hay texto escrito)
  o el reloj del historial (si la barra está vacía y hay pedidos guardados).
- Modal "Tu pedido": pantalla de puntos verdes compacta, con el título dentro y sin la regla de rayitas.
- "Mis pedidos": tarjetas que se despliegan (una abierta a la vez) e interruptor
  "Desliza para restablecer", que se completa al pasar la mitad del recorrido.
- Ícono verde del carrito centrado en la foto del producto al tocar una tarjeta.
- Espacios iguales de 14 px entre las partes del encabezado.
- Al escribir en la búsqueda, la vista sube al inicio de los resultados y se corrige
  el corrimiento que deja el teclado abierto.

## 4. Instalación (PWA)

- `index.html` debe tener `<link rel="manifest" href="manifest.json">` (sin él, Chrome no permite instalar).
- `manifest.json`: `short_name` "Mi Pul".
- Cada vez que cambia `sw.js` o algo que el teléfono guarda en caché, se sube la versión del caché
  en `sw.js` (`CACHE_NAME`). Versión actual: **pulperia-v16**.

## 5. Pendientes

- Probar "Desliza para restablecer" de Mis pedidos en uso real.
- Pulir el resto de línea en Mis pedidos.
- Completar los nombres con sabor en la columna H del catálogo (es el nombre que la app muestra).
- Registro de búsquedas sin resultado (requiere computadora).
- Tocar dos productos a la vez (en estudio).
- Revisar el campo `purpose` de los íconos si se ven recortados en el teléfono.

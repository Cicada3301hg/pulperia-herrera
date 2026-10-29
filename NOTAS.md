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
  debajo, el nombre en letra Cinzel, negro con filo dorado (color #080d19, -webkit-text-stroke 1.5px #d4a64a,
  paint-order: stroke fill, text-shadow 0 3px 6px rgba(0,0,0,.65)).
- Barra de búsqueda hundida, más clara para que se note el hundido (55 px de alto): lupa dorada sola,
  sin círculo, a la izquierda; a la derecha, solo la X (si hay texto escrito). Se quitó el botón
  del reloj de la barra. El texto de ayuda y el texto escrito van alineados a la izquierda.
- Menú de tres puntitos a la derecha del encabezado, a la altura de la casita: "Historial"
  (abre Mis pedidos), "Cómo usar la app" y "Contactar a la pulpería". El historial ahora se abre
  desde este menú. El botón atrás del teléfono cierra el menú.
- Mis pedidos sin pedidos guardados muestra "Aún no hay pedidos guardados".
- Modal "Tu pedido": pantalla de puntos verdes compacta, con el título dentro y sin la regla de rayitas.
- "Mis pedidos": tarjetas que se despliegan (una abierta a la vez) e interruptor
  "Desliza para restablecer", que se completa al pasar la mitad del recorrido.
- Ícono verde del carrito centrado en la foto del producto al tocar una tarjeta.
- Espacios iguales de 14 px entre las partes del encabezado. Con el filo dorado, a la vista quedan iguales
  casita–nombre y nombre–barra (13,5 px a 390 px y 13 px a 320 px).
- Al escribir en la búsqueda, la vista sube al inicio de los resultados y se corrige
  el corrimiento que deja el teclado abierto.

## 4. Instalación (PWA)

- `index.html` debe tener `<link rel="manifest" href="manifest.json">` (sin él, Chrome no permite instalar).
- `manifest.json`: `short_name` "Mi Pul".
- Cada vez que cambia `sw.js` o algo que el teléfono guarda en caché, se sube la versión del caché
  en `sw.js` (`CACHE_NAME`). Versión actual: **pulperia-v20**.

## 5. Pendientes

- Probar "Desliza para restablecer" de Mis pedidos en uso real.
- Pulir el resto de línea en Mis pedidos.
- Completar los nombres con sabor en la columna H del catálogo (es el nombre que la app muestra).
- Registro de búsquedas sin resultado (requiere computadora).
- Tocar dos productos a la vez. Revisado: es una limitación de Chrome con dos dedos simultáneos,
  no hay bloqueo en la app. Se decidió no cambiarlo por ahora (riesgo de agregar productos por error
  al hacer scroll). Solo se retoma con demo previa.
- Revisar el campo `purpose` de los íconos si se ven recortados en el teléfono.
- Programar "Cómo usar la app" y "Contactar a la pulpería" del menú de tres puntitos
  (por ahora solo cierran el menú).

## 6. Cómo trabaja el dueño

### Forma de trabajo

- Dicta por voz: sus mensajes pueden traer errores de transcripción, palabras repetidas o frases cortadas.
  Interpretar la intención, sin corregir la forma de escribir.
- No escribe código: decide el diseño y las IA lo ejecutan. Trabaja casi todo desde el teléfono,
  con el chat de Claude y Claude Code en modo remoto.
- Analiza los cambios en su cabeza y decide de a uno; el chat agrupa los cambios pequeños en UNA sola orden
  para Claude Code, para cuidar el límite semanal de uso. "Un paso a la vez" significa que él decide de a uno,
  no que se construya de a uno.
- Cambios visuales: primero 3 demos que pueda abrir, él elige, y recién después se prepara la orden.
  No dar código antes de que lo pida.
- El chat redacta las órdenes exactas para Claude Code y él las pega. Siempre indicarle dónde pegar
  ("ahí mismo donde parpadea el cursor"). Él aprueba las ediciones con "Permitir una vez".
- Revisa en su teléfono cada cambio y manda capturas, a veces con círculos rojos para marcar
  lo que no le gusta.

### Cómo hablarle

- Trato serio y respetuoso. Nunca "mae" ni tono coloquial de confianza.
- Lenguaje simple. Si algo es enredado, dirá que no entiende: explicarlo paso a paso, más sencillo.
- Honestidad ante todo: decir claramente lo que no se pudo probar o no se sabe, y discrepar con respeto
  y con razones si hace falta.
- Una sola pregunta a la vez. Respuestas cortas, pensadas para pantalla de teléfono.
- No recordarle el producto de prueba del catálogo: ya lo sabe y lo quitará él.

### Criterio de diseño

- Debe verse profesional y coherente, no solo funcionar.
- Equilibrio visual: todo pesa igual a ambos lados del eje central (simetría).
- Cada elemento debe ser necesario; lo que no sirve, no debe estar. Evitar avisos flotantes si el estado
  se puede ver en el propio elemento.
- Estilo que le gusta: paneles oscuros con relieve, controles hundidos, pantallas de puntos, luces tipo LED,
  interruptores con perilla, azul marino con dorado y verde.
- No le gustan las pantallas hechas de cajitas tipo formulario ni los fondos con brillo en el centro.
- Los textos que ven los clientes deben ser amables y no imperativos.
- Es muy detallista: nota diferencias de pocos píxeles, líneas que sobran y espacios desiguales.
- Si algo no le convence del todo, a veces da libertad para rehacerlo, pero se conservan las decisiones
  ya tomadas (sección 3).
- Antes de recomendarle una herramienta nueva, indicar sus límites y riesgos reales.

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
  paint-order: stroke fill, text-shadow 0 3px 6px rgba(0,0,0,.65)). Tamaño de letra: 24 px; en pantallas
  de hasta 340 px, 22,5 px con 1 px entre letras.
- Barra de búsqueda hundida, más clara para que se note el hundido (55 px de alto): lupa dorada sola,
  sin círculo, a la izquierda; a la derecha, solo la X (si hay texto escrito). Se quitó el botón
  del reloj de la barra. El texto de ayuda y el texto escrito van alineados a la izquierda.
- Menú de tres puntitos a la derecha del encabezado: "Historial" (abre Mis pedidos), "Cómo usar la app"
  y "Contactar a la pulpería". El historial se abre desde este menú.
  - Botón: su centro queda a la mitad entre la línea dorada de la casita y el borde de arriba de las letras
    del nombre, más 1,5 px (49,5 px a 390; 49,25 px a 320). A 390 px va 8 px más a la izquierda; en pantallas
    de hasta 340 px se queda a la derecha como antes.
  - Abierto: botón en relieve (degradado #2c4776 → #1b2f56 → #122244, filo #07101f y sombra), puntitos
    #e9edf5, transición de 0,18 s. Cerrado: sin fondo y puntitos #8f9bb3.
  - El menú queda centrado en la pantalla, con su borde de arriba igual al de la barra de búsqueda.
  - Tres burbujas (5, 8 y 12 px) en línea recta del botón a la esquina de arriba a la derecha del menú,
    en el 22, 52 y 82 % del camino. Siempre quedan al menos 2 px entre burbujas y entre la última y el menú;
    si no caben, las tres se achican en la misma proporción (a 390 px: 3,8 / 6 / 9 px; a 320 px: 1,1 / 1,7 / 2,6 px).
  - Animación: burbujas a los 0, 50 y 100 ms (0,14 s) y el menú a los 150 ms (escala 0,2 → 1 en 0,2 s).
    Al cerrar, al revés: el menú en 0,12 s y luego las burbujas (0,1 s cada una), con 40 ms entre piezas.
  - Se cierra apenas el dedo toca fuera del menú (también al empezar a deslizar), si la página se desplaza,
    con los puntitos o con el botón atrás. Al cerrarse, la página se queda donde quedó.
- Señal de luz que guía al Historial: con el primer pedido que se guarde se enciende una luz dorada
  (#f2c35a, 9 px) en el botón de tres puntitos y, con el menú abierto, al final del renglón "Historial".
  Se apagan para siempre al tocar "Historial"; cerrar el menú sin entrar no las apaga. Sale una sola vez
  (clave `senal_historial_ph_v1` en el teléfono). Los pedidos guardados antes no la encienden.
- Mis pedidos sin pedidos guardados muestra "Aún no hay pedidos guardados".
- Modal "Tu pedido": pantalla de puntos verdes compacta, con el título dentro y sin la regla de rayitas.
- "Mis pedidos": tarjetas que se despliegan (una abierta a la vez) e interruptor
  "Desliza para restablecer", que se completa al pasar la mitad del recorrido.
- Ícono verde del carrito centrado en la foto del producto al tocar una tarjeta.
- Espacios iguales entre las partes del encabezado. A la vista quedan iguales casita–nombre y
  nombre–barra (15 px a 390 px y 14,5 px a 320 px; margen bajo el nombre de 7 px).
- Al escribir en la búsqueda, la vista sube al inicio de los resultados y se corrige
  el corrimiento que deja el teclado abierto.
- Sin selección de texto: en toda la app, mantener presionado un texto o número no lo selecciona ni muestra
  "Copiar / Seleccionar todo" (user-select: none y -webkit-touch-callout: none en `body`). Excepción: la
  búsqueda y los campos donde se escribe (input y textarea) sí permiten seleccionar, copiar y pegar.
- Las fotos (tarjetas, ventana de cantidad, carrito y foto ampliada) no se arrastran ni abren el menú de Chrome
  al mantenerlas presionadas (-webkit-touch-callout: none, -webkit-user-drag: none y se bloquea el evento
  contextmenu solo en las imágenes).

### Rendimiento (teléfonos modestos)

- Fotos de las tarjetas con una pantalla de ventaja: al abrir solo se piden las de la pantalla y una pantalla
  más abajo (12 en vez de 24–26, unos 300 KB menos con red lenta); las demás, al acercarse. Respaldo: si el
  vigilante de fotos falla o no responde en 3 s, todas cargan como antes. Al bajar muy rápido con red lenta
  pueden verse más espacios vacíos que antes; se aceptó a cambio del ahorro.

## 4. Instalación (PWA)

- `index.html` debe tener `<link rel="manifest" href="manifest.json">` (sin él, Chrome no permite instalar).
- `manifest.json`: `short_name` "Mi Pul".
- Cada vez que cambia `sw.js` o algo que el teléfono guarda en caché, se sube la versión del caché
  en `sw.js` (`CACHE_NAME`). Versión actual: **pulperia-v24**.

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

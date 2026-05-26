# Solo Learn

Webapp estática para aprender Java y JavaScript por niveles, con lecciones,
ejemplos, prácticas, retos rápidos, XP, logros y progreso guardado en
`localStorage`.

## Qué incluye

- Ruta separada para Java y JavaScript.
- Plan junio-agosto para llegar con soltura al final del verano.
- Filtros por nivel: cero, base, intermedio y avanzado.
- Vista de lección con teoría, pasos de estudio, ejemplo de código y práctica.
- Laboratorio JavaScript con ejecución en el navegador y salida de `console.log`.
- Ejercicios evaluables de JavaScript con tests automáticos en varias lecciones.
- Preview DOM con HTML de prueba para practicar `DOM` y `formularios`.
- Validación de renderizado de listas y contadores dentro del preview DOM.
- Lección específica y ejercicio evaluable para `map`, `filter` y `reduce`.
- Lección puente para pintar listas desde datos con ejercicio DOM evaluable.
- Lección integradora para pasar de datos filtrados a interfaz renderizada.
- Lección específica para pasar de JSON local ya parseado a interfaz renderizada.
- Lección integradora de flujo async para pasar de `fetch` a renderizado en DOM.
- Lección y ejercicio evaluable para gestionar estados de carga, vacío y error en interfaces con datos asíncronos.
- Problemas guiados de Java con entrada, salida esperada y checklist de resolución.
- Cobertura ampliada de problemas guiados Java para métodos, colecciones, excepciones y testing.
- Cobertura guiada ampliada también para interfaces/herencia y primera arquitectura con Spring.
- Mini proyectos guiados en lecciones avanzadas de Java y JavaScript para empujar hacia entregables reales.
- Mini proyectos guiados ampliados también a varias lecciones intermedias para dar continuidad entre ejercicios y entregables.
- Bloque de replanteamiento avanzado para retomar ejercicios básicos y rehacerlos con mejor diseño en niveles superiores.
- El banco de práctica marca ya qué ejercicios escalan después a una versión más avanzada.
- El banco permite filtrar también por si una práctica escala después o es autocontenida.
- En las prácticas que escalan, el banco indica además si la base previa ya está cubierta o sigue pendiente.
- Desde el banco y desde el bloque de replanteamiento avanzado se puede abrir directamente la lección base previa.
- El plan diario ya puede recomendar cubrir una base previa antes de atacar una práctica evolutiva.
- Cuando la base ya está cubierta, el plan diario puede priorizar la práctica avanzada correspondiente como tarea de `Escalada`.
- La sidebar incluye una guía rápida inicial para entender cómo usar la app al entrar por primera vez.
- Esa guía inicial ya se adapta al estado real: primera vez, progreso inicial o trabajo por progresión/evolución.
- `Siguiente sesión` ya entiende también `Base previa` y `Escalada`, no solo desbloqueos generales.
- La lección activa puede incluir ya casos evolutivos guiados con versión base, versión avanzada y starter de código.
- El primer caso evolutivo ya tiene también una tercera fase: pasar de un empleado individual a colecciones, filtros y resúmenes.
- El banco de práctica muestra ya la fase evolutiva de esos casos: `Base`, `Refactor` o `Colección y resumen`.
- El banco puede filtrarse también por fase evolutiva para entrenar solo una capa de progresión.
- El banco resume también cuántas prácticas tienes por fase evolutiva en la ruta activa.
- Banco de práctica por familias y dificultad, adaptado a la ruta activa.
- El banco de práctica puede filtrarse por familia, dificultad y estado.
- El banco de práctica también puede filtrarse por tipo: función, DOM, async, consola, testing o arquitectura.
- El banco de práctica también puede ordenarse por pendientes, impacto, dificultad o familia.
- Cada tarjeta del banco muestra si la práctica está hecha, empezada o sin tocar.
- El banco destaca una práctica “más útil ahora” según estado e impacto.
- El banco muestra estadísticas por familia: total, hechas, empezadas y sin tocar.
- Las estadísticas por familia son clicables y destacan la prioridad útil actual.
- Las familias muestran porcentaje de avance y el banco permite restablecer filtros rápido.
- Easter egg técnico con una radiografía de `app.js` y su relación con la ruta de aprendizaje.
- La radiografía técnica puede abrir directamente la lección o la práctica relacionada.
- La radiografía detecta base cubierta o pendiente para cada bloque técnico.
- La recomendación de siguiente sesión prioriza lecciones que desbloquean más partes del proyecto.
- El panel de lecciones puede ordenarse por impacto técnico.
- La sidebar incluye un plan de hoy con desbloqueos, tests pendientes y repaso.
- El plan de hoy permite marcar pasos como hechos y cerrar la sesión diaria.
- Cerrar la sesión diaria otorga XP extra y deja rastro en un historial corto.
- El plan de hoy clasifica la sesión: desbloqueo, consolidación, repaso o práctica intensiva.
- El tipo de sesión ya modifica la prioridad real de la cola diaria.
- La cola reduce teoría nueva cuando arrastras demasiada práctica o repaso pendiente.
- Cuando ocurre esa protección, la UI lo explica dentro del propio Plan de hoy.
- El pie del plan diario añade una lectura semanal ligera: reenganche, estable, fuerte o limpieza.
- Esa lectura semanal incluye también una recomendación concreta de ritmo.
- También expone reglas visibles de ritmo semanal y suaviza la prioridad de lecciones avanzadas si toca contener carga.
- Métricas de progreso total, progreso por lenguaje y racha diaria.
- Siguiente sesión recomendada para mantener avance diario.
- Lección activa claramente destacada con pasos de teoría, práctica, reto y cierre.
- Notas personales por lección, guardadas junto al progreso.
- Header compacto en móvil y modo enfoque para estudiar sin distracciones.
- Registro de retos fallados y bloque de repaso pendiente.
- Lección específica de `fetch` consumiendo un JSON local y recorriendo arrays
  de objetos para pintar items.
- Seguimiento de teoría leída, práctica completada, retos resueltos y lecciones
  finalizadas.
- Exportación e importación del progreso en JSON.
- Diseño inspirado en `DESIGN.md`: canvas claro, verde bosque, tarjetas mint y
  espaciado amplio.
- CSS refactorizado con nomenclatura BEM, estados `is-*`, tokens de espaciado
  en base 4px y container máximo de `90rem` / 1440px.
- Import/export con estado visible y notas guardadas automáticamente al cambiar
  de lección o salir del campo.

## Estructura

- `index.html`: estructura de la app.
- `styles.css`: estilos responsive.
- `data.js`: temario, ejemplos, prácticas y roadmap de verano.
- `app.js`: estado, renderizado, progreso, retos y persistencia.
- `AGENT_CONTEXT.md`: contexto operativo del proyecto para agentes.
- `BACKLOG.md`: backlog futuro de mejoras priorizadas.
- `BITACORA.md`: registro manual de cambios relevantes.

## Abrir en local

Abre `index.html` directamente en el navegador. No necesita instalación,
compilación ni servidor local.

## Desplegar en GitHub Pages

1. Sube estos archivos a un repositorio de GitHub:
   - `index.html`
   - `styles.css`
   - `data.js`
   - `app.js`
   - `README.md`
2. En GitHub, entra en `Settings > Pages`.
3. En `Build and deployment`, selecciona `Deploy from a branch`.
4. Elige la rama `main` y la carpeta `/root`.
5. Guarda los cambios y espera a que GitHub genere la URL.

## Privacidad

El progreso se guarda solo en el navegador donde uses la app. Para moverlo a
otro navegador o equipo, usa `Exportar progreso` y después `Importar progreso`.

GitHub Pages puede publicar el sitio en una URL accesible si el repositorio o la
configuración de Pages son públicos. Si quieres que sea realmente privado,
mantén el repositorio privado y revisa las opciones disponibles en tu cuenta de
GitHub.

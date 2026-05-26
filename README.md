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

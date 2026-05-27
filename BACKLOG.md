# Solo Learn — Backlog

## Criterio de prioridad

Ordenado por impacto real en aprendizaje y por facilidad de integrar sin romper
la naturaleza estática del proyecto.

## Ahora

### 1. Ejercicios evaluables de JavaScript

Estado:
base implementada y ya bastante madura. Queda seguir ampliando cobertura fina.

Objetivo:
añadir ejercicios con tests automáticos y feedback claro.

Alcance mínimo:

- [x] definir estructura de ejercicio en `scripts/data/foundations.js`,
  `scripts/data/practice.js` y `scripts/data/evolution.js`
- [x] cargar starter distinto por lección
- [x] ejecutar solución del usuario en sandbox simple
- [x] comparar con casos esperados
- [x] mostrar tests pasados y fallidos
- [x] guardar ejercicios resueltos en progreso
- [~] ampliar cobertura más allá de las primeras lecciones soportadas

Valor:
convierte el laboratorio en una herramienta de práctica deliberada.

### 2. Práctica DOM con preview real

Estado:
base ya bastante madura. Queda apretar algunos casos finos, pero el bloque principal está muy adelantado.

Objetivo:
permitir ejercicios donde el usuario pinte items en pantalla a partir de datos.

Alcance mínimo:

- [x] editor HTML
- [x] editor JS
- [x] iframe o contenedor de preview aislado
- [x] carga de JSON local
- [x] validaciones básicas sobre el DOM renderizado
- [~] ampliar cobertura a listas, filtros y renderizado desde datos reales
- [x] cubrir rerender, vaciado y sustitución de tandas sucesivas en ejercicios clave

Valor:
mejora mucho la parte frontend útil para DAM.

### 3. Ejercicios Java guiados

Estado:
estructura guiada ya muy madura y prácticamente cerrada.

Objetivo:
dar estructura real a Java aunque no se ejecute en navegador.

Alcance mínimo:

- [x] plantillas de ejercicio
- [x] enunciado
- [x] entrada esperada
- [x] salida esperada
- [x] checklist de solución
- [x] errores comunes
- [x] plantilla inicial
- [x] pruebas manuales
- [x] variación sugerida de continuación
- [x] casos borde recomendados
- [x] pistas graduales

Valor:
sube mucho el valor formativo sin meter compilación remota.

### 4. Revisión de progreso más fina

Estado:
base ya bastante madura. Tema y lectura temporal reciente ya visibles; queda solo afinar si hace falta más histórico.

Objetivo:
medir mejor el aprendizaje real.

Alcance mínimo:

- [x] distinguir lección vista, práctica hecha y ejercicio evaluado
- [x] mostrar avance por tema
- [x] registrar última sesión por track
- [x] añadir contador de repasos pendientes

## Corto plazo

### 5. Banco de ejercicios por tema

Estado:
base ya visible en el banco con filtro por tema y agrupación útil. Falta seguir ampliando catálogo fino.

- [x] arrays
- [x] objetos
- [x] `map`, `filter`, `reduce`
- [x] DOM
- [x] `fetch`
- [x] renderizado de listas y filtros en UI
- [x] POO en Java
- [x] colecciones en Java

### 6. Sistema de repaso por errores

- [x] guardar qué falló el usuario
- [x] reinyectar ejercicios fallados
- [x] priorizar temas repetidos

### 7. Misiones semanales

- [x] completar X prácticas
- [x] resolver X retos
- [x] estudiar ambos lenguajes
- [x] cerrar una fase del roadmap

### 8. Mejor diferenciación visual por lenguaje

- sistema visual más consistente para Java y JavaScript
- sin depender solo del color
- posible iconografía o badges más fuertes
- separar por completo las "salas" Java y JavaScript en el rediseño
- usar un modo de estudio global con tres estados: `all`, `java`, `javascript`
- franja superior de 4px por modo:
  - transparente en `all`
  - navy en `java`
  - terracota en `javascript`
- tinte del papel por modo:
  - Java -> gris azulado sutil
  - JavaScript -> cream / melocotón sutil
- selector segmentado prominente en la subbar con glifo del lenguaje
- filtro duro por modo:
  - en `java`, desaparece todo el contenido JS
  - en `javascript`, desaparece todo el contenido Java
  - afecta a plan, repaso, banco, grid y lateral
- solo el lenguaje activo debe ser navegable
- la lección activa debe cambiar según el modo
- brand, nav activa y acentos del header también deben teñirse por modo
- el lateral debe cambiar su contenido según el lenguaje activo
- ya existe una base funcional previa con filtro `Aprendizaje: frontend/backend`
  para no mezclar rutas innecesariamente antes del rediseño completo
- aplicar esto al integrar el rediseño, no antes, para no duplicar trabajo

## Medio plazo

### 9. Mini proyectos guiados

Estado:
base ya en marcha con briefs, starters y validación manual. Falta ampliar catálogo y densidad.

JavaScript:

- lista de tareas
- visor de JSON
- consumo de API pública
- dashboard con filtros

Java:

- agenda por consola
- biblioteca
- gestor de notas
- mini CRUD en memoria

### 10. Ejercicios evolutivos por nivel

Estado:
base ya bastante sólida con progresiones visibles en JavaScript y Java. Falta ampliar catálogo, pero el patrón de reescritura por niveles ya está bien representado.

Objetivo:
reutilizar un problema sencillo en varios niveles y rehacerlo con mejor diseño
y más escalabilidad.

Ejemplos:

- empezar con una solución básica usando `prompt`, `if` y variables simples
- retomarlo después con funciones separadas
- volver a plantearlo con objetos, colecciones o clases
- en niveles altos, rediseñarlo con capas, DTOs, validación y tests si aplica

Casos claros:

- [x] cálculo de salario según antigüedad
- [x] gestor simple de notas
- [x] carrito o lista de tareas
- [x] filtros sobre datos cargados con `fetch`
- [x] evolución hacia capas y validación estilo backend
- [x] refuerzo final con tests sobre el mismo problema

Valor:
enseña que programar bien no es solo “resolver”, sino mejorar estructura,
legibilidad, extensibilidad y mantenibilidad según crece el problema.

### 11. Módulo de testing

Estado:
primer corte ya visible en JavaScript y Java. Falta ampliar cobertura, pero la introducción práctica ya existe.

- [x] tests de funciones JS
- [x] introducción a JUnit en Java
- [x] casos normales y casos límite

### 12. Ruta hacia backend con Spring

Estado:
primer corte ya visible en contenido guiado. Falta mucha más profundidad, pero DTOs, services, validación, endpoints REST, filtrado básico y contrato de error ya tienen una base clara.

- [x] DTOs
- [x] controllers
- [x] services
- [x] validación
- [x] endpoints REST
- [x] contrato básico para respuestas de error
- [x] filtrado básico por query param

### 13. Historial y calendario

Estado:
primer corte funcional ya visible en sidebar. Ya resume días concretos, actividad por lenguaje y cierres reales. Falta decidir si más adelante compensa un calendario más rico.

- [x] días estudiados
- [x] tiempo aproximado
- [x] temas tocados
- [x] resumen diario reciente

## Largo plazo

### 14. Sincronización opcional

Opciones candidatas:

- export/import mejorado
- Gist privado
- Supabase
- Firebase

No hacerlo hasta que el modelo de progreso esté más maduro.

### 15. Mantener la modularidad del frontend

El corte grande ya está iniciado:

- lógica separada en `scripts/app/`
- datos separados en `scripts/data/`
- CSS separado por responsabilidad en `styles/`

Pendiente:

- vigilar si alguno de esos módulos vuelve a crecer demasiado
- seguir cortando por responsabilidad antes de recrear monolitos
- posponer una taxonomía CSS más fina hasta cerrar el rediseño visual para no
  reorganizar `styles/` dos veces
- ejecutar `python3 scripts/smoke-check.py` tras tocar `index.html`,
  `scripts/app/`, `scripts/data/` o CSS para detectar roturas de arranque

### 16. Modo examen

Estado:
primer corte ya visible sobre el sistema de retos. Falta decidir si más adelante se amplía a ejercicios evaluables, pero la mecánica base ya existe.

- [x] límite de tiempo
- [x] sin ayudas
- [x] puntuación final
- [x] repaso al terminar

## Fuera de alcance por ahora

- backend propio para la app
- autenticación
- multiusuario
- framework frontend completo
- compilación/ejecución real de Java en el navegador

# Solo Learn — Backlog

## Criterio de prioridad

Ordenado por impacto real en aprendizaje y por facilidad de integrar sin romper
la naturaleza estática del proyecto.

## Ahora

### 1. Ejercicios evaluables de JavaScript

Estado:
primera versión ya implementada. Falta ampliarla.

Objetivo:
añadir ejercicios con tests automáticos y feedback claro.

Alcance mínimo:

- definir estructura de ejercicio en `data.js`
- cargar starter distinto por lección
- ejecutar solución del usuario en sandbox simple
- comparar con casos esperados
- mostrar tests pasados y fallidos
- guardar ejercicios resueltos en progreso
- ampliar cobertura más allá de las primeras lecciones soportadas

Valor:
convierte el laboratorio en una herramienta de práctica deliberada.

### 2. Práctica DOM con preview real

Estado:
primera versión ya implementada para algunas lecciones. Falta ampliarla.

Objetivo:
permitir ejercicios donde el usuario pinte items en pantalla a partir de datos.

Alcance mínimo:

- editor HTML
- editor JS
- iframe o contenedor de preview aislado
- carga de JSON local
- validaciones básicas sobre el DOM renderizado
- ampliar cobertura a listas, filtros y renderizado desde datos reales

Valor:
mejora mucho la parte frontend útil para DAM.

### 3. Ejercicios Java guiados

Objetivo:
dar estructura real a Java aunque no se ejecute en navegador.

Alcance mínimo:

- plantillas de ejercicio
- enunciado
- entrada esperada
- salida esperada
- checklist de solución
- errores comunes

Valor:
sube mucho el valor formativo sin meter compilación remota.

### 4. Revisión de progreso más fina

Objetivo:
medir mejor el aprendizaje real.

Alcance mínimo:

- distinguir lección vista, práctica hecha y ejercicio evaluado
- mostrar avance por tema
- registrar última sesión por track
- añadir contador de repasos pendientes

## Corto plazo

### 5. Banco de ejercicios por tema

- arrays
- objetos
- `map`, `filter`, `reduce`
- DOM
- `fetch`
- renderizado de listas y filtros en UI
- POO en Java
- colecciones en Java

### 6. Sistema de repaso por errores

- guardar qué falló el usuario
- reinyectar ejercicios fallados
- priorizar temas repetidos

### 7. Misiones semanales

- completar X prácticas
- resolver X retos
- estudiar ambos lenguajes
- cerrar una fase del roadmap

### 8. Mejor diferenciación visual por lenguaje

- sistema visual más consistente para Java y JavaScript
- sin depender solo del color
- posible iconografía o badges más fuertes

## Medio plazo

### 9. Mini proyectos guiados

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

Objetivo:
reutilizar un problema sencillo en varios niveles y rehacerlo con mejor diseño
y más escalabilidad.

Ejemplos:

- empezar con una solución básica usando `prompt`, `if` y variables simples
- retomarlo después con funciones separadas
- volver a plantearlo con objetos, colecciones o clases
- en niveles altos, rediseñarlo con capas, DTOs, validación y tests si aplica

Casos claros:

- cálculo de salario según antigüedad
- gestor simple de notas
- carrito o lista de tareas
- filtros sobre datos cargados con `fetch`

Valor:
enseña que programar bien no es solo “resolver”, sino mejorar estructura,
legibilidad, extensibilidad y mantenibilidad según crece el problema.

### 11. Módulo de testing

- tests de funciones JS
- introducción a JUnit en Java
- casos normales y casos límite

### 12. Ruta hacia backend con Spring

- DTOs
- controllers
- services
- validación
- endpoints REST

### 13. Historial y calendario

- días estudiados
- tiempo aproximado
- temas tocados

## Largo plazo

### 14. Sincronización opcional

Opciones candidatas:

- export/import mejorado
- Gist privado
- Supabase
- Firebase

No hacerlo hasta que el modelo de progreso esté más maduro.

### 15. Refactor modular del frontend

Separar claramente:

- datos
- estado
- render
- runner
- evaluación
- persistencia

### 16. Modo examen

- límite de tiempo
- sin ayudas
- puntuación final
- repaso al terminar

## Fuera de alcance por ahora

- backend propio para la app
- autenticación
- multiusuario
- framework frontend completo
- compilación/ejecución real de Java en el navegador

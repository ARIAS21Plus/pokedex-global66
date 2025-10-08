# 🔴 Pokédex - Prueba Técnica Global 66

> Breve explicación de lo que hice en el proyecto

**Autor:** José Alejandro Arias  
**Email:** aalejandro1993@gmail.com
**Pais:** Chile

---

## Dependencias y por qué

- Tailwind: Decidí usar tailwind v4 por rendimiento y agilidad de desarrollo. Tambien implementé un tema en main.css para poder usar colores de manera standard y listo para una version en dark mode
- TanStack Query, permite resolver promesas de manera eficiente y guardar en caché, tiene su propio estado que puede invalidarse para futuras mutaciones. Tambien facilitó la implementacion del scroll infinito
- Pinia: Para el estado con un plugin de persistencia para dejar automaticamente los favoritos en localstorage

## Servicio y API /http

- Implementé un sistema robusto con fetch para las llamadas get y tambien dejé los demás verbos para su uso en el futuro si es requerido.
- Exportar instancias, en este caso solo tenemos la instancia de pokemon, pero si se quisiera usar otras apis, alli se agregaria.

## Patron: Container–Presenter Pattern

Decidi usar este patron porque separa las responsabilidades en los componentes, el container se encarga de la logica mientras que el view de presentar la UI.

###Ventajas

- Separación de responsabilidades: la UI no se mezcla con la lógica.
- Reutilización: el presenter puede usarse en distintos contextos.
- Testeabilidad: se pueden testear los componentes visuales sin mocks complejos.
- Mantenibilidad: facilita reemplazar o refactorizar solo la capa visual o lógica.

## Patron Atomic Design

Se compone de componentes atoms, molecules, organism, template

Empiezo con piezas pequeñas (átomos), luego las combino para formar estructuras más grandes (moléculas, organismos, templates, páginas).

###Ventajas:

- El patrón me permite trabajar en una parte específica sin temor a romper la UI global.
- El patrón fomenta el diseño sistemático, ideal para proyectos que evolucionan constantemente.
- Si cambio un color o un padding en un átomo, toda la interfaz se actualiza de forma coherente.

## Abstraccion en composables

Para que mis componentes no tuvieran tantas resposabilidades, separaba la logica en secciones usando composables, esto para mantener la reactividad

###Ventajas:

- Separacion de resposabilidades
- Facil lectura del código
- Testeabilidad sencilla
- Mantenimiento sin dolores a futuro

## Testing /**tests**

Apliqué algunos testins que supuse importantes, para correrlos usar los comandos:

##### Tests unitarios

`npm run test:unit`

##### Tests E2E (headless)

`npm run test:e2e`

Para el E2E primero se debe hacer build de la aplicación
`npm run build`

## Node

Trabajé bajo la versión de node: v22.14.0 y npm: 10.9.2

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Stack Tecnológico](#-stack-tecnológico)
- [Decisiones de Arquitectura](#-decisiones-de-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Optimizaciones para Gran Volumen de Datos](#-optimizaciones-para-gran-volumen-de-datos)
- [Patrones de Diseño](#-patrones-de-diseño)
- [Testing](#-testing)
- [Instalación y Uso](#-instalación-y-uso)
- [Scripts Disponibles](#-scripts-disponibles)

---

## 🎯 Descripción del Proyecto

Aplicación web que permite explorar, buscar y marcar como favoritos pokémons utilizando la [PokeAPI](https://pokeapi.co/). La aplicación está diseñada pensando en escalabilidad y rendimiento, capaz de manejar los más de 1000 pokémons disponibles en la API de manera eficiente.

### Características Principales

- **Búsqueda en tiempo real** con debouncing
- **Sistema de favoritos** persistente
- **Diseño responsive** optimizado para móviles
- **Scroll infinito** con paginación
- **UI moderna** con Tailwind CSS
- **Carga optimizada** con lazy loading
- **Testing** (unitarios + E2E)

---

# Correr el proyecto

## Dev

1- `npm install`

2- `npm run dev`

## Build

`npm run build`

## Preview

`npm run previw`

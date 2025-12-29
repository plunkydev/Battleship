# 🛳️ Battleship

> Proyecto completo del currículo **JavaScript - Node Path** de [The Odin Project](https://www.theodinproject.com/).  
> Recreación del clásico juego *Battleship* (Batalla Naval) utilizando desarrollo modular, **TDD (Test-Driven Development)** y un flujo completo de integración con UI.

---

## 🎯 Objetivo del Proyecto

Desarrollar una versión funcional del juego **Battleship** implementando toda su lógica de juego desde cero, y luego integrarla con una interfaz visual minimalista.  
El énfasis del proyecto está en la **arquitectura modular**, el **pensamiento lógico** y la **escritura de código testeable**.

---

## 🧩 Características Principales

- Sistema completo de **tableros y ataques** entre jugador y computadora.  
- **Controlador de juego** que maneja turnos, ataques y condición de victoria.  
- **Controlador de configuración (SetupController)** para ubicar automáticamente las flotas antes de iniciar el juego.  
- **Interfaz visual (BoardUI)** modular con actualización reactiva del DOM.  
- Indicador de turnos y mensaje de fin de juego dinámico.  
- Bloqueo visual del tablero enemigo durante el turno de la computadora.  
- Efectos visuales (`.hit`, `.miss`, `.ship-cell`, `.disabled-board`) con animaciones suaves.  
- Botón de reinicio para recomenzar la partida sin recargar manualmente.  

---

## 🧠 Aprendizajes Clave

- Arquitectura basada en **módulos ES6** (`import / export`) para aislar responsabilidades.  
- **TDD y BDD con Jest**: diseño de funciones mediante pruebas antes de implementar la lógica.  
- Aplicación de principios de **Single Responsibility** y **Dependency Injection** entre módulos.  
- Manipulación directa del **DOM** sin frameworks.  
- Integración entre lógica de negocio y capa visual.  
- Flujo completo de desarrollo: lógica → pruebas → UI → despliegue.

---

## 🧱 Estructura del Proyecto

src/
│
├── BoardUI.js # Módulo de interfaz visual y eventos del tablero
├── GameBoard.js # Lógica del tablero: posiciones, ataques y colisiones
├── GameControler.js # Controlador principal del flujo del juego
├── Player.js # Entidad jugador: ataques, registros y lógica de turnos
├── SetupController.js # Controlador de configuración y posicionamiento inicial
├── Ship.js # Modelo de barco con sistema de impactos y hundimiento
├── index.js # Punto de entrada e integración de módulos
├── styles.css # Estilos visuales, animaciones y estados de juego
└── template.html # Estructura base del juego en el navegador

markdown
Copiar código

---

## ⚙️ Tecnologías Utilizadas

- **JavaScript (ES6)**  
- **Jest** – pruebas unitarias automatizadas  
- **Babel** – compatibilidad con ESM  
- **Webpack** – empaquetado y entorno de desarrollo  
- **HTML5 + CSS3** – interfaz visual ligera y responsiva  

---

## 🧪 Pruebas Implementadas

Las pruebas cubren la lógica de los módulos base:  

- `Ship.test.js` → métodos `hit()` y `isSunk()`  
- `GameBoard.test.js` → ataques, límites y detección de hundimiento  
- `Player.test.js` → ataques válidos y aleatorios sin repetición  
- `GameController.test.js` → cambio de turnos, flujo de juego y condiciones de victoria  
- `BoardUI.test.js` → renderizado del tablero y actualización visual  
- `SetupController.test.js` → generación automática de flotas  

Ejecutar pruebas:  

```bash

npm test

💡 Detalles Adicionales

El tablero enemigo se bloquea visualmente (.disabled-board) mientras la computadora juega, evitando múltiples clics.

Las celdas se actualizan dinámicamente con clases hit (rojo) y miss (gris).

Las flotas del jugador se muestran en azul (ship-cell) para referencia visual.

Todo el ciclo de juego se ejecuta sin dependencias externas ni frameworks.

🧑‍💻 Autor

David Rosales
Autodidacta en programación, diseño y redacción web SEO.
Enfoque: construir proyectos reales aplicando bases sólidas en JavaScript, lógica y arquitectura modular.

📬 GitHub

🧭 Estado Actual

✅ Lógica de juego completa
✅ UI integrada
✅ TDD implementado
✅ Despliegue en GitHub Pages
🔜 Próximo paso: mejora de la interacción para arrastrar y reubicar barcos.

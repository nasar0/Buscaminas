# 🧨 Buscaminas en JavaScript

Este es un juego clásico de **Buscaminas** desarrollado completamente en HTML, CSS y JavaScript puro. No requiere frameworks externos y es totalmente funcional desde el navegador.

## 🚀 Demo

Puedes jugar directamente abriendo el archivo `index.html` en tu navegador.

## 🕹️ ¿Cómo se juega?

- El objetivo es descubrir todas las celdas **que no tienen minas**.
- Usa el **clic izquierdo** para descubrir una celda.
- Usa el **clic derecho** para marcar una celda que crees que contiene una mina.
- Si haces doble clic en una celda descubierta, se intentará descubrir automáticamente las celdas alrededor si ya has marcado correctamente las minas cercanas.
- Ganas si descubres todas las celdas sin minas. Pierdes si descubres una mina.

## ⚙️ Funcionalidades

- Selección de **dificultad personalizada** mediante un panel de ajustes:
  - Porcentaje de minas
  - Número de filas
  - Número de columnas
- Contador de minas restantes
- Detección de victoria y derrota visual
- Animaciones y diseño visual amigable
- Prevención del clic derecho para evitar trampas

## 🧾 Estructura del proyecto
  ```bash
  📁 proyecto-buscaminas
  ├── index.html # Estructura principal del juego
  ├── style.css # Estilos visuales
  └── script.js # Lógica del juego
  ```
## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6
- [SweetAlert2](https://sweetalert2.github.io/) para las ventanas modales de ajustes

## 📦 Cómo usar

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/proyecto-buscaminas.git
Abre el archivo index.html con tu navegador favorito.

¡A jugar!

## ✏️ Personalización
Puedes modificar el código en script.js para cambiar:

El tamaño del tablero (filas, colum)

El porcentaje de minas

Las imágenes usadas para minas y banderas

## 🧑‍💻 Autor
Desarrollado por nasar0 .

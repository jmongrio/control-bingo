# 🎱 Control de Bingo

![GitHub repo size](https://img.shields.io/github/repo-size/jmongrio/control-bingo)
![GitHub stars](https://img.shields.io/github/stars/jmongrio/control-bingo)
![GitHub forks](https://img.shields.io/github/forks/jmongrio/control-bingo)
![GitHub license](https://img.shields.io/github/license/jmongrio/control-bingo)

Control de Bingo es una aplicación web desarrollada en **React + TypeScript** que permite llevar un registro de números en una partida de bingo. Facilita la administración de los números llamados y ofrece formas sencillas de eliminarlos o corregir errores. También permite registrar el tipo de juego.

## 🚀 Características

* Registro y visualización de números llamados.
* Eliminación de números individuales o todos los números.
* Registro y persistencia del tipo de juego.
* Interfaz fácil de usar, responsive y moderna.
* Almacenamiento de datos en el navegador usando `localStorage`.
* Posibilidad de desplegar con **Docker** y Nginx.

## 📷 Capturas de Pantalla

![Captura de Pantalla](https://github.com/jmongrio/ControlDeBingo/assets/63427621/ca52f29f-8a39-4cd5-92a9-a0c7275d3488)

## 💻 Instalación y Uso

### Desarrollo local

```bash
git clone https://github.com/jmongrio/control-bingo.git
cd control-bingo
npm install
npm run dev
```

### Producción con Docker

```bash
docker build -t control-bingo .
docker run -p 80:80 control-bingo
```

Accede a la aplicación en: `http://localhost`

## 📝 Cómo usar

1. Introduce los números llamados durante la partida en el panel izquierdo.
2. Selecciona o escribe el tipo de juego en el campo correspondiente.
3. El número se agregará al panel derecho, mostrando todos los números registrados.
4. Para eliminar un número, haz clic en el botón **Eliminar** junto a cada número.
5. Para borrar todos los números, haz clic en **Eliminar todos**.

## 🤝 Contribución

Si deseas contribuir al proyecto, ¡bienvenido! Puedes hacerlo a través de pull requests. Por favor, sigue las buenas prácticas de desarrollo y realiza commits claros.

## ⚠️ Problemas

Si encuentras errores o quieres sugerir mejoras, abre un **issue** en este repositorio.

## 🙏 Agradecimientos

Agradecemos a todos los que han contribuido con ideas, reportes y sugerencias para mejorar este proyecto.

# Trabajo Práctico Integrador 2

Aplicación web desarrollada con React y Vite. Permite registrarse e iniciar sesión, y consultar los artículos publicados.

## Requisitos

- Node.js `20.19` o superior, o `22.12` o superior.
- npm.
- El backend y MySQL en ejecución para utilizar las funciones que consultan la API.

## Cómo levantar el frontend

Clona este repositorio, instala las dependencias y ejecuta el servidor de desarrollo:

```bash
git clone https://github.com/Ale-ipf/trabajo-practico-integrador-2.git
cd trabajo-practico-integrador-2
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación (por defecto, `http://localhost:5173`).

## Backend utilizado

El frontend consume la API del siguiente repositorio:

[https://github.com/Ale-ipf/trabajo-practico-integrador-1](https://github.com/Ale-ipf/trabajo-practico-integrador-1)

Para utilizar el inicio de sesión, el registro y la lista de artículos, levanta ese backend por separado y asegúrate de que esté disponible en `http://localhost:3000`. 
También requiere MySQL y la base de datos `integrador_tlp_db`.

La URL base de la API configurada en el frontend es `http://localhost:3000/api`. Si cambias el puerto o la dirección del backend, actualízala en `src/config/api.js`.

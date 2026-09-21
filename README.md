# HabitFlow

HabitFlow es aplicación web Full-Stack para gestionar hábitos personales.

Permite crear, visualizar, completar, descompletar y eliminar hábitos. La información se almacena de forma persistente utilizando Supabase.

## Tecnologías utilizadas

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Node.js
- Express
- TypeScript

### Base de datos
- Supabase
- PostgreSQL

### Despliegue
- Vercel — Frontend
- Render — Backend
- Supabase — Base de datos

## Funcionalidades

- Crear nuevos hábitos.
- Visualizar hábitos almacenados.
- Marcar hábitos como completados.
- Desmarcar hábitos.
- Eliminar hábitos.
- Persistencia de datos.
- Estados de carga, éxito y error.
- Comunicación entre frontend, backend y base de datos mediante API REST.

## Estructura del proyecto

```text
habitflow/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── habitRoutes.ts
│   │   ├── config.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── src/
│   ├── api/
│   │   └── habits.ts
│   ├── components/
│   │   └── HabitItem.tsx
│   ├── types/
│   │   └── habit.ts
│   ├── App.tsx
│   └── ...
│
├── .env
├── package.json
└── README.md

```
Instalación
1. Clonar el repositorio
git clone https://github.com/ManuelRosero13/habitflow.git
cd habitflow

2. Instalar dependencias del frontend
npm install
3. Configurar variables de entorno del frontend

Crear un archivo .env en la raíz del proyecto:

VITE_API_URL=http://localhost:3000
4. Instalar dependencias del backend
cd backend
npm install
5. Configurar variables de entorno del backend

Crear un archivo .env dentro de backend/:

SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
PORT=3000

Las claves reales de Supabase no deben publicarse ni subirse al repositorio.

Ejecutar el proyecto
Backend

Desde la carpeta backend:

npm run dev

El servidor estará disponible en:

http://localhost:3000
Frontend

Desde la raíz del proyecto:

npm run dev

La aplicación estará disponible en:

http://localhost:5173

API

El backend proporciona los siguientes endpoints:

Método	Endpoint	Descripción
GET	/api/habits	Obtener todos los hábitos
POST	/api/habits	Crear un hábito
PUT	/api/habits/:id	Actualizar un hábito
DELETE	/api/habits/:id	Eliminar un hábito

Arquitectura
React + TypeScript
        │
        ▼
      Express
        │
        ▼
     Supabase
    PostgreSQL
Despliegue

El frontend está desplegado en Vercel y el backend en Render.

La aplicación utiliza variables de entorno para conectar el frontend con el backend y el backend con Supabase.

Autor

Manuel Rosero


# Viveres Rosita - E-commerce

## 🚀 Cómo correr el proyecto

### 1️⃣ Clonar el repositorio

#### Por HTTPS:
```sh
git clone https://github.com/CrisAcalo/ViveresRosita.git
```

#### Por SSH:
```sh
git clone git@github.com:CrisAcalo/ViveresRosita.git
```

### 2️⃣ Instalar dependencias

#### Backend:
```sh
cd ViveresRosita/back_Viveres_Rosita
npm install
```

#### Frontend:
```sh
cd ViveresRosita/front
npm install
```

### 3️⃣ Correr base de datos en Docker
```sh
cd ViveresRosita/back_Viveres_Rosita
docker-compose up -d
```

### 4️⃣ Creación de variables de entorno

#### Backend (Dentro del directorio `back_Viveres_Rosita`)

##### Linux:
```sh
touch .env
```

##### Windows:
Crear el archivo `.env` manualmente.

##### Contenido del `.env`:
```env
PORT=3000
DB_USER='cris'
DB_PASSWORD='admin123'
DB_HOST='localhost'
DB_NAME='viveres_rosita'
DB_PORT='5432'
TOKEN_SECRET='superSecretoToken'
AUTH_EXPIRES_IN="60*60"
DATABASE_URL=''
```

#### Frontend (Dentro del directorio `front`)

##### Linux:
```sh
touch .env
```

##### Windows:
Crear el archivo `.env` manualmente.

##### Contenido del `.env`:
```env
VITE_API_DOMAIN=http://localhost:3000
```

### 5️⃣ Migraciones y Semillas

Desde el directorio del backend
#### Ejecutar migraciones:
```sh
npm run migrations:run
```

#### Ejecutar semillas:
```sh
npm run seed:run
```

### 6️⃣ Iniciar la aplicación

#### Backend:
Desde el directorio del backend
```sh
npm run dev
```

#### Frontend:
Desde el directorio del front
```sh
npm run dev
```

## 🔐 Credenciales de acceso

### Administrador:
```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Clientes:
```json
[
  {
    "name": "Carlos Pérez",
    "email": "carlos.perez@example.com"
  },
  {
    "name": "María González",
    "email": "maria.gonzalez@example.com"
  },
  {
    "name": "Javier López",
    "email": "javier.lopez@example.com"
  },
  {
    "name": "Sofía Ramírez",
    "email": "sofia.ramirez@example.com"
  },
  {
    "name": "Andrés Castillo",
    "email": "andres.castillo@example.com"
  }
]
```

## 📌 API Endpoints
Para obtener información detallada sobre los endpoints disponibles en la API, consulta la documentación ubicada en el directorio `back_Viveres_Rosita`.

## 📸 Capturas de pantalla
_Agrega aquí capturas de pantalla de la aplicación funcionando._

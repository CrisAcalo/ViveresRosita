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

#### 🏠 Dashboard
![Dashboard](https://i.ibb.co/V0YSdxpC/Screenshot-2025-03-05-031204.png)

#### 📊 Gestión de Categorias
![Categorias](https://i.ibb.co/60DgTbqY/Screenshot-2025-03-05-031218.png)

#### 📂 Gestión de Productos
![Productos](https://i.ibb.co/RkpbmrJj/Screenshot-2025-03-05-031645.png)

#### 📦 Gestión de Ordenes
![Ordenes](https://i.ibb.co/Rkr0LpNf/Screenshot-2025-03-05-031705.png)

#### 📑 Gestión de Usuarios
![Usuarios](https://i.ibb.co/LDNMKSsr/Screenshot-2025-03-05-031717.png)

#### 👤 Pagina Principal
![Pagina Principal](https://i.ibb.co/n84tdnJK/Screenshot-2025-03-05-033053.png)

#### 🛒 Checkout
![Checkout](https://i.ibb.co/MDPMvdk7/Screenshot-2025-03-05-034022.png)

#### 📜 Historial de Órdenes del Usuario
![Historial de Órdenes](https://i.ibb.co/Df26R82N/Screenshot-2025-03-05-034046.png)

#### 📄 Detalle de una Orden
![Detalle de Orden](https://i.ibb.co/vxRNR1vr/Screenshot-2025-03-05-034030.png)


#### 🔐 My Account
![LogIn](https://i.ibb.co/CKKFBnL0/Screenshot-2025-03-05-033101.png)

#### 🔐 LogIn
![LogIn](https://i.ibb.co/JR90CG6S/Screenshot-2025-03-05-034254.png)

#### 🔐 SignUp
![SignUp](https://i.ibb.co/27XKJfZw/Screenshot-2025-03-05-034301.png)
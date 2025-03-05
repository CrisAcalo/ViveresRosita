# Viveres Rosita API

Esta API proporciona un conjunto de endpoints para gestionar productos, categorías, usuarios, roles, y órdenes en la aplicación Viveres Rosita.

## Endpoints

### Autenticación

- **POST /api/v1/auth/login**: Inicia sesión y obtiene un token de autenticación.
    - Body:
        - `email` (string, requerido): Correo electrónico del usuario.
        - `password` (string, requerido): Contraseña del usuario.

### Productos

- **GET /api/v1/products**: Obtiene una lista de todos los productos.
- **GET /api/v1/products/:id**: Obtiene los detalles de un producto específico.
    - Params:
        - `id` (string, requerido): ID del producto.
- **POST /api/v1/products**: Crea un nuevo producto.
    - Body:
        - `name` (string, requerido): Nombre del producto.
        - `description` (string, requerido): Descripción del producto.
        - `price` (number, requerido): Precio del producto.
        - `stock` (number, requerido): Stock del producto.
        - `image` (string, requerido): URL de la imagen del producto.
        - `categoryId` (number, requerido): ID de la categoría del producto.
- **PATCH /api/v1/products/:id**: Actualiza un producto existente.
    - Params:
        - `id` (string, requerido): ID del producto.
    - Body:
        - `name` (string, opcional): Nombre del producto.
        - `description` (string, opcional): Descripción del producto.
        - `price` (number, opcional): Precio del producto.
        - `stock` (number, opcional): Stock del producto.
        - `image` (string, opcional): URL de la imagen del producto.
        - `categoryId` (number, opcional): ID de la categoría del producto.
- **DELETE /api/v1/products/:id**: Elimina un producto.
    - Params:
        - `id` (string, requerido): ID del producto.

### Categorías

- **GET /api/v1/categories**: Obtiene una lista de todas las categorías.
- **GET /api/v1/categories/:id**: Obtiene los detalles de una categoría específica.
    - Params:
        - `id` (number, requerido): ID de la categoría.
- **POST /api/v1/categories**: Crea una nueva categoría.
    - Body:
        - `name` (string, requerido): Nombre de la categoría.
        - `image` (string, requerido): URL de la imagen de la categoría.
        - `description` (string, requerido): Descripción de la categoría.
- **PATCH /api/v1/categories/:id**: Actualiza una categoría existente.
    - Params:
        - `id` (number, requerido): ID de la categoría.
    - Body:
        - `name` (string, opcional): Nombre de la categoría.
        - `image` (string, opcional): URL de la imagen de la categoría.
        - `description` (string, opcional): Descripción de la categoría.
- **DELETE /api/v1/categories/:id**: Elimina una categoría.
    - Params:
        - `id` (number, requerido): ID de la categoría.

### Usuarios

- **GET /api/v1/users**: Obtiene una lista de todos los usuarios.
- **GET /api/v1/users/:id**: Obtiene los detalles de un usuario específico.
    - Params:
        - `id` (number, requerido): ID del usuario.
- **POST /api/v1/users**: Crea un nuevo usuario.
    - Body:
        - `name` (string, requerido): Nombre del usuario.
        - `email` (string, requerido): Correo electrónico del usuario.
        - `password` (string, requerido): Contraseña del usuario.
        - `phone` (string, requerido): Teléfono del usuario.
        - `address` (string, requerido): Dirección del usuario.
        - `rolId` (number, requerido): ID del rol del usuario.
- **PATCH /api/v1/users/:id**: Actualiza un usuario existente.
    - Params:
        - `id` (number, requerido): ID del usuario.
    - Body:
        - `name` (string, opcional): Nombre del usuario.
        - `email` (string, opcional): Correo electrónico del usuario.
        - `password` (string, opcional): Contraseña del usuario.
        - `phone` (string, opcional): Teléfono del usuario.
        - `address` (string, opcional): Dirección del usuario.
        - `rolId` (number, opcional): ID del rol del usuario.
- **DELETE /api/v1/users/:id**: Elimina un usuario.
    - Params:
        - `id` (number, requerido): ID del usuario.

### Roles

- **GET /api/v1/roles**: Obtiene una lista de todos los roles.
- **GET /api/v1/roles/:id**: Obtiene los detalles de un rol específico.
    - Params:
        - `id` (number, requerido): ID del rol.
- **POST /api/v1/roles**: Crea un nuevo rol.
    - Body:
        - `name` (string, requerido): Nombre del rol.
- **PATCH /api/v1/roles/:id**: Actualiza un rol existente.
    - Params:
        - `id` (number, requerido): ID del rol.
    - Body:
        - `name` (string, opcional): Nombre del rol.
- **DELETE /api/v1/roles/:id**: Elimina un rol.
    - Params:
        - `id` (number, requerido): ID del rol.

### Órdenes

- **GET /api/v1/orders**: Obtiene una lista de todas las órdenes.
- **GET /api/v1/orders/:id**: Obtiene los detalles de una orden específica.
    - Params:
        - `id` (number, requerido): ID de la orden.
- **POST /api/v1/orders**: Crea una nueva orden.
    - Body:
        - `userId` (number, requerido): ID del usuario que realiza la orden.
        - `orderItems` (array, requerido): Lista de productos en la orden.
            - `productId` (number, requerido): ID del producto.
            - `quantity` (number, requerido): Cantidad del producto.
- **DELETE /api/v1/orders/:id**: Elimina una orden.
    - Params:
        - `id` (number, requerido): ID de la orden.

## Middleware

- **verifyToken**: Middleware para verificar el token de autenticación en las rutas protegidas.

## Manejo de Errores

- **404 Ruta no encontrada**: Se devuelve cuando una ruta no existe.
- **405 Método no permitido**: Se devuelve cuando un método HTTP no está permitido en una ruta específica.

## Ejemplos de Uso


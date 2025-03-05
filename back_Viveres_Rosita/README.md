# Documentación de la API - E-commerce

## Introducción

Esta API proporciona funcionalidades para gestionar un e-commerce, permitiendo la administración de categorias, productos, usuarios, roles, pedidos y autenticación.

## Base URL

```
/api/v1
```

## Rutas

### Autenticación

**POST /auth/login**

- **Descripción**: Permite a los usuarios autenticarse en la aplicación.
- **Parámetros en el body**:
    
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    
    ```
    
- **Respuesta**:
    
    ```json
    {
      "error": null,
      "data": {
        "token": "JWT_TOKEN"
      }
    }
    
    ```
    

---

### Pedidos (Orders)

**GET /orders**

- **Descripción**: Obtiene la lista de pedidos.
- **Ejemplo de Respuesta**:
    
    ```
    [
    	{
    		"id": 1,
    		"userId": 2,
    		"state": "Pendiente",
    		"carrierId": 10,
    		"createdAt": "2025-03-05T07:48:58.723Z",
    		"orderItems": [
    		...
    		],
    		"user": {
    			"id": 2,
    			"name": "Carlos Pérez",
    			"email": "carlos.perez@example.com",
    			"password": "admin123",
    			"phone": "0987654321",
    			"address": "Av. Los Rosales 123, Quito",
    			"rolId": 3,
    			"createdAt": "2025-03-05T07:48:58.710Z"
    		},
    		"carrier": {
    			"id": 10,
    			"name": "Mercado Libre Ecuador",
    			"country": "Ecuador",
    			"website": "https://mercadolibre.com.ec",
    			"phone": "+593 556 667 778",
    			"createdAt": "2025-03-05T07:48:58.705Z"
    		}
    	}]
    ```
    

**GET /orders/:id**

- **Descripción**: Obtiene un pedido por su ID.

**POST /orders**

- **Descripción**: Crea un nuevo pedido.
- **Ejemplo de Body**:
    
    ```
    {
      "userId": 3,
      "orderItems": [
        { "productId": 5, "quantity": 2 },
        { "productId": 8, "quantity": 1 }
      ]
    }
    ```
    

**DELETE /orders/:id**

- **Descripción**: Elimina un pedido.

---

### Roles

**GET /roles** *(Requiere autenticación)*

- **Descripción**: Obtiene todos los roles.
- **Ejemplo de Respuesta**:
    
    ```
    [
      { "id": 1, "name": "Admin" },
      { "id": 2, "name": "Cliente" }
    ]
    ```
    

**GET /roles/:id**

- **Descripción**: Obtiene un rol por su ID.

**POST /roles**

- **Ejemplo de Body**:
    
    ```
    {
      "name": "Vendedor"
    }
    ```
    

**PATCH /roles/:id**

- **Ejemplo de Body**:
    
    ```
    {
      "name": "Gerente"
    }
    ```
    

**DELETE /roles/:id**

- **Descripción**: Elimina un rol.

### Productos

**GET /products**

- **Descripción**: Obtiene la lista de productos.
- **Ejemplo de Respuesta**:
    
    ```json
    [
      {
        "id": 1,
        "name": "Producto 1",
        "description": "Descripción del producto",
        "price": 100,
        "stock": 10,
        "image": "https://ejemplo.com/imagen.jpg",
        "categoryId": 2
      }
    ]
    
    ```
    

**GET /products/:id**

- **Descripción**: Obtiene un producto por su ID.
- **Ejemplo de Respuesta**:
    
    ```json
    {
      "name": "Producto 1",
      "description": "Descripción del producto",
      "price": 100,
      "stock": 10,
      "image": "https://ejemplo.com/imagen.jpg",
      "categoryId": 2
    }
    
    ```
    

**POST /products**

- **Descripción**: Crea un nuevo producto.
- **Parámetros en el body**:
    
    ```json
    {
      "name": "Nuevo Producto",
      "description": "Descripción detallada",
      "price": 199.99,
      "stock": 50,
      "image": "https://ejemplo.com/imagen.jpg",
      "categoryId": 3
    }
    
    ```
    
- **Ejemplo de Respuesta**:
    
    ```json
    {
      "message": "created",
      "data": {
        "id": 10,
        "name": "Nuevo Producto",
        "description": "Descripción detallada",
        "price": 199.99,
        "stock": 50,
        "image": "https://ejemplo.com/imagen.jpg",
        "categoryId": 3
      }
    }
    
    ```
    

**PATCH /products/:id**

- **Descripción**: Actualiza los datos de un producto.
- **Ejemplo de Body**:
    
    ```json
    {
      "price": 179.99,
      "stock": 40
    }
    
    ```
    

**DELETE /products/:id**

- **Descripción**: Elimina un producto.
- **Ejemplo de Respuesta**:
    
    ```json
    {
      "message": "deleted",
      "id": 10
    }
    
    ```
    

---

### Categorías

**GET /categories** *(Requiere autenticación)*

- **Ejemplo de Respuesta**:
    
    ```json
    [
      {
        "id": 1,
        "name": "Electrónica",
        "image": "https://ejemplo.com/electronica.jpg",
        "description": "Artículos de tecnología"
      }
    ]
    
    ```
    

**POST /categories**

- **Ejemplo de Body**:
    
    ```json
    {
      "name": "Hogar",
      "image": "https://ejemplo.com/hogar.jpg",
      "description": "Artículos para el hogar"
    }
    
    ```
    

---

### Usuarios

**GET /users**

- **Ejemplo de Respuesta**:
    
    ```json
    [
      {
        "id": 1,
        "name": "Juan Pérez",
        "email": "juan@example.com",
        "phone": "1234567890",
        "address": "Calle Falsa 123",
        "rolId": 2
      }
    ]
    
    ```
    

**POST /users**

- **Ejemplo de Body**:
    
    ```json
    {
      "name": "Ana López",
      "email": "ana@example.com",
      "password": "securePass123",
      "phone": "0987654321",
      "address": "Av. Siempre Viva 742",
      "rolId": 1
    }
    
    ```
    

---

### Códigos de Estado

- `200 OK` - Operación exitosa
- `201 Created` - Recurso creado exitosamente
- `400 Bad Request` - Datos inválidos
- `401 Unauthorized` - Falta autenticación
- `403 Forbidden` - Acceso denegado
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error en el servidor

## Seguridad

- Se requiere autenticación para acceder a ciertas rutas.
- Se usa `jsonwebtoken` para la generación de tokens.

## Contacto

Para más información, contactar con el equipo de desarrollo.
📌 API de Usuarios, Productos y Órdenes

Este documento describe los endpoints disponibles en la API de usuarios, productos y órdenes, incluyendo los métodos, rutas y parámetros necesarios.

📌 Repositorio

🔗 Repositorio en GitHub: backend-tienda-rtc

📌 Instalación y Uso

Clona este repositorio:

git clone https://github.com/Ferrancgg/backend-tienda-rtc.git

Accede al directorio del proyecto:

cd backend-tienda-rtc

Instala las dependencias:

npm install

Inicia el servidor:

npm start

o en modo desarrollo:

npm run dev

📌 Endpoints de Usuarios

Método

Endpoint

Descripción

Body Params

POST

/api/users/register

Registra un nuevo usuario

{ name, email, password, role }

POST

/api/users/login

Inicia sesión y devuelve un token

{ email, password }

GET

/api/users

Obtiene todos los usuarios

❌

📌 Controladores de Órdenes

📍 createOrder

Descripción: Crea una nueva orden.

Parámetros:

user (ObjectId, obligatorio)

orderItems (Array de objetos, obligatorio)

shippingAddress (Objeto, obligatorio)

paymentMethod (String, obligatorio)

itemsPrice, taxPrice, shippingPrice, totalPrice (Number, obligatorio)

Respuesta:

{
  "success": true,
  "data": {
    "_id": "65g3fda1b2c3d4e5f6h7i8j9",
    "user": "65e2d4cba9f8a7b6c3d2e1f0",
    "orderItems": [
      { "product": "65f2bca1a2a3e4f5g6h7i8j9", "quantity": 2 }
    ],
    "totalPrice": 120.00
  }
}

📍 getAllOrder

Descripción: Obtiene todas las órdenes.

Respuesta:

{
  "success": true,
  "data": [
    {
      "_id": "65g3fda1b2c3d4e5f6h7i8j9",
      "user": { "name": "Juan", "email": "juan@example.com" },
      "orderItems": [
        { "product": "Laptop", "price": 1200 }
      ],
      "totalPrice": 1200.00
    }
  ]
}

📍 getOrderById

Descripción: Obtiene una orden por su ID.

Parámetros:

id (String, obligatorio)

Respuesta:

{
  "success": true,
  "data": {
    "_id": "65g3fda1b2c3d4e5f6h7i8j9",
    "user": { "name": "Juan", "email": "juan@example.com" },
    "orderItems": [
      { "product": "Laptop", "price": 1200 }
    ],
    "totalPrice": 1200.00
  }
}

📍 updateOrder

Descripción: Actualiza una orden existente.

Parámetros:

id (String, obligatorio)

orderItems, shippingAddress, paymentMethod (Opcionales)

Respuesta:

{
  "success": true,
  "data": {
    "_id": "65g3fda1b2c3d4e5f6h7i8j9",
    "orderItems": [
      { "product": "Laptop Pro", "price": 1400 }
    ],
    "totalPrice": 1400.00
  }
}

📍 deleteOrder

Descripción: Elimina una orden por su ID.

Parámetros:

id (String, obligatorio)

Respuesta:

{
  "success": true,
  "message": "Order deleted successfully",
  "data": {
    "_id": "65g3fda1b2c3d4e5f6h7i8j9"
  }
}

📌 Licencia

Este proyecto está bajo la licencia MIT. ¡Úsalo como quieras! 🚀

📌 Próximas actualizaciones

📌 Este documento se irá ampliando a medida que agreguemos más funcionalidades a la API.


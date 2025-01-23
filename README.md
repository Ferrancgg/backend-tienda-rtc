API para Gestión de Productos y Pedidos en una Tienda Online

Descripción

Una API para gestionar productos y pedidos de una tienda online. Los usuarios pueden registrarse, iniciar sesión y realizar pedidos. La API permite diferenciar entre dueños de la tienda y clientes:

Dueños: Pueden gestionar los productos (crear, editar, eliminar) y ver los pedidos asociados a sus productos.

Clientes: Pueden ver el catálogo, realizar pedidos y consultar sus propios pedidos.

Modelos

1. User

{
  name: String,
  email: String (único),
  password: String (hash),
  avatar: String (URL de Cloudinary),
  role: String (enum: ["owner", "customer"], default: "customer")
}

Relaciones:

Asociado a productos como "dueño".

Asociado a pedidos como "cliente".

2. Product

{
  name: String,
  description: String,
  price: Number,
  stock: Number,
  image: String (URL de Cloudinary),
  owner: ObjectId (referencia al modelo User)
}

Relaciones:

Cada producto pertenece a un dueño (owner).

Relacionado con pedidos.

3. Order

{
  user: ObjectId (referencia al modelo User),
  products: [
    {
      product: ObjectId (referencia al modelo Product),
      quantity: Number
    }
  ],
  totalPrice: Number,
  status: String (enum: ["pending", "completed", "cancelled"], default: "pending")
}

Relaciones:

Asociado a un cliente (user).

Incluye múltiples productos con cantidades específicas.

Endpoints

1. Autenticación

POST /auth/register

Registrar un nuevo usuario con validación de email único y contraseña segura.

Parámetro adicional para especificar el rol (owner o customer).

POST /auth/login

Iniciar sesión y obtener un JWT válido por 1 hora.

2. Usuarios

POST /auth/avatar

Subir un avatar para el usuario autenticado usando Cloudinary.

3. Productos

Para dueños (role: owner):

GET /products: Listar todos los productos creados por el dueño autenticado.

POST /products: Crear un nuevo producto asociado al dueño.

PUT /products/:id: Editar un producto creado por el dueño.

DELETE /products/:id: Eliminar un producto creado por el dueño.

Para clientes (role: customer):

GET /products: Listar todos los productos disponibles (sin autenticación).

4. Pedidos

Para clientes (role: customer):

GET /orders: Listar los pedidos realizados por el cliente autenticado.

POST /orders: Crear un nuevo pedido seleccionando productos del catálogo.

GET /orders/:id: Ver los detalles de un pedido específico realizado por el cliente.

Para dueños (role: owner):

GET /orders: Listar los pedidos que incluyan productos creados por el dueño.

Relaciones entre Modelos

Usuario (dueño) - Producto

Relación: owner en Product -> User.

Usuario (cliente) - Pedido

Relación: user en Order -> User.

Producto - Pedido

Relación: products en Order -> Product.

Middlewares para Protección de Rutas

1. Autenticación (JWT):

Proteger todas las rutas que requieren autenticación (crear, editar, eliminar productos/pedidos).

2. Autorización por rol:

Dueños (role: owner): Permitir gestionar sus propios productos y ver pedidos asociados.

Clientes (role: customer): Permitir realizar pedidos y ver sus propios pedidos.

Ejemplo de middleware:

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
    }
    next();
  };
};

// Uso en rutas
router.post("/products", authenticateUser, authorizeRole("owner"), createProduct);

Resumen Final

Modelos: User (con roles), Product (relacionado con dueño), Order (relacionado con cliente y productos).

Rutas específicas para roles: Los dueños gestionan productos y ven pedidos relacionados con sus productos. Los clientes pueden ver el catálogo, sus pedidos y detalles asociados.

Middlewares: Implementar autenticación y autorización por roles.

# backend-tienda-rtc

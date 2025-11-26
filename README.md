# Proyecto de Programación Web - TIENDARA 

## Descripción
Este proyecto es una API RESTful desarrollada con **Node.js** y **Express** para gestionar un sistema de productos y categorías con autenticación de usuarios. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre dos entidades principales: **Productos** y **Categorías**, y cuenta con gestión de usuarios con roles (`user` y `admin`).  

Incluye:
- Autenticación mediante JWT.
- Validación de datos con `express-validator`.
- Manejo de errores centralizado.
- Subida y almacenamiento de imágenes en base64.
- Paginación y filtros en listados.

---

## Funcionalidades Principales

### 1. Autenticación
- Registro de usuarios con roles (`user` y `admin`).
- Login con generación de JWT.
- Middleware de autenticación para proteger rutas sensibles.

### 2. Módulo ABMC (Alta, Baja, Modificación, Consulta)

export default productsRouter
#### Productos (`/api/products`)
- **GET** `/` → Listar todos los productos.
- **GET** `/filter` → Listar productos con filtros, búsqueda y paginación.
- **GET** `/:id` → Obtener producto por ID.
- **GET** `/category/:name` → Listar productos por categoría.
- **POST** `/` → Crear un producto nuevo.
- **PUT** `/:id` → Actualizar un producto completamente.
- **PATCH** `/:id` → Actualizar parcialmente un producto.
- **DELETE** `/:id` → Eliminación lógica de un producto.

#### Categorías (`/api/category`)
- **GET** `/` → Listar todas las categorías.
- **GET** `/:name` → Obtener categoría por nombre.
- **POST** `/` → Crear nueva categoría.
- **PUT** `/:id` → Actualización de toda la categoría.
- **PATCH** `/:id` → Actualización de categoría parcial.
- **DELETE** `/:id` → Eliminar categoría.

#### Carrito (`/api/cart`)
- **GET** `/` → Obtiene los datos de un carrito.
- **POST** `/` → Agrega un producto a un carrito.
- **POST** `/remove` → Elimina un producto del carrito.
- **POST** `/pay` → Actializa el status del carrito a Pagado.
- **POST** `/clear` → Vacia el carrito.
- **POST** `/create-payment-intent` → Crea el intento de pago.
- **DELETE** `/:id` → Eliminar el carrito.

#### Usuarios (`/api/user`)
- **POST** `/register` → Crea un usuario.
- **POST** `/login` → Valida que el usuario exista y autoriza a iniciar sesion.
- **POST** `/token` → Renueva el token.

### 3. Validación
- Todas las rutas de creación y actualización de productos y categorías validan los campos requeridos usando `express-validator`.
- Validaciones específicas para:
  - Emails válidos y contraseña segura en usuarios.
  - Longitudes mínimas y máximas para nombres, descripciones y títulos.
  - Base64 válido para imágenes.
  - Tipos booleanos en `status`.
  
### 4. Manejo de Errores
- Respuestas estandarizadas con `mensage` y `code`.
- Ejemplos:
  - 400 → Error de validación.
  - 404 → Producto o categoría no encontrada.
  - 409 → Usuario ya existe.
  - 204 → Eliminación exitosa sin contenido.

---

## Tecnologías Utilizadas
- **Node.js** y **Express**.
- **MongoDB** con **Mongoose**.
- **JWT** para autenticación.
- **bcrypt** para hash de contraseñas.
- **express-validator** para validaciones.
- **Swagger UI** para documentación de la API.
- **Stripe** para pagos.
- **Winston** y **winston-daily-rotate-file** para logging.
- **dotenv** para variables de entorno.
- **cors** y **compression** para optimización.
- Hosting gratuito: Despliegue en **Vercel** para acceso online.
- Git: Uso de **Git** para control de versiones y colaboración.

---

## Estructura del Proyecto
```
backend/
│
├─ src/
│  ├─ controllers/
│  │   ├─ categoryController.js
│  │   ├─ productController.js
│  │   └─ userController.js
│  │
│  ├─ routes/
│  │   ├─ categoryRouter.js
│  │   ├─ productsRouter.js
│  │   └─ userRouter.js
│  │
│  ├─ middlewares/
│  │   ├─ authMiddleware.js
│  │   └─ validationMiddleware.js
│  │
│  ├─ models/
│  │   ├─ Category.js
│  │   ├─ Product.js
│  │   └─ User.js
│  │
│  ├─ utils/
│  │   └─ logger.js
│  │
│  └─ index.js
│
├─ package.json
├─ .env
└─ README.md
```

---

## Instrucciones de Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/MarielGorbolino/backTiendara.git
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivos `.env.dev` o `.env.prod` según corresponda con:
```
PORT=3008
MONGOURL=mongodb://localhost:27017/
JWT_SECRET=36d877e239a349791662c9960488a8c26d083e235b3417131ed57890c287a28f
JWT_EXPIRES_IN=15m
STRIPE_SECRET_KEY=sk_test_51SXLL0JVjF1xIP00HSKdepME7lF3iaVW9A1k1okGMenXpIWLr2kQoEAi3Fk2oqmRniwLvb0bGGcjWLAjMoKD725600IdZRILem
JWT_ACCESS=5cae94f51ab54e3281bc4d3c772de0a88313b2ffdd9505d9b057fd27cc85e26f
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH=008690c0339335be04e9ff52b38d76d16bb5489f7018048394869e15c44e0f21
JWT_REFRESH_EXPIRES_IN=7d

```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

El servidor quedará corriendo en `http://localhost:3008`.

---

## Imágenes de la aplicación
*(Aquí se pueden agregar capturas de Swagger UI, Postman o la SPA de React)*

---

## Contribuidores
- Mariel Gorbolino

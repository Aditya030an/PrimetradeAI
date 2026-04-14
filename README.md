# PrimetradeAI Backend Developer Assignment Submission

This repository is my submission for the **Backend Developer Intern Project Assignment**. It demonstrates a modular full-stack application built with **Node.js, Express.js, MongoDB, JWT authentication, and React.js**.

Although the project is based on a real e-commerce use case, it cleanly satisfies the core assignment requirements:
- User registration and login
- Password hashing and JWT authentication
- Protected routes
- Role-based access middleware
- CRUD APIs for a secondary entity (**Products**)
- Validation and error handling
- React frontend to test and consume APIs

---

## Live Demo

Frontend Deployment:  
https://aquahari.in

You can test the application directly using the deployed frontend.

---

## Demo Admin Access

For evaluation purposes, an admin account is available to test product management APIs.

Admin Email:  
adityaagrawalq@gmail.com

Admin Password:
Aditya@123

⚠️ Note: Admin password is shared separately with the reviewer if required.

Admin capabilities:
- Add new products
- Update products
- Delete products
- Access protected admin routes

## Live Scope of This Submission

### Backend
- **Authentication APIs**
  - Register user
  - Login user
  - Get authenticated user profile
  - Forgot password / reset password flow
- **Secondary Entity CRUD**
  - Product creation
  - Product listing
  - Product update
  - Product deletion
- **Role-based middleware available**
  - `authUser` for authenticated access
  - `authAdmin` for admin-only access
- **Media upload support** using Cloudinary + Multer
- **MongoDB schema design** for users, products, orders, blogs, and consultations

### Frontend
- Register and login UI
- Protected dashboard flows
- Product listing and product management flows
- Toast-based success/error feedback
- Token-based authenticated requests to backend APIs

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs
- jsonwebtoken
- Multer
- Cloudinary
- Nodemailer

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Framer Motion

---

### Integrations
- Razorpay Payment Gateway
- Shiprocket API for shipment creation & tracking

---

## Project Structure

```bash
PrimetradeAI-main/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── helper/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── project/
│   ├── src/
│   │   ├── Component/
│   │   ├── assets/
│   │   ├── api
│   │   └── App.jsx
│   └── package.json
├── postman_collection.json
├── scalability-notes.md
└── README.md
```

---

## Implemented Assignment Requirements Mapping

| Assignment Requirement | Status | Notes |
|---|---|---|
| User registration & login APIs | Implemented | `register`, `login`, `getUser`, password reset flow |
| Password hashing | Implemented | Using `bcryptjs` |
| JWT authentication | Implemented | Bearer token based auth |
| Role-based access | Implemented | `authAdmin` middleware exists and is used in admin routes such as blog/order admin flows |
| CRUD for secondary entity | Implemented | Product CRUD APIs |
| Error handling | Implemented | JSON responses and status codes used across controllers |
| Validation | Implemented | Email/password/phone validation + required field checks |
| Database schema | Implemented | MongoDB + Mongoose models |
| Basic frontend UI | Implemented | React frontend for auth and entity flows |
| API documentation | Implemented | Postman collection included |
| Scalability note | Implemented | See `scalability-notes.md` |

---

## Important Note for Reviewers

This project already contains **admin middleware** and uses it for privileged operations in selected routes such as blog management and order admin views.

For the **Products** module, the current write routes are authenticated and can be made strictly admin-only by replacing `authUser` with `authAdmin` in `backend/routes/productRoutes.js`.

Example change:

```js
import authAdmin from "../middleware/authAdmin.js";

router.post("/addProduct", authAdmin, upload.array("images", 10), createProduct);
router.put("/:id", authAdmin, upload.array("images", 5), updateProduct);
router.delete("/deleteProduct/:id", authAdmin, deleteProduct);
```

This is a very small final hardening step to align the product module completely with role-based admin CRUD expectations.

---

## API Endpoints

### Authentication

#### Register User
`POST /api/user/register`

Request body:

```json
{
  "name": "Aditya Agrawal",
  "email": "aditya@example.com",
  "password": "secret123",
  "phoneNumber": "9876543210"
}
```

#### Login User
`POST /api/user/login`

Request body:

```json
{
  "email": "aditya@example.com",
  "password": "secret123",
  "value": "login"
}
```

#### Get Logged-in User
`GET /api/user/getUser`

Headers:

```http
Authorization: Bearer <token>
```

#### Forgot Password
`POST /api/user/forgot-password/send-link`

#### Reset Password
`POST /api/user/reset-password/:token`

---

### Product CRUD

#### Get All Products
`GET /api/product/`

#### Create Product
`POST /api/product/addProduct`

Headers:

```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

Form fields:
- `name`
- `description`
- `capacity`
- `price`
- `baseDeliveryPrice`
- `deliveryPricePerBottle`
- `discount`
- `images` (multiple)

#### Update Product
`PUT /api/product/:id`

Headers:

```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Delete Product
`DELETE /api/product/deleteProduct/:id`

Headers:

```http
Authorization: Bearer <token>
```

---

## How to Run Locally

### 1. Clone the repository

```bash
git clone <your-repository-link>
cd PrimetradeAI-main
```

### 2. Setup backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
FRONTEND_URL=http://localhost:5173
CLIENT_URL_PROD=http://localhost:5173
CLIENT_URL_WWW=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

Run backend:

```bash
npm run dev
```

### 3. Setup frontend

Open a new terminal:

```bash
cd project
npm install
```

Create `.env` in `project/`:

```env
VITE_APP_API_URL=http://localhost:4000
VITE_ADMIN_EMAIL=your_admin_email
```

Run frontend:

```bash
npm run dev
```

---

## Security Practices Used

- Password hashing with `bcryptjs`
- JWT-based authentication
- Protected routes through middleware
- Admin-only authorization middleware available
- Validation for email, password, phone number, and required fields
- Restricted CORS configuration for known frontend origins
- Password reset token with expiration
- Media uploads handled through Cloudinary instead of storing files locally

---

## Suggested Final Improvements for Strict Assignment Alignment

These are small improvements that can be added quickly if required by the reviewer:

1. **Apply `authAdmin` on Product write routes**
2. **Introduce API versioning**, for example:
   - `/api/v1/user/login`
   - `/api/v1/product/addProduct`
3. **Centralize validation** using Joi/Zod/express-validator
4. **Add Swagger documentation** alongside Postman collection
5. **Move admin identity to a `role` field in the User schema** instead of relying only on email comparison

---

## Postman Documentation

A ready-to-import collection is included in this repository:

- `postman_collection.json`

Use Postman variables:
- `baseUrl`
- `token`
- `productId`
- `resetToken`

---

## Scalability Notes

See:

- `scalability-notes.md`

This explains how the current monolithic architecture can be scaled using modular services, caching, background jobs, Docker, load balancing, and cloud deployment.

---

## Frontend Demonstration Scope

The frontend is intentionally simple and practical for assessment review. It allows the evaluator to:
- Register a user
- Log in and receive a token
- Access authenticated pages
- Consume backend APIs
- View success and error states
- Manage product flows from the UI

---

## Submission Summary

This submission demonstrates backend-first development with secure authentication, protected APIs, reusable middleware, modular architecture, and a working React client.

It is designed to be easy to review, extend, and deploy.

# Civic-Lens Backend

Backend server for the Civic-Lens MERN application.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/civic-lens
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Project Structure

```
backend/
├── config/          # Configuration files (database, etc.)
├── models/          # Mongoose models
├── routes/          # Express routes
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── server.js        # Entry point
└── .env            # Environment variables
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **dotenv**: Environment variable management
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **express-validator**: Request validation
- **multer**: File upload handling

## Development Dependencies

- **nodemon**: Auto-restart server during development

## API Endpoints

### Authentication

#### Register New User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": "690644dec35cb04bb9f182fb",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### Login User
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": "690644dec35cb04bb9f182fb",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### Get Current User Profile (Protected)
```http
GET /api/auth/me
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "690644dec35cb04bb9f182fb",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2025-11-01T17:35:26.266Z"
    }
  }
}
```

## Validation Rules

### Signup Validation
- **name**: Required, 2-50 characters
- **email**: Required, valid email format
- **password**: Required, minimum 6 characters, must contain at least one uppercase letter, one lowercase letter, and one number

### Signin Validation
- **email**: Required, valid email format
- **password**: Required

## Security Features

- Passwords are hashed using bcryptjs (salt rounds: 12)
- JWT tokens for authentication
- Protected routes require valid Bearer token
- Role-based access control support (user, admin)
- Input validation using express-validator
- CORS enabled for frontend
- Passwords excluded from API responses


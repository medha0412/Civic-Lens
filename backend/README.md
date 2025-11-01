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


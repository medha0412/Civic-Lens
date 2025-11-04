# Postman Testing Guide — Civic-Lens Backend

This document explains how to test the backend API using Postman (or similar REST clients). It includes environment setup, example requests, and quick commands to seed an admin user for testing.

Base URL
---------
- Default: `http://localhost:5000`

Required environment variables (backend)
--------------------------------------
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `JWT_EXPIRE` — expiration like `7d`
- `PORT` — optional, default `5000`

Start the server (PowerShell)
-----------------------------
Open a PowerShell terminal in `backend` and run:

```powershell
cd 'C:\Users\tanmay\Desktop\Civic-Lens\backend'
npm install
# Start server (or use your usual start script)
node server.js
```

Seed or create an admin user (quick method)
-----------------------------------------
Use the provided script `seed-admin.js` to create an admin user quickly.

Usage:

```powershell
# from backend folder
node seed-admin.js admin@example.com AdminPass123 "Admin Name" "City"
```

This will create the user if it doesn't exist, or promote the existing user to role `admin`.

Postman environment (recommended)
---------------------------------
Create an environment with the following variables:
- `base_url` = `http://localhost:5000`
- `auth_token` = (leave blank)
- `admin_token` = (leave blank)
- `sample_user_email` = `testuser@example.com`
- `sample_admin_email` = `admin@example.com`

Test flow (ordered)
-------------------
1) Signup (create user)
   - POST {{base_url}}/api/auth/signup
   - Body (raw JSON):
     {
       "name": "Test User",
       "email": "{{sample_user_email}}",
       "password": "password123",
       "city": "Mumbai"
     }
   - On success: copy response.token → set `auth_token` environment variable.

2) Signin (optional)
   - POST {{base_url}}/api/auth/signin
   - Body: {"email": "{{sample_user_email}}", "password": "password123"}
   - Save token if desired.

3) Get current user
   - GET {{base_url}}/api/auth/me
   - Authorization: Bearer {{auth_token}}

4) Create complaint (with optional photo)
   - POST {{base_url}}/api/complaints
   - Authorization: Bearer {{auth_token}}
   - Body: form-data
     - message (Text)
     - latitude (Text)
     - longitude (Text)
     - photo (File) — field name `photo`

5) List my complaints
   - GET {{base_url}}/api/complaints
   - Authorization: Bearer {{auth_token}}

6) Create admin (if not using the seed script)
   - Signup using `{{sample_admin_email}}`, then mark role `admin` in DB using Mongo shell or Compass.

7) Admin endpoints
   - GET {{base_url}}/api/admin/complaints
     - Authorization: Bearer {{admin_token}}
   - PATCH {{base_url}}/api/admin/complaints/:id
     - Body (JSON): {"status": "in-progress"}

Error cases to test
-------------------
- Missing Authorization header → expect 401 for protected routes
- Invalid credentials → signin returns 401
- Upload file bigger than 5MB → multer should reject
- Invalid status in admin update → 400

Notes
-----
- Uploaded files are served at `/uploads`. If `data.complaint.photo` is `/uploads/complaints/complaint-...jpg`, open `{{base_url}}{{data.complaint.photo}}` in browser.
- If `seed-admin.js` fails, ensure `MONGODB_URI` and `JWT_SECRET` are set in your environment or `.env`.

Next steps (optional)
---------------------
- I can create a Postman Collection JSON file and add it to the repo.
- I can add a small README badge or a npm script to run the seed script.

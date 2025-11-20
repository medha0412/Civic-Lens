# Deployment Guide

## Environment Variables

This application requires the `VITE_BACKEND_URL` environment variable to be set in your deployment platform.

### Setting Environment Variables

#### For Netlify:

1. Go to your site's dashboard on Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Click **Add variable**
4. Add the following:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend-api.com` or `https://api.yourdomain.com`)
5. Click **Save**
6. **Important**: After adding/updating environment variables, you need to trigger a new deployment:
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

#### For Vercel:

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Add the following:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: Your backend API URL
   - **Environment**: Select all environments (Production, Preview, Development)
5. Click **Save**
6. Redeploy your application

#### For Other Platforms:

Set the `VITE_BACKEND_URL` environment variable in your platform's environment variable settings.

### Important Notes

- **Vite environment variables** must be prefixed with `VITE_` to be accessible in the frontend code
- After setting environment variables, you **must rebuild/redeploy** your application for changes to take effect
- The environment variable is read at **build time**, not runtime
- If `VITE_BACKEND_URL` is not set, the app will fall back to `http://localhost:5000` (which will only work in local development)

### Example Values

- **Development**: `http://localhost:5000`
- **Production**: `https://civic-lens-1-23jq.onrender.com` (your backend URL)

**Your Backend URL**: `https://civic-lens-1-23jq.onrender.com`

### Troubleshooting

If you're still seeing `ERR_CONNECTION_REFUSED` errors:

1. **Verify the environment variable is set**: Check your deployment platform's environment variables section
2. **Verify the backend URL is correct**: Make sure your backend is deployed and accessible
3. **Redeploy after setting variables**: Environment variables are only included at build time
4. **Check browser console**: Look for the actual URL being used in network requests
5. **Verify CORS settings**: Ensure your backend allows requests from your frontend domain


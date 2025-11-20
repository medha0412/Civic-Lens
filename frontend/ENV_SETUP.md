# Environment Variable Setup Guide

## Understanding the Errors

### Error 1: `Unchecked runtime.lastError: The page keeping the extension port is moved into back/forward cache`
- **What it is**: This is a harmless browser extension warning (usually from Chrome extensions)
- **Impact**: None - you can safely ignore this
- **Solution**: No action needed

### Error 2: `ERR_CONNECTION_REFUSED` on `localhost:5000/api/auth/signin`
- **What it is**: Your app is trying to connect to `localhost:5000` but can't reach it
- **Why it happens**: The `VITE_BACKEND_URL` environment variable is not set, so it's using the fallback `localhost:5000`
- **Impact**: Login and all API calls will fail

## Solutions

### Scenario 1: Testing Locally (Development)

If you're running the app locally with `npm run dev`:

1. **Create a `.env` file** in the `frontend` folder:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

2. **Make sure your backend is running** on `localhost:5000`

3. **Restart your dev server** after creating the `.env` file:
   ```bash
   npm run dev
   ```

### Scenario 2: Deployed Version (Production)

If you're testing the deployed version (Netlify, Vercel, etc.):

1. **Set the environment variable** in your deployment platform:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://civic-lens-1-23jq.onrender.com`

2. **Redeploy your application** (this is critical!)
   - Environment variables are read at **build time**, not runtime
   - Just setting the variable isn't enough - you must trigger a new build

3. **Verify the build**:
   - Check the build logs to see if `VITE_BACKEND_URL` is being used
   - Open browser console and check the debug logs (you'll see `🔧 API Base URL:`)

## Quick Check

To verify what URL is being used:

1. Open your browser's Developer Console (F12)
2. Look for the log message: `🔧 API Base URL: ...`
3. If it shows `http://localhost:5000`, the environment variable is not set
4. If it shows `https://civic-lens-1-23jq.onrender.com`, it's configured correctly

## Common Mistakes

❌ **Setting the env var but not redeploying** - Vite reads env vars at build time
❌ **Using wrong variable name** - Must be `VITE_BACKEND_URL` (with `VITE_` prefix)
❌ **Testing deployed version without setting env var** - Will always use localhost fallback
❌ **Backend not running** - Even with correct URL, backend must be accessible

## Platform-Specific Instructions

### Netlify
1. Site settings → Environment variables
2. Add `VITE_BACKEND_URL` = `https://civic-lens-1-23jq.onrender.com`
3. Deploys → Trigger deploy → Deploy site

### Vercel
1. Settings → Environment Variables
2. Add `VITE_BACKEND_URL` = `https://civic-lens-1-23jq.onrender.com`
3. Redeploy from Deployments tab

### Other Platforms
Set `VITE_BACKEND_URL` in your platform's environment variable settings and rebuild.


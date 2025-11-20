# Google OAuth Setup Guide

## Environment Variables Required

For Google OAuth to work, you need to set these environment variables in your backend:

```env
# Google OAuth Credentials (from Google Cloud Console)
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret

# Google OAuth Callback URL
# For local development:
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
# For production (Render):
GOOGLE_CALLBACK_URL=https://civic-lens-1-23jq.onrender.com/api/auth/google/callback

# Frontend URL (where users will be redirected after auth)
# For local development:
FRONTEND_URL=http://localhost:5173
# For production:
FRONTEND_URL=https://civiclens-major.netlify.app
```

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if prompted
6. Create OAuth 2.0 Client ID:
   - **Application type**: Web application
   - **Name**: Civic-Lens (or your app name)
   - **Authorized JavaScript origins**:
     - `http://localhost:5000` (for local dev)
     - `https://civic-lens-1-23jq.onrender.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:5000/api/auth/google/callback` (for local dev)
     - `https://civic-lens-1-23jq.onrender.com/api/auth/google/callback` (for production)
7. Copy the **Client ID** and **Client Secret** to your `.env` file

## Important Notes

- The `GOOGLE_CALLBACK_URL` must **exactly match** what you set in Google Cloud Console
- The callback URL must point to your **backend**, not frontend
- The `FRONTEND_URL` is where users are redirected **after** successful authentication
- Make sure both URLs are added in Google Cloud Console's authorized redirect URIs

## Testing

1. **Local Development**:
   - Backend running on `http://localhost:5000`
   - Frontend running on `http://localhost:5173`
   - Set `GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback`
   - Set `FRONTEND_URL=http://localhost:5173`

2. **Production**:
   - Backend: `https://civic-lens-1-23jq.onrender.com`
   - Frontend: `https://civiclens-major.netlify.app`
   - Set `GOOGLE_CALLBACK_URL=https://civic-lens-1-23jq.onrender.com/api/auth/google/callback`
   - Set `FRONTEND_URL=https://civiclens-major.netlify.app`

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Check that `GOOGLE_CALLBACK_URL` exactly matches what's in Google Cloud Console
- Make sure the URL includes the full path: `/api/auth/google/callback`

### Error: "No user received in callback"
- Check backend logs for GoogleStrategy errors
- Verify `CLIENT_ID` and `CLIENT_SECRET` are correct
- Make sure the user has granted permissions

### Callback URL shows in browser but doesn't redirect
- Check that `FRONTEND_URL` is set correctly
- Verify the frontend route `/auth/google/callback` exists
- Check browser console for JavaScript errors


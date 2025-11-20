// API Configuration
// This file centralizes all API endpoint configuration

// Get the backend URL from environment variable
// In production, this should be set in your deployment platform (Netlify, Vercel, etc.)
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Debug: Log the API base URL being used (only in development)
if (import.meta.env.DEV) {
  console.log('🔧 API Base URL:', API_BASE_URL);
  console.log('🔧 VITE_BACKEND_URL env var:', import.meta.env.VITE_BACKEND_URL || 'NOT SET (using localhost fallback)');
}

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNIN: `${API_BASE_URL}/api/auth/signin`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  GOOGLE_AUTH: `${API_BASE_URL}/api/auth/google`,
  GOOGLE_SESSION: (sessionId) => `${API_BASE_URL}/api/auth/google/session/${sessionId}`,
  
  // Complaint endpoints
  COMPLAINTS: `${API_BASE_URL}/api/complaints`,
  ADMIN_COMPLAINTS: `${API_BASE_URL}/api/admin/complaints`,
  ADMIN_COMPLAINT_UPDATE: (complaintId) => `${API_BASE_URL}/api/admin/complaints/${complaintId}`,
};

// Helper function to get full URL for relative paths (e.g., image URLs)
export const getFullUrl = (path) => {
  if (!path) return '';
  // If it's already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // If it's a relative path, prepend the API base URL
  return `${API_BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
};

export default API_BASE_URL;


// API Configuration
// This file centralizes all API endpoint configuration

const inferBackendUrl = () => {
  const envUrl = import.meta.env.VITE_BACKEND_URL;
  if (envUrl) return envUrl;

  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocalhost) {
      return 'https://civic-lens-1-23jq.onrender.com';
    }
  }

  return 'http://localhost:5000';
};

const API_BASE_URL = inferBackendUrl();

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


import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function GoogleCallback({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate()
  const { search } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const sessionId = params.get('session')
    const errorParam = params.get('error')

    // Handle authentication errors
    if (errorParam) {
      console.error('Authentication error:', errorParam)
      navigate('/login')
      return
    }

    if (!sessionId) {
      // Missing session ID — send to login
      navigate('/login')
      return
    }

    // Fetch auth data from backend using session ID
    const fetchAuthData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google/session/${sessionId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch auth data')
        }

        const { token, user } = await response.json()

        // Persist session
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        if (setIsLoggedIn) setIsLoggedIn(true)
        if (setUserRole) setUserRole(user.role || 'user')

        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin-dashboard')
        } else {
          navigate('/dashboard')
        }
      } catch (err) {
        console.error('Failed to process Google callback:', err)
        navigate('/login')
      }
    }

    fetchAuthData()
  }, [search, navigate, setIsLoggedIn, setUserRole])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Signing you in with Google...</p>
    </div>
  )
}

import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function GoogleCallback({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate()
  const { search } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const errorParam = params.get('error')
    const token = params.get('token')
    const userParam = params.get('user')

    // Handle authentication errors
    if (errorParam) {
      console.error('Authentication error:', errorParam)
      navigate('/login')
      return
    }

    if (!token || !userParam) {
      console.error('Missing token or user payload in callback URL')
      navigate('/login')
      return
    }

    try {
      const user = JSON.parse(decodeURIComponent(userParam))

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
  }, [search, navigate, setIsLoggedIn, setUserRole])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Signing you in with Google...</p>
    </div>
  )
}

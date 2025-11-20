import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function GoogleCallback({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate()
  const { search } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const token = params.get('token')
    const userParam = params.get('user')

    if (!token || !userParam) {
      // Missing data — send to login
      navigate('/login')
      return
    }

    try {
      const userJson = decodeURIComponent(userParam)
      const user = JSON.parse(userJson)

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

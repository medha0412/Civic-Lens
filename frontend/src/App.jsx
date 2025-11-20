import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HeroSection } from './components/Hero'
import { Navbar } from './components/Navbar'
import { FourStepsSection } from './components/FourSteps'
import { CategoriesSection } from './components/Types'
import { Footer } from './components/Footer'
import { Signup } from "./components/Signup"
import { Login } from './components/Login'
import GoogleCallback from './components/GoogleCallback'
import { Map } from './components/Map'
import { KnowUs} from './components/Knowus'
import AdminDashboard from './components/AdminDashboard'
import { Dashboard } from './components/Dashboard'
import { YourComplains } from './components/YourComplaints'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app load
  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(user);
        setUserRole(userData.role);
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Navbar isLoggedIn={isLoggedIn} />
                <HeroSection />
                <FourStepsSection />
                <CategoriesSection />
                <Footer />
              </>
            }
          />

          <Route
            path='/signup'
            element={
              isLoggedIn ? (
                <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/dashboard'} />
              ) : (
                <Signup setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
              )
            }
          />

          <Route
            path='/login'
            element={
              isLoggedIn ? (
                <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/dashboard'} />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
              )
            }
          />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/map' element={<Map />} />
          <Route path='/your-complaints' element={<YourComplains />} />
          <Route path='/auth/google/callback' element={<GoogleCallback setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path='/knowus' element={<KnowUs />} />
        </Routes>
      </Router>
    )
}

export default App;

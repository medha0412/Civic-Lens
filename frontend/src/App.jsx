import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { HeroSection } from './components/Hero'
import { Navbar } from './components/Navbar'
import { FourStepsSection } from './components/FourSteps'
import { CategoriesSection } from './components/Types'
import { Footer } from './components/Footer'
import { Signup } from "./components/Signup"
import { Login } from './components/Login'
import { Map } from './components/Map'
import { KnowUs} from './components/Knowus'
import AdminDashboard from './components/AdminDashboard'
import { Dashboard } from './components/Dashboard'
import { YourComplains } from './components/YourComplaints'
import { GoogleCallback} from './components/GoogleCallback'
function App() {
  return (

        <Router>
          <Routes>
          <Route path='/' element={
            <>
            <Navbar></Navbar>
          <HeroSection/>
          <FourStepsSection/>
           <CategoriesSection/>
           <Footer/>
            </>
          }
          />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element ={<Dashboard />}/>
            <Route path='/admin-dashboard' element= {<AdminDashboard />} />
            <Route path='/map' element={<Map />}/>
            <Route path='/your-complaints' element={ <YourComplains />}/>
            <Route path='/auth/google/callback' element={<GoogleCallback />} />
            <Route path='/knowus' element={<KnowUs />}/>
          </Routes>
        </Router>

  )
}

export default App;

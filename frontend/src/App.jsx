import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { HeroSection } from './components/Hero'
import { Navbar } from './components/Navbar'
import { FourStepsSection } from './components/FourSteps'
import { CategoriesSection } from './components/Types'
import { Footer } from './components/Footer'
import { Signup } from "./components/Signup"
import { Login } from './components/Login'
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
          </Routes>
        </Router>

  )
}

export default App;

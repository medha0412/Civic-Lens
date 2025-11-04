import './App.css'
import { HeroSection } from './components/Hero'
import { Navbar } from './components/Navbar'
import { FourStepsSection } from './components/FourSteps'
import { CategoriesSection } from './components/Types'
import { Footer } from './components/Footer'
function App() {
  return (
    <div >
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <FourStepsSection></FourStepsSection>
        <CategoriesSection></CategoriesSection>
        <Footer></Footer>
    </div>
  )
}

export default App

import { Button } from "./ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import hero from "../assets/banner.jpg"
export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="w-[50] h-100 sm:h-96 bg-muted rounded-2xl border border-border/50 flex items-center justify-center mb-8 animate-float glow-on-hover shadow-xl mx-auto">
            <img src={hero}
             alt="hero banner"
             className="w-full h-full object-cover rounded-2xl" />
          </div>

          {/* Main Heading */}
          <div className="space-y-4 animate-slide-up-1">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-background leading-tight text-balance">
              Promote Civic Sense.
              <br />
              <span className="text-accent">Create a Better Tomorrow.</span>
            </h1>
            <p className="text-lg sm:text-xl text-background max-w-2xl mx-auto text-balance leading-relaxed">
              Capture, report, and resolve everyday civic issues to build cleaner and more responsible communities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/signup">
            <Button
              size="lg"
              className="bg-accent h-10 hover:bg-accent/90 text-accent-foreground rounded-full px-8 animate-slide-up-2 transition-all duration-300 hover:scale-105 shadow-lg glow-button-primary font-semibold"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            </Link>
            <Link to="/signup">

            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-10 px-8 border-2 border-accent/40 hover:bg-accent/10 bg-transparent animate-slide-up-3 transition-all duration-300 hover:scale-105 text-background hover:border-accent shadow-lg hover:shadow-xl font-semibold"
            >
              Learn More
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

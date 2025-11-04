"use client"

import { Button } from "./ui/button"
import civicLensLogo from "../assets/CIVIC_LENS.png"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border shadow-lg animate-fade-in transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center group">
            <img
              src={civicLensLogo}
              alt="Civic Lens Logo"
              className="h-24 w-36 transition-all duration-300 group-hover:scale-110"
            />
          </div>


          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-background hover:text-accent transition-colors text-xl duration-300 "
            >
              About
            </a>
                        <a
              href="#how-it-works"
              className="text-background text-xl hover:text-accent transition-colors duration-300 "
            >
              How It Works
            </a>
            <a
              href="#categories"
              className="text-background text-xl hover:text-accent transition-colors duration-300 "
            >
              Categories
            </a>

            <a
              href="#contact"
              className="text-background text-xl hover:text-accent transition-colors duration-300 "
            >
              Contact
            </a>
          </div>

          <Button className="bg-primary h-12 w-24 text-xl hover:bg-primary/90 text-background rounded-full transition-all duration-300 hover:scale-105 shadow-lg glow-button-primary font-semibold">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  )
}

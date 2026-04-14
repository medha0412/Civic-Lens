"use client"

import { Button } from "./ui/button"
import civicLensLogo from "../assets/CIVIC_LENS.png"
import { Link } from "react-router-dom"

export function Navbar({ isLoggedIn }) {
  return (
    <nav className="fixed top-0 w-full bg-transparent z-50 animate-fade-in transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section flex items-center justify-between h-16 mt-4 px-4 border border-border">
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
              href="#how-it-works"
              className="text-card-foreground text-xl hover:text-accent transition-colors duration-300 "
            >
              How It Works
            </a>
            <a
              href="#categories"
              className="text-card-foreground text-xl hover:text-accent transition-colors duration-300 "
            >
              Categories
            </a>

            <a
              href="#contact"
              className="text-card-foreground text-xl hover:text-accent transition-colors duration-300 "
            >
              Contact
            </a>
            <Link to="/knowus">
            <Button
              
              className="text-card-foreground hover:text-accent transition-colors text-xl  font-normal duration-300 "
            >
              Know Us 
            </Button>
            </Link>
          </div>
          {!isLoggedIn && (
            <Link to="/signup">
              <Button className="button-primary h-12 w-24 text-xl text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
              >
                Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

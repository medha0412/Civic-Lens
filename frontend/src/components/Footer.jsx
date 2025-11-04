import { Heart } from "lucide-react"
import civicLensLogo from "../assets/CIVIC_LENS.png"


export function Footer() {
  return (
    <footer className="bg-foreground border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8 shadow-2xl">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
           {/* Logo */}
                     <div className="flex items-center group -mt-7">
                       <img
                         src={civicLensLogo}
                         alt="Civic Lens Logo"
                         className="h-36 w-40 transition-all duration-300 group-hover:scale-110"
                       />
                     </div>
            <p className="text-sm text-background leading-relaxed">
              Building better communities, one report at a time.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background hover:text-accent transition-colors duration-300 font-medium">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-background hover:text-accent transition-colors duration-300 font-medium">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-background hover:text-accent transition-colors duration-300 font-medium">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-background mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background hover:text-accent transition-colors duration-300 font-medium">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-background hover:text-accent transition-colors duration-300 font-medium">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-background hover:text-accent transition-colors duration-300 font-medium">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-background mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background hover:text-accent transition-colors duration-300 font-medium">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-background hover:text-accent transition-colors duration-300 font-medium">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-background hover:text-accent transition-colors duration-300 font-medium">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/70">
          <p className="flex items-center gap-1 text-background">
            Made with <Heart className="w-4 h-4 text-background" /> for civic responsibility
          </p>
          <p className="text-background">© 2025 Civic Lens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

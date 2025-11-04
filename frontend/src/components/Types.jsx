import { Card } from "./ui/card"
import women from "../assets/women.jpg"
import crime from "../assets/crime.jpg"
import cleanliness from "../assets/cleanliness.jpg"
import animal from "../assets/animal.jpg"
import traffic from "../assets/traffic.jpg"

const categories = [
  {
    title: "Women Safety",
    image: women,
    color: "bg-red-500/20 text-red-400",
    borderColor: "border-red-500/20",
  },
  {
    title: "Traffic & Road Issues",
    image: traffic,
    color: "bg-orange-500/20 text-orange-400",
    borderColor: "border-orange-500/20",
  },
  {
    title: "Animal Safety",
    image: animal,
    color: "bg-amber-500/20 text-amber-400",
    borderColor: "border-amber-500/20",
  },
  {
    title: "Crimes & Public Safety",
    image: crime,
    color: "bg-blue-500/20 text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    title: "Infrastructure & Cleanliness",
    image: cleanliness,
    color: "bg-green-500/20 text-green-400",
    borderColor: "border-green-500/20",
  },
]

export function CategoriesSection() {
  return (
    <section id="categories" className="py-20 px-4 -mt-20 sm:px-6 lg:px-8 bg-foreground">
      <div className="max-w-6xl mx-auto text-center ">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-secondary mb-4 text-balance">Types of Civic Issues</h2>
          <p className="text-xl text-background max-w-2xl mx-auto leading-relaxed">
            Report and resolve a wide range of community concerns
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => {
            return (
              <div key={index} className={`animate-slide-up-${Math.min(Math.floor(index / 2) + 1, 4)}`}>
                <Card
                  className={`relative overflow-hidden border ${category.borderColor} hover:shadow-xl transition-all duration-300 cursor-pointer bg-card hover:scale-105 rounded-xl glow-on-hover h-64`}
                >
                  {/* Background Image */}
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-xl">{category.title}</h3>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
        <h1 className="text-background mt-5 text-2xl  font-medium">& many more ... </h1>
      </div>
    </section>
  )
}
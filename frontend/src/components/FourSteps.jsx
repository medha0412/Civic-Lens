import { Card } from "./ui/card"

import one from "../assets/cardclick.jpg"
import two from "../assets/complainrec.jpg"
import three from "../assets/fine.jpg"
import four from "../assets/saycheese.jpg"



const steps = [
  {
    number: 1,
    title: "Capture",
    description:
      "Click a photo of someone exploiting civic sense — like littering, vandalizing, or breaking public rules.",
    icon: one,
    color: "text-accent",
  },
  {
    number: 2,
    title: "Report",
    description: "Submit the complaint through Civic Lens. The officials instantly receive the report.",
    icon: two,
    color: "text-accent",
  },
  {
    number: 3,
    title: "Action",
    description: "Authorities act on the issue — like warning the person or issuing a fine.",
    icon: three,
    color: "text-accent",
  },
  {
    number: 4,
    title: "Unite",
    description: "Let's unite to promote civic sense and make our surroundings better.",
    icon: four,
    color: "text-accent",
  },
]

export function FourStepsSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-foreground -mt-14 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto ">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl sm:text-5xl font-bold text-secondary mb-4 text-balance">How Civic Lens Works</h2>
          <p className="text-xl text-background max-w-2xl mx-auto leading-relaxed">
            Four simple steps to make your community better
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className={`animate-slide-up-${Math.min(index + 1, 4)}`}>
              <Card className="border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:scale-105 bg-muted rounded-xl glow-on-hover overflow-hidden">
                {/* Full-width image at the top */}
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-full h-44 object-cover"
                />

                {/* Content below the image */}
                <div className="p-6">
                  {/* Step Number and Title */}
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-background mb-2">Step {step.number}</div>
                    <h3 className="text-2xl font-bold text-accent">{step.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-background leading-relaxed">{step.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

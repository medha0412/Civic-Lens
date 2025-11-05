"use client"

function DeveloperCard({ developer }) {
  return (
    <div
      className="rounded-xl p-8 shadow-lg h-full flex flex-col items-center text-center transition-all hover:shadow-xl hover:scale-105"
      style={{ backgroundColor: "rgba(0, 209, 178, 0.08)" }}
    >
      {/* Developer Image - using Tailwind classes for border and sizing */}
      <div
        className="w-36 h-36 rounded-full mb-6 overflow-hidden border-4 flex-shrink-0"
        style={{ borderColor: "#00D1B2" }}
      >
        <img src={developer.image || "/placeholder.svg"} alt={developer.name} className="w-full h-full object-cover" />
      </div>

      {/* Name and Roles */}
      <h3 className="text-2xl font-bold mb-2" style={{ color: "#00D1B2" }}>
        {developer.name}
      </h3>
      <p className="text-lg font-medium mb-6 text-white opacity-90">{developer.roles}</p>

      {/* Action Links - using Tailwind gap and flex utilities */}
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        {developer.links.map((link, idx) => {
          const Icon = link.icon
          return (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.label}
              className="p-3 rounded-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: "#00D1B2",
                color: "#081A2B",
              }}
              aria-label={link.label}
            >
                
              <Icon size={20} />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default DeveloperCard

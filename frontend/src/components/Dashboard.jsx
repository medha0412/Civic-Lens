import { FileText, MessageSquare, ArrowUpRight, Heart, ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import pothole1 from '../assets/pothole1.jpg'
import pothole2 from '../assets/pothole2.jpg'
import streetlight1 from '../assets/streetlight1.jpg'
import streetlight2 from '../assets/streetlight2.jpg'
import light2 from '../assets/light2.jpg'
import light1 from '../assets/light1.jpg'
import park1 from '../assets/park1.jpg'
import park2 from '../assets/park2.jpg'

export  function Dashboard() {
  const navigate = useNavigate();

  // Back Button
  const BackButton = () => (
    <div className="absolute top-4 left-4 z-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border border-border bg-card text-card-foreground hover:bg-muted"
      >
        <ArrowLeft size={20} />
        Back
      </button>
    </div>
  );

  // Sample community wall data
  const communityWall = [
    {
      id: 1,
      title: 'Pothole Fixed - Main Street',
      location: 'Main Street, Downtown',
      before: pothole1,
      after: pothole2,
      likes: 234,
      date: '2 weeks ago',
    },
    {
      id: 2,
      title: 'Broken Traffic Light Restored',
      location: 'Central Avenue',
      before: light1,
      after: light2,
      likes: 189,
      date: '1 week ago',
    },
    {
      id: 3,
      title: 'Park Cleaned & Beautified',
      location: 'Riverside Park',
      before: park1,
      after: park2,
      likes: 412,
      date: '3 days ago',
    },
    {
      id: 4,
      title: 'Street Lighting Improved',
      location: 'Oak Road',
      before: streetlight1,
      after: streetlight2,
      likes: 156,
      date: '5 days ago',
    },
  ]

  return (
    <main className="min-h-screen bg-transparent">
      <BackButton />
      {/* Header */}
      <div className="section border border-border max-w-7xl mx-auto mt-6 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-primary">
              Civic Lens
            </h1>
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
              Community Driven
            </span>
          </div>
          <p className="text-lg text-muted-foreground">
            Making our cities better, one complaint at a time
          </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="section max-w-7xl mx-auto px-6 py-12 mt-6 rounded-2xl border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* File a Complaint Card */}
          <div
            className="card group relative overflow-hidden rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl border border-border"
          >
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileText size={32} className="text-primary" />
                </div>
                <ArrowUpRight size={24} className="text-primary/60" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-card-foreground">
                File a Complaint
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Report civic issues in your area and help drive positive change
              </p>
              <Button
                onClick={() => navigate('/map')}
                className="button-primary font-semibold px-6 py-2 rounded-lg"
              >
                Start Now
              </Button>
            </div>
          </div>

          {/* Your Complaints Card */}
          <div
            className="card group relative overflow-hidden rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl border border-border"
          >
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99,102,241,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-lg bg-accent/15">
                  <MessageSquare size={32} className="text-accent" />
                </div>
                <ArrowUpRight size={24} className="text-accent" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-card-foreground">
                Your Complaints
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Track the status of your complaints and see real-world impact
              </p>
              <Button
                onClick={() => navigate('/your-complaints')}             
                className="button-primary font-semibold px-6 py-2 rounded-lg"
              >
                View All
              </Button>
            </div>
          </div>
        </div>

        {/* Community Wall Section */}
        <div className="section mb-12 p-6 rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2 text-background">
                Community Wall
              </h2>
              <p className="text-muted-foreground">
                See how our community is making a real difference
              </p>
            </div>
          </div>

          {/* Before & After Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityWall.map((item) => (
              <div
                key={item.id}
                className="card rounded-2xl overflow-hidden transform transition-all hover:scale-105 border border-border"
              >
                {/* Before & After Container */}
                <div className="relative h-96 overflow-hidden group">
                  {/* Before Image */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                    <img
                      src={item.before || "/placeholder.svg"}
                      alt={`Before: ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', color: '#ffffff' }}
                    >
                      Before
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <img
                      src={item.after || "/placeholder.svg"}
                      alt={`After: ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: 'rgba(79, 70, 229, 0.9)', color: '#ffffff' }}
                    >
                      After
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(79, 70, 229, 0.15)' }}>
                    <p className="text-sm font-semibold text-primary">
                      Hover to compare
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm mb-4 text-muted-foreground">
                    📍 {item.location}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {item.date}
                    </span>
                    <div className="flex items-center gap-2">
                      <Heart size={18} className="text-primary" />
                      <span className="font-semibold text-primary">
                        {item.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="section rounded-2xl p-12 text-center border border-border">
          <h2 className="text-3xl font-bold mb-4 text-card-foreground">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8 text-muted-foreground max-w-[600px] mx-auto">
            Join thousands of civic-minded citizens working together to improve our communities
          </p>
          <Button
            onClick={() => navigate('/map')}
            size="lg"
            className="button-primary px-8 py-3 text-lg font-semibold rounded-lg"
          >
            File Your First Complaint
          </Button>
        </div>
      </div>
    </main>
  )
}

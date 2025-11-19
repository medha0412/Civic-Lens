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
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
        style={{
          backgroundColor: 'rgba(0, 209, 178, 0.1)',
          color: '#00D1B2',
          border: '1px solid rgba(0, 209, 178, 0.3)',
        }}
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
    <main className="min-h-screen" style={{ backgroundColor: '#081A2B' }}>
      <BackButton />
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(0, 209, 178, 0.2)' }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold" style={{ color: '#00D1B2' }}>
              Civic Lens
            </h1>
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(0, 209, 178, 0.1)', color: '#00D1B2' }}>
              Community Driven
            </span>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }} className="text-lg">
            Making our cities better, one complaint at a time
          </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* File a Complaint Card */}
          <div
            className="group relative overflow-hidden rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: '#00D1B2',
              boxShadow: '0 20px 50px rgba(0, 209, 178, 0.2)',
            }}
          >
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <FileText size={32} style={{ color: '#081A2B' }} />
                </div>
                <ArrowUpRight size={24} style={{ color: 'rgba(8, 26, 43, 0.5)' }} />
              </div>
              <h2 className="text-3xl font-bold mb-3" style={{ color: '#081A2B' }}>
                File a Complaint
              </h2>
              <p className="text-lg mb-6" style={{ color: 'rgba(8, 26, 43, 0.8)' }}>
                Report civic issues in your area and help drive positive change
              </p>
              <Button
                onClick={() => navigate('/map')}
                className="font-semibold px-6 py-2 rounded-lg"
                style={{
                  backgroundColor: '#081A2B',
                  color: '#00D1B2',
                  border: 'none',
                }}
              >
                Start Now
              </Button>
            </div>
          </div>

          {/* Your Complaints Card */}
          <div
            className="group relative overflow-hidden rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: 'rgba(0, 209, 178, 0.1)',
              border: '2px solid #00D1B2',
            }}
          >
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,209,178,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(0, 209, 178, 0.2)' }}
                >
                  <MessageSquare size={32} style={{ color: '#00D1B2' }} />
                </div>
                <ArrowUpRight size={24} style={{ color: '#00D1B2' }} />
              </div>
              <h2 className="text-3xl font-bold mb-3" style={{ color: '#FFFFFF' }}>
                Your Complaints
              </h2>
              <p className="text-lg mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Track the status of your complaints and see real-world impact
              </p>
              <Button
                onClick={() => navigate('/your-complaints')}             
                className="font-semibold px-6 py-2 rounded-lg"
                style={{
                  backgroundColor: '#00D1B2',
                  color: '#081A2B',
                  border: 'none',
                }}
              >
                View All
              </Button>
            </div>
          </div>
        </div>

        {/* Community Wall Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                Community Wall
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                See how our community is making a real difference
              </p>
            </div>
          </div>

          {/* Before & After Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityWall.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden transform transition-all hover:scale-105"
                style={{
                  backgroundColor: 'rgba(0, 209, 178, 0.05)',
                  border: '1px solid rgba(0, 209, 178, 0.2)',
                }}
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
                      style={{ backgroundColor: 'rgba(8, 26, 43, 0.9)', color: '#00D1B2' }}
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
                      style={{ backgroundColor: 'rgba(0, 209, 178, 0.9)', color: '#081A2B' }}
                    >
                      After
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(0, 209, 178, 0.1)' }}>
                    <p style={{ color: '#00D1B2' }} className="text-sm font-semibold">
                      Hover to compare
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    📍 {item.location}
                  </p>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(0, 209, 178, 0.2)' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)' }} className="text-xs">
                      {item.date}
                    </span>
                    <div className="flex items-center gap-2">
                      <Heart size={18} style={{ color: '#00D1B2' }} />
                      <span style={{ color: '#00D1B2' }} className="font-semibold">
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
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            backgroundColor: 'rgba(0, 209, 178, 0.1)',
            border: '2px solid #00D1B2',
          }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
            Join thousands of civic-minded citizens working together to improve our communities
          </p>
          <Button
            onClick={() => navigate('/map')}
            size="lg"
            className="px-8 py-3 text-lg font-semibold rounded-lg"
            style={{
              backgroundColor: '#00D1B2',
              color: '#081A2B',
              border: 'none',
            }}
          >
            File Your First Complaint
          </Button>
        </div>
      </div>
    </main>
  )
}

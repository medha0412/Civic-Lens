"use client"

import { useState, useMemo, useEffect } from "react"
import { X, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Sidebar from "./sidebar"
import ComplaintCard from "./complaint-card"
import StatusModal from "./status-modal"
import "../styles/civiclens-theme.css";


export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedDateRange, setSelectedDateRange] = useState("All")
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)
  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const categories = [
    "All",
    "Garbage Issue",
    "Road Damage",
    "Water Leakage",
    "Streetlight Fault",
    "Noise Pollution",
    "Public Cleanliness",
    "Pothole",
    "Traffic Signal Issue",
    "Park Maintenance",
    "Drainage Problem",
    "Broken Pavement",
    "Illegal Dumping",
    "Public Facility Damage",
    "Tree/Vegetation Issue",
    "Air Pollution",
    "Animal Menace",
    "Other"
  ]
  const statuses = ["All", "Pending", "In Progress", "Resolved"]
  const dateRanges = ["All", "Last 7 days", "Last 30 days", "Last 90 days"]

  // ✅ Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No authentication token found. Please log in.')
        }
        const res = await fetch("http://localhost:5000/api/admin/complaints", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message || `Failed to fetch complaints (${res.status})`)
        }
        const data = await res.json()
        setComplaints(data.data?.complaints || data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  // ✅ Filter logic
  const filteredComplaints = useMemo(() => {
    const now = new Date()
    return complaints.filter((complaint) => {
      const categoryMatch = selectedCategory === "All" || complaint.category === selectedCategory
      
      // Convert selectedStatus to lowercase for comparison
      let statusValue = selectedStatus.toLowerCase()
      if (statusValue === "in progress") statusValue = "in-progress"
      const statusMatch = selectedStatus === "All" || complaint.status === statusValue

      let dateMatch = true
      if (selectedDateRange !== "All") {
        const complaintDate = new Date(complaint.createdAt)
        const daysDiff = Math.floor((now - complaintDate) / (1000 * 60 * 60 * 24))
        if (selectedDateRange === "Last 7 days") dateMatch = daysDiff <= 7
        else if (selectedDateRange === "Last 30 days") dateMatch = daysDiff <= 30
        else if (selectedDateRange === "Last 90 days") dateMatch = daysDiff <= 90
      }

      return categoryMatch && statusMatch && dateMatch
    })
  }, [complaints, selectedCategory, selectedStatus, selectedDateRange])

  // ✅ Handle modal open and status update
  const handleTakeAction = (complaint) => {
    setSelectedComplaint(complaint)
    setIsModalOpen(true)
  }

  const handleViewPhoto = (url) => {
    if (!url) return
    // If backend returns a relative path like "/uploads/..." we must load it from the API origin
    let finalUrl = url
    try {
      const parsed = new URL(url)
      // If parsing succeeds and protocol exists, use it as-is
      finalUrl = parsed.href
    } catch (e) {
      // Not a full URL — assume it's a backend-relative path and prefix with API origin
      if (url.startsWith('/')) {
        finalUrl = `${window.location.protocol}//${window.location.hostname}:5000${url}`
      } else {
        // fallback: treat as relative to uploads path
        finalUrl = `${window.location.protocol}//${window.location.hostname}:5000/${url}`
      }
    }

    setPhotoUrl(finalUrl)
    setIsPhotoOpen(true)
  }

  const handleStatusUpdate = async (newStatus) => {
    if (!selectedComplaint) return
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found. Please log in.')
      }
      const res = await fetch(`http://localhost:5000/api/admin/complaints/${selectedComplaint._id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to update status")
      }
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === selectedComplaint._id ? { ...c, status: newStatus } : c
        )
      )
      setIsModalOpen(false)
      setSelectedComplaint(null)
    } catch (err) {
      console.error(err)
      alert("Failed to update complaint status: " + err.message)
    }
  }

  const getStatsByStatus = () => ({
    pending: complaints.filter((c) => c.status === "pending").length,
    inProgress: complaints.filter((c) => c.status === "in-progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  })

  const stats = getStatsByStatus()

  // ✅ Loading & error states
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl text-gray-300 bg-[#081A2B]">
        Loading complaints...
      </div>
    )

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-xl text-red-400 bg-[#081A2B]">
        Error: {error}
      </div>
    )

  return (
    <div className="civiclens-theme dark min-h-screen bg-[#081A2B] text-white flex">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        statuses={statuses}
        dateRanges={dateRanges}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        selectedDateRange={selectedDateRange}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
        onDateRangeChange={setSelectedDateRange}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-[#0B253D] border-b border-[#00D1B2]/30 p-8">
          <h1 className="text-4xl font-bold text-[#00D1B2] mb-2">
            CivicLens Admin Dashboard
          </h1>
          <p className="text-gray-300">
            Manage and track civic complaints efficiently
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 p-8">
          <div className="bg-[#0E2D4A] rounded-lg p-6 border border-[#00D1B2]/40 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Pending</p>
                <p className="text-3xl font-bold text-[#00D1B2]">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-[#00D1B2]" />
            </div>
          </div>

          <div className="bg-[#0E2D4A] rounded-lg p-6 border border-[#00D1B2]/40 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-[#00D1B2]">{stats.inProgress}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-[#00D1B2]" />
            </div>
          </div>

          <div className="bg-[#0E2D4A] rounded-lg p-6 border border-[#00D1B2]/40 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Resolved</p>
                <p className="text-3xl font-bold text-[#00D1B2]">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-[#00D1B2]" />
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#00D1B2]">
              Complaints ({filteredComplaints.length})
            </h2>
            {(selectedCategory !== "All" ||
              selectedStatus !== "All" ||
              selectedDateRange !== "All") && (
              <button
                onClick={() => {
                  setSelectedCategory("All")
                  setSelectedStatus("All")
                  setSelectedDateRange("All")
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#00D1B2]/20 hover:bg-[#00D1B2]/30 rounded-lg"
              >
                <X className="w-4 h-4" /> Clear Filters
              </button>
            )}
          </div>

          {filteredComplaints.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint._id}
                  complaint={complaint}
                  onTakeAction={handleTakeAction}
                  onViewPhoto={handleViewPhoto}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#0E2D4A] rounded-lg border border-[#00D1B2]/30">
              <p className="text-gray-400 text-lg">
                No complaints match your filters
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Status Modal */}
      <StatusModal
        isOpen={isModalOpen}
        complaint={selectedComplaint}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedComplaint(null)
        }}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Photo Viewer Modal */}
      {isPhotoOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Complaint Photo</h3>
              <button
                onClick={() => { setIsPhotoOpen(false); setPhotoUrl(null) }}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-black/30">
              <img src={photoUrl} alt="Complaint" className="max-w-full max-h-[80vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


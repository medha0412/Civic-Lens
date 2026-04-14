"use client"

import { useState, useMemo, useEffect } from "react"
import { X, CheckCircle, Clock, AlertCircle, ArrowLeft } from "lucide-react"
import Sidebar from "./sidebar"
import ComplaintCard from "./complaint-card"
import StatusModal from "./status-modal"
import { useNavigate } from "react-router-dom"
import { API_ENDPOINTS, getFullUrl } from "../config/api"


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
        const res = await fetch(API_ENDPOINTS.ADMIN_COMPLAINTS, {
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
      finalUrl = getFullUrl(url)
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
      const res = await fetch(API_ENDPOINTS.ADMIN_COMPLAINT_UPDATE(selectedComplaint._id), {
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
      <div className="flex h-screen items-center justify-center text-xl text-background bg-transparent">
        Loading complaints...
      </div>
    )

  if (error)
    return (
      <div className="flex h-screen  items-center justify-center text-xl text-destructive bg-transparent">
        Error: {error}
      </div>
    )

  return (
    <div className="min-h-screen bg-transparent text-background flex">
      <BackButton />
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
        <div className="section border border-border p-8 m-6 rounded-2xl">
          <h1 className="text-4xl font-bold text-primary mb-2">
            CivicLens Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and track civic complaints efficiently
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 px-6">
          <div className="card rounded-lg p-6 border border-border shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-bold text-primary">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="card rounded-lg p-6 border border-border shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                <p className="text-3xl font-bold text-primary">{stats.inProgress}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="card rounded-lg p-6 border border-border shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Resolved</p>
                <p className="text-3xl font-bold text-primary">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="section p-8 m-6 rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">
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
                className="flex items-center gap-2 px-4 py-2 bg-primary/15 hover:bg-primary/25 text-primary rounded-lg transition-colors"
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
            <div className="text-center py-12 card rounded-lg border border-border">
              <p className="text-muted-foreground text-lg">
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
              <h3 className="text-lg font-bold text-card-foreground">Complaint Photo</h3>
              <button
                onClick={() => { setIsPhotoOpen(false); setPhotoUrl(null) }}
                className="p-1 hover:bg-secondary rounded transition-colors text-card-foreground"
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


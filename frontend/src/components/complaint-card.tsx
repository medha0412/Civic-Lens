"use client"
import { Calendar, Tag, AlertCircle, Clock, CheckCircle, Image as ImageIcon } from "lucide-react"

interface ComplaintCardProps {
  complaint: {
    _id?: string
    id?: number
    message: string
    category: string
    createdAt: string
    status: string
    photo?: string
    city?: string
    createdBy?: {
      name: string
      email: string
      city: string
    }
  }
  onTakeAction: (complaint: any) => void
}

export default function ComplaintCard({ complaint, onTakeAction, onViewPhoto }: any) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-accent" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "resolved":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      default:
        return "bg-secondary text-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:border-accent/30">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">{complaint.message}</h3>
          {complaint.city && <p className="text-muted-foreground text-sm mb-1">📍 {complaint.city}</p>}
        </div>
        <div
          className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-2 whitespace-nowrap ml-4 ${getStatusColor(complaint.status)}`}
        >
          {getStatusIcon(complaint.status)}
          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1).replace('-', ' ')}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-accent" />
          <span>{complaint.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          <span>{formatDate(complaint.createdAt)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        {complaint.photo && (
          <button
            onClick={() => onViewPhoto && onViewPhoto(complaint.photo)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg text-sm font-semibold transition-colors"
          >
            <ImageIcon className="w-4 h-4" /> View Photo
          </button>
        )}

        <button
          onClick={() => onTakeAction(complaint)}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Take Action
        </button>
      </div>
    </div>
  )
}

"use client"
import { X } from "lucide-react"

interface StatusModalProps {
  isOpen: boolean
  complaint: {
    _id?: string
    id?: number
    message: string
    category: string
    createdAt: string
    status: string
    city?: string
    createdBy?: {
      name: string
      email: string
      city: string
    }
  } | null
  onClose: () => void
  onStatusUpdate: (newStatus: string) => void
}

export default function StatusModal({ isOpen, complaint, onClose, onStatusUpdate }: StatusModalProps) {
  if (!isOpen || !complaint) return null

  const statuses = ["pending", "in-progress", "resolved"]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Update Status</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-1">Complaint</p>
            <p className="text-foreground font-semibold line-clamp-2">{complaint.message}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3 font-semibold">Select New Status</p>
            <div className="space-y-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusUpdate(status)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all font-medium capitalize ${
                    complaint.status === status
                      ? "bg-accent border-accent text-accent-foreground"
                      : "bg-secondary border-border hover:border-accent text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {status.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors font-medium"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

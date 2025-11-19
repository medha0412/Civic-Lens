import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Tag, Clock, ArrowLeft, CheckCircle, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
export function YourComplains() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Back Button
  const BackButton = () => (
    <div className="absolute top-4 left-4 z-10">
      <button
        onClick={() => navigate('/dashboard')}
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

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/complaints", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setComplaints(response.data.data.complaints);
        } else {
          setError("Failed to fetch complaints");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-400" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "resolved":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-secondary text-foreground";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#081A2B' }}>
        <div className="text-white">Loading your complaints...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#081A2B' }}>
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#081A2B' }}>
        <BackButton />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: '#00D1B2' }}>
          Your Complaints
        </h1>

        {complaints.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white text-lg">You haven't filed any complaints yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-card border border-border rounded-lg p-6 shadow-md"
                style={{ backgroundColor: 'rgba(0, 209, 178, 0.05)', borderColor: 'rgba(0, 209, 178, 0.2)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{complaint.message}</h3>
                    <p className="text-sm text-gray-300 mb-1">📍 {complaint.city}{complaint.area ? `, ${complaint.area}` : ''}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-2 whitespace-nowrap ml-4 ${getStatusColor(complaint.status)}`}
                  >
                    {getStatusIcon(complaint.status)}
                    {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1).replace('-', ' ')}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm text-gray-400 border-t border-gray-600 pt-4">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" style={{ color: '#00D1B2' }} />
                    <span>{complaint.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: '#00D1B2' }} />
                    <span>{formatDate(complaint.createdAt)}</span>
                  </div>
                </div>

                {complaint.photo && (
                  <div className="mb-4">
                    <img
                      src={`http://localhost:5000${complaint.photo}`}
                      alt="Complaint photo"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-600"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

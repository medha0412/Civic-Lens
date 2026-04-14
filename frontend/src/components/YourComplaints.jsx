import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Tag, Clock, ArrowLeft, CheckCircle, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, getFullUrl } from "../config/api";

export function YourComplains() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState("");
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [photoReloadKey, setPhotoReloadKey] = useState(0);
  const navigate = useNavigate();
  const FALLBACK_API_ORIGIN = "https://civic-lens-1-23jq.onrender.com";

  const getPhotoUrls = (photoPath) => {
    if (!photoPath) return [];

    const normalizedPath = String(photoPath).replace(/\\/g, "/");

    // Full URL from backend — no fallback needed.
    if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
      return [normalizedPath];
    }

    const localResolved = getFullUrl(normalizedPath);
    const fallbackResolved = `${FALLBACK_API_ORIGIN}${normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`}`;

    return localResolved === fallbackResolved
      ? [localResolved]
      : [localResolved, fallbackResolved];
  };

  const handleViewPhoto = (photoPath) => {
    const urls = getPhotoUrls(photoPath);
    if (!urls.length) return;
    // Force image refresh each time user opens the viewer.
    setPhotoReloadKey((prev) => prev + 1);
    setSelectedPhotoUrl(urls[0]);
    setIsPhotoOpen(true);
  };

  // Back Button
  const BackButton = () => (
    <div className="absolute top-4 left-4 z-10">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border border-border bg-card text-card-foreground hover:bg-muted"
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

        const response = await axios.get(API_ENDPOINTS.COMPLAINTS, {
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
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-background">Loading your complaints...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-transparent">
        <BackButton />
      <div className="section max-w-4xl mx-auto p-6 rounded-2xl border border-border">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">
          Your Complaints
        </h1>

        {complaints.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-background text-lg">You haven't filed any complaints yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="card bg-card border border-border rounded-lg p-6 shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{complaint.message}</h3>
                    <p className="text-sm text-muted-foreground mb-1">📍 {complaint.city}{complaint.area ? `, ${complaint.area}` : ''}</p>
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
                    <Tag className="w-4 h-4 text-primary" />
                    <span>{complaint.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{formatDate(complaint.createdAt)}</span>
                  </div>
                </div>

                {complaint.photo && (
                  <div className="mb-2">
                    <img
                      src={getPhotoUrls(complaint.photo)[0]}
                      alt="Complaint photo"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-border"
                      onError={(e) => {
                        const fallbackUrl = getPhotoUrls(complaint.photo)[1];
                        if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
                          e.currentTarget.src = fallbackUrl;
                          return;
                        }
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleViewPhoto(complaint.photo)}
                      className="button-primary mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold"
                    >
                      <ImageIcon className="w-4 h-4" />
                      View Photo
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isPhotoOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-bold text-card-foreground">Complaint Photo</h3>
              <button
                onClick={() => {
                  setIsPhotoOpen(false);
                  setSelectedPhotoUrl("");
                }}
                className="p-1 hover:bg-muted rounded transition-colors text-card-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-black/30">
              <img
                key={`${selectedPhotoUrl}-${photoReloadKey}`}
                src={`${selectedPhotoUrl}${selectedPhotoUrl.includes("?") ? "&" : "?"}v=${photoReloadKey}`}
                alt="Complaint"
                className="max-w-full max-h-[80vh] object-contain rounded"
                onError={(e) => {
                  const complaintForSelectedPhoto = complaints.find((c) => {
                    if (!c.photo) return false;
                    return getPhotoUrls(c.photo).some((u) => selectedPhotoUrl.startsWith(u));
                  });
                  const fallbackUrl = complaintForSelectedPhoto
                    ? getPhotoUrls(complaintForSelectedPhoto.photo)[1]
                    : "";

                  if (fallbackUrl && !e.currentTarget.src.startsWith(fallbackUrl)) {
                    e.currentTarget.src = `${fallbackUrl}${fallbackUrl.includes("?") ? "&" : "?"}v=${photoReloadKey}`;
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

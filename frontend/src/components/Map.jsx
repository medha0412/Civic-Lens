import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const OPENCAGE_KEY = "a0ba57399bda41859511a5759c08c819";

// ✅ Custom map mover — will only run when `flyTrigger` changes
function MoveMapToCity({ coords, flyTrigger }) {
  const map = useMap();
  

  useEffect(() => {
    if (coords) map.flyTo(coords, 13, { animate: true, duration: 2 });
  }, [flyTrigger]); // only re-run when city search triggers it
  return null;
}

export function Map() {
  const [city, setCity] = useState("");
  const [mapCenter, setMapCenter] = useState([22.7196, 75.8577]); // default Indore
  const [markerPos, setMarkerPos] = useState(null);
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [radius, setRadius] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
const [flyTrigger, setFlyTrigger] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const fileInputRef = useRef();
  const cameraInputRef = useRef();
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
  const mapRef = useRef();

  // 🔍 Search City
const handleCitySearch = async () => {
  if (!city.trim()) return alert("Please enter a city name.");

  setLoading(true);
  try {
    let query = city.trim();

    // ✅ Custom correction: fix ambiguous results
    if (query.toLowerCase() === "dewas") {
      query = "Dewas city, Madhya Pradesh, India";
    }

    const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
      params: {
        q: query,
        countrycode: "in",
        key: OPENCAGE_KEY,
        limit: 1,
      },
    });

    if (!res.data.results.length) {
      alert("City not found. Please check spelling.");
      return;
    }

    const result = res.data.results[0];
    const { lat, lng } = result.geometry;
    const formatted = result.formatted;

    setMapCenter([lat, lng]);
    setMarkerPos([lat, lng]);
    setLat(lat.toFixed(6));
    setLng(lng.toFixed(6));
    setAddress(formatted);
    setIsLocked(false);

    if (result.bounds) {
      const { northeast, southwest } = result.bounds;
      const approxRadius = L.latLng(northeast).distanceTo(L.latLng(southwest)) / 2.5;
      setRadius(Math.min(approxRadius, 3500)); // Reduced to 3.5 km max
    } else {
      setRadius(3500); // Default to 3.5 km if no bounds
    }

    setFlyTrigger((prev) => prev + 1); // trigger smooth fly
  } catch (err) {
    console.error("Error fetching city:", err);
    alert("Failed to fetch city location.");
  } finally {
    setLoading(false);
  }
};



  // 🧭 Reverse Geocode
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: { q: `${lat},${lon}`, key: OPENCAGE_KEY },
      });
      const result = res.data.results[0];
      if (result) setAddress(result.formatted);
    } catch (err) {
      console.error("Reverse geocode error:", err);
    }
  };

  // 🔘 Marker Drag Logic (stay inside circle)
  const handleMarkerDrag = (e) => {
    const newLatLng = e.target.getLatLng();
    const center = L.latLng(mapCenter);
    const distance = center.distanceTo(newLatLng);

    if (distance > radius) {
      const direction = L.latLng(
        center.lat + ((newLatLng.lat - center.lat) * radius) / distance,
        center.lng + ((newLatLng.lng - center.lng) * radius) / distance
      );
      e.target.setLatLng(direction);
      setMarkerPos([direction.lat, direction.lng]);
      setLat(direction.lat.toFixed(6));
      setLng(direction.lng.toFixed(6));
      reverseGeocode(direction.lat, direction.lng);
    } else {
      setMarkerPos([newLatLng.lat, newLatLng.lng]);
      setLat(newLatLng.lat.toFixed(6));
      setLng(newLatLng.lng.toFixed(6));
      reverseGeocode(newLatLng.lat, newLatLng.lng);
    }
  };

  const handlePhotoSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
      setShowPhotoOptions(false);
    }
  };

  const handleCaptionChange = (e) => {
    const text = e.target.value;
    setCaption(text);
    if (photo) {
      // onPhotoCapture(photo, text); // Assuming this is handled in parent, but since it's all in one component, we can skip
    }
  };

  const handleUploadFromDevice = () => {
    fileInputRef.current?.click();
  };

  const handleCamera = () => {
    cameraInputRef.current?.click();
  };

  const wordCount = caption.trim().split(/\s+/).filter(w => w.length > 0).length;
  const isValidCaption = wordCount >= 20 && wordCount <= 30;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city || !photo || !isValidCaption) {
      alert("Please fill all required fields with valid data");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("message", caption);
    formDataToSend.append("latitude", lat);
    formDataToSend.append("longitude", lng);
    formDataToSend.append("city", city);
    formDataToSend.append("area", address);
    formDataToSend.append("photo", photo);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/complaints', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Form submitted successfully:", response.data);

      setShowModal(true);

      // Clear photo immediately after submission
      setPhoto(null);
      setPreview(null);
      setCaption("");

      // Reset form after 5 seconds
      setTimeout(() => {
        setCity("");
        setMapCenter([22.7196, 75.8577]);
        setMarkerPos(null);
        setAddress("");
        setLat("");
        setLng("");
        setRadius(5000);
        setIsLocked(false);
        setShowModal(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting complaint. Please try again.");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#081A2B" }}>
      <BackButton />
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
            File a Complaint
          </h1>
          <p style={{ color: "#00D1B2" }}>
            Help us improve your locality by reporting issues with precise location details
          </p>
        </div>

        {/* Modal Popup */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border-2 rounded-lg p-6 max-w-md w-full mx-4" style={{ borderColor: "#00D1B2" }}>
              <p className="text-lg font-semibold text-center" style={{ color: "#081A2B" }}>
                ✓ Your complaint has been sent to authorities. Keep checking your complaints section to see the progress of your complaint.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column - City Input and Search */}
          <div className="p-6 rounded-lg border-2" style={{ backgroundColor: "#0F1F2B", borderColor: "#00D1B2" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#00D1B2" }}>
              📍 Location Details
            </h2>

            {/* City Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3" style={{ color: "#FFFFFF" }}>
                Enter Your City
              </label>
              <input
                type="text"
                placeholder="e.g., Ujjain, Mumbai, Delhi..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border-2 p-3 rounded w-full"
                style={{
                  backgroundColor: "#081A2B",
                  borderColor: "#00D1B2",
                  color: "#FFFFFF",
                }}
                required
              />
            </div>

            {/* Search Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleCitySearch}
                disabled={loading}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 w-full"
                style={{ backgroundColor: loading ? "#4A4A4A" : "#00D1B2", color: "#081A2B" }}
              >
                {loading ? "Loading..." : "Search City"}
              </button>
            </div>

            {/* Latitude Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: "#FFFFFF" }}>
                Latitude
              </label>
              <input
                type="text"
                value={lat}
                readOnly
                className="border-2 p-3 rounded w-full"
                style={{
                  backgroundColor: "#4A4A4A",
                  borderColor: "#00D1B2",
                  color: "#FFFFFF",
                }}
              />
            </div>

            {/* Longitude Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: "#FFFFFF" }}>
                Longitude
              </label>
              <input
                type="text"
                value={lng}
                readOnly
                className="border-2 p-3 rounded w-full"
                style={{
                  backgroundColor: "#4A4A4A",
                  borderColor: "#00D1B2",
                  color: "#FFFFFF",
                }}
              />
            </div>

            {/* Area Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: "#FFFFFF" }}>
                Area Name
              </label>
              <input
                type="text"
                value={address}
                readOnly
                placeholder="Area name will appear here..."
                className="border-2 p-3 rounded w-full"
                style={{
                  backgroundColor: "#4A4A4A",
                  borderColor: "#00D1B2",
                  color: "#FFFFFF",
                }}
              />
            </div>
          </div>

          {/* Right Column - Map and Lock */}
          <div className="p-6 rounded-lg border-2" style={{ backgroundColor: "#0F1F2B", borderColor: "#00D1B2" }}>
            {/* Map Component */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3" style={{ color: "#FFFFFF" }}>
                Drag the Pin to Your Locality
              </label>
              <div className="relative w-full h-80 rounded-lg overflow-hidden border-2" style={{ borderColor: "#00D1B2" }}>
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  ref={mapRef}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <MoveMapToCity coords={mapCenter} flyTrigger={flyTrigger} />

                  <Circle
                    center={mapCenter}
                    radius={radius}
                    pathOptions={{
                      color: isLocked ? "green" : "red",
                      fillOpacity: 0.1,
                    }}
                  />

                  {markerPos && (
                    <Marker
                      position={markerPos}
                      draggable={!isLocked}
                      eventHandlers={!isLocked ? { drag: handleMarkerDrag } : {}}
                    >
                      <Popup>
                        <b>{isLocked ? "📍 Location Locked" : "Selected Location"}</b>
                        <br />
                        {address || "Fetching address..."}
                        <br />
                        Lat: {lat}, Lng: {lng}
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            </div>

            {/* Lock Location Checkbox */}
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#081A2B" }}>
              <input
                type="checkbox"
                id="lock"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
                disabled={!markerPos}
                className="border-2"
                style={{ borderColor: "#00D1B2", width: "20px", height: "20px" }}
              />
              <label htmlFor="lock" className="text-sm font-medium cursor-pointer" style={{ color: "#FFFFFF" }}>
                Lock my location (This location won't change during form submission)
              </label>
            </div>
          </div>
        </div>

        {/* Photo Upload Section Below */}
        <div className="mb-6">
          <div className="p-6 rounded-lg border-2" style={{ backgroundColor: "#0F1F2B", borderColor: "#00D1B2" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#00D1B2" }}>
              📸 Photo & Description
            </h2>

            {/* Photo Preview */}
            {preview ? (
              <div className="mb-6">
                <div
                  className="relative w-full h-48 rounded-lg overflow-hidden border-2 mb-4"
                  style={{ borderColor: "#00D1B2" }}
                >
                  <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      setPreview(null);
                      setCaption("");
                    }}
                    className="absolute top-2 right-2 px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
                <p style={{ color: "#FFFFFF" }} className="text-sm">
                  Photo: {photo?.name}
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                  className="w-full p-8 rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3"
                  style={{
                    borderColor: "#00D1B2",
                    backgroundColor: "#081A2B",
                    color: "#00D1B2",
                  }}
                >
                  <span className="text-3xl">📷</span>
                  <span className="font-semibold">Click to Upload Photo</span>
                </button>

                {showPhotoOptions && (
                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={handleCamera}
                      className="flex-1 py-2 rounded"
                      style={{ backgroundColor: "#00D1B2", color: "#081A2B" }}
                    >
                       Camera
                    </button>
                    <button
                      type="button"
                      onClick={handleUploadFromDevice}
                      className="flex-1 py-2 rounded"
                      style={{ backgroundColor: "#00D1B2", color: "#081A2B" }}
                    >
                       Device
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handlePhotoSelect(e.target.files[0]);
                    }
                  }}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handlePhotoSelect(e.target.files[0]);
                    }
                  }}
                />
              </div>
            )}

            {/* Caption Section */}
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium mb-2" style={{ color: "#FFFFFF" }}>
                Write a Caption (20-30 words)
              </label>
              <textarea
                placeholder="Describe the issue in detail..."
                value={caption}
                onChange={handleCaptionChange}
                disabled={!photo}
                className="flex-1 border-2 p-3 resize-none"
                style={{
                  backgroundColor: photo ? "#081A2B" : "#4A4A4A",
                  borderColor: "#00D1B2",
                  color: "#FFFFFF",
                }}
              />

              {/* Word Count */}
              <div className="mt-3 flex items-center justify-between">
                <span style={{ color: "#FFFFFF" }} className="text-sm">
                  Words:{" "}
                  <span style={{ color: wordCount >= 20 && wordCount <= 30 ? "#00D1B2" : "#FF6B6B" }} className="font-bold">
                    {wordCount}
                  </span>
                  /30
                </span>
                <span style={{ color: isValidCaption ? "#00D1B2" : "#FF6B6B" }} className="text-sm font-semibold">
                  {isValidCaption ? "✓ Valid" : wordCount < 20 ? `${20 - wordCount} more words` : "Too many words"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-2 border-2 bg-transparent rounded"
            style={{
              borderColor: "#00D1B2",
              color: "#00D1B2",
              backgroundColor: "transparent",
            }}
            onClick={() => {
              setCity("");
              setMapCenter([22.7196, 75.8577]);
              setMarkerPos(null);
              setAddress("");
              setLat("");
              setLng("");
              setRadius(5000);
              setIsLocked(false);
              setPhoto(null);
              setPreview(null);
              setCaption("");
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!city || !photo || !isValidCaption}
            className="px-8 py-2 font-semibold text-lg rounded disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isValidCaption && photo && city ? "#00D1B2" : "#4A4A4A",
              color: "#081A2B",
            }}
          >
            Send Complaint
          </button>
        </div>
      </form>
    </div>
  );
}

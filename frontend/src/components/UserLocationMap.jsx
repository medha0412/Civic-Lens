import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const UserLocationMap = () => {
  const [position, setPosition] = useState(null);

  // Custom marker icon (optional fix for missing default marker)
  const userIcon = L.icon({
    iconUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Error getting location:", err);
          alert("Unable to get your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden">
      {position ? (
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={userIcon}>
            <Popup>You are here 🧭</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-600">
          Detecting location...
        </div>
      )}
    </div>
  );
};

export default UserLocationMap;

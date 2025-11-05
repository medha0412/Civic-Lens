import React ,{ useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});


export function Map(){
     const [position, setPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
     const watchId = navigator.geolocation.watchPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    console.log("Updated location:", latitude, longitude);
    setPosition([latitude, longitude]);
  },
  (err) => {
    console.error("Geolocation error:", err);
    alert("Unable to fetch location. Please enable precise location access.");
  },
  {
    enableHighAccuracy: true, // forces GPS usage if available
    timeout: 10000,           // 10 s timeout
    maximumAge: 0,            // always fresh
  }
);

return () => navigator.geolocation.clearWatch(watchId);

    } else {
      setError("Geolocation not supported by your browser.");
    }
  }, []);
   
   
  useEffect(() => {
    // Request user's current geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("User Location:", latitude, longitude);
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Geolocation Error:", err);
          alert("Unable to fetch location. Please enable location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {position ? (
        <MapContainer
          center={position}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={position}>
            <Popup>Your current location</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Fetching your live location...
        </p>
      )}
    </div>
  );
}

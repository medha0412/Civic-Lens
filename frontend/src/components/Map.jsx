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
  const [flyTrigger, setFlyTrigger] = useState(0); // ✅ added flag

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
      setRadius(Math.min(approxRadius, 15000));
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

  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">City-Restricted Map Picker</h1>

      {/* Search + Lock Buttons */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city (e.g. Dewas)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded text-black w-72"
        />
        <button
          onClick={handleCitySearch}
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Search City"}
        </button>

        {markerPos && (
          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`px-4 py-2 rounded ${
              isLocked
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {isLocked ? "Unlock Location" : "Lock Location"}
          </button>
        )}
      </div>

      <p className="text-sm text-gray-300 mb-2">
        {markerPos
          ? `📍 Lat: ${lat}, Lng: ${lng}`
          : "Search for a city and drag the marker inside the circle."}
      </p>

      {address && <p className="text-sm text-gray-400 mb-2">🏠 {address}</p>}

      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "70vh", width: "80vw", borderRadius: "12px" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ✅ only fly once when searching city */}
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
  );
}

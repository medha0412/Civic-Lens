import React ,{ useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export function Map({ city }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    async function fetchCityCoords() {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.error("City not found:", city);
        }
      } catch (error) {
        console.error("Error fetching city location:", error);
      }
    }
    fetchCityCoords();
  }, [city]);

  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Map of {city}
      </h1>
      {position ? (
        <MapContainer
          center={position}
          zoom={12}
          style={{ height: "70vh", width: "80vw", borderRadius: "16px" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{city}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map of {city}...</p>
      )}
    </div>
  );
}

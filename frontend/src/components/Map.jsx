// // import React ,{ useState, useEffect} from "react";
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import L from "leaflet";
// // import axios from "axios";


// // delete L.Icon.Default.prototype._getIconUrl;
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl:
// //     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
// //   iconUrl:
// //     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
// //   shadowUrl:
// //     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// // });

// // export function Map({ city }) {
// //   const [position, setPosition] = useState(null);

// //   useEffect(() => {
// //     async function fetchCityCoords() {
// //       try {
// //         const response = await fetch(
// //           `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
// //         );
// //         const data = await response.json();
// //         if (data.length > 0) {
// //           const { lat, lon } = data[0];
// //           setPosition([parseFloat(lat), parseFloat(lon)]);
// //         } else {
// //           console.error("City not found:", city);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching city location:", error);
// //       }
// //     }
// //     fetchCityCoords();
// //   }, [city]);

// //   return (
// //     <div className="h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center">
// //       <h1 className="text-3xl font-bold mb-6">
// //         Map of {city}
// //       </h1>
// //       {position ? (
// //         <MapContainer
// //           center={position}
// //           zoom={12}
// //           style={{ height: "70vh", width: "80vw", borderRadius: "16px" }}
// //         >
// //           <TileLayer
// //             attribution='&copy; OpenStreetMap contributors'
// //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           />
// //           <Marker position={position}>
// //             <Popup>{city}</Popup>
// //           </Marker>
// //         </MapContainer>
// //       ) : (
// //         <p>Loading map of {city}...</p>
// //       )}
// //     </div>
// //   );
// // }




// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix for missing default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// export function Map() {
//   const [position, setPosition] = useState(null);

//   useEffect(() => {
//     // Use browser geolocation API
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude, accuracy } = pos.coords;
//           console.log(`Location accuracy: ${accuracy} meters.`);
//           setPosition([latitude, longitude]);
//         },
//         (err) => {
//           console.error("Error getting location:", err);
//           alert("Could not get your location. Please enable location access.");
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   }, []);

//   return (
//     <div className="h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mb-6">Your Current Location</h1>
//       {position ? (
//         <MapContainer
//           center={position}
//           zoom={15}
//           style={{ height: "70vh", width: "80vw", borderRadius: "16px" }}
//         >
//           <TileLayer
//             attribution='&copy; OpenStreetMap contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={position}>
//             <Popup>You are here 🧭</Popup>
//           </Marker>
//         </MapContainer>
//       ) : (
//         <p>Detecting your location...</p>
//       )}
//     </div>
//   );
// }








//---------------------------------------------------------------------------------------------------------------------------






// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix missing marker icons in Leaflet (important)
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// export function Map() {
//   const [position, setPosition] = useState(null);
//   const [lat, setLat] = useState("");
//   const [lng, setLng] = useState("");

//   // Auto-detect location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setPosition([latitude, longitude]);
//           setLat(latitude);
//           setLng(longitude);
//         },
//         (err) => {
//           console.error("Error getting location:", err);
//           alert("Could not get your location. Please allow location access or enter coordinates manually.");
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     }
//   }, []);

//   // Handle map click to move marker
//   function LocationSelector() {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setPosition([lat, lng]);
//         setLat(lat.toFixed(6));
//         setLng(lng.toFixed(6));
//       },
//     });
//     return null;
//   }

//   // Handle manual coordinate input
//   const handleShowLocation = () => {
//     if (lat && lng) {
//       setPosition([parseFloat(lat), parseFloat(lng)]);
//     } else {
//       alert("Please enter both latitude and longitude");
//     }
//   };

//   return (
//     <div className="h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mb-4">Set Your Exact Location</h1>

//       <div className="flex gap-2 mb-4 flex-wrap justify-center">
//         <input
//           type="number"
//           step="any"
//           placeholder="Latitude"
//           value={lat}
//           onChange={(e) => setLat(e.target.value)}
//           className="p-2 rounded text-black w-36"
//         />
//         <input
//           type="number"
//           step="any"
//           placeholder="Longitude"
//           value={lng}
//           onChange={(e) => setLng(e.target.value)}
//           className="p-2 rounded text-black w-36"
//         />
//         <button
//           onClick={handleShowLocation}
//           className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Go
//         </button>
//       </div>

//       {position ? (
//         <MapContainer
//           center={position}
//           zoom={16}
//           style={{ height: "70vh", width: "80vw", borderRadius: "16px" }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           <LocationSelector />

//           <Marker
//             position={position}
//             draggable={true}
//             eventHandlers={{
//               dragend: (e) => {
//                 const { lat, lng } = e.target.getLatLng();
//                 setLat(lat.toFixed(6));
//                 setLng(lng.toFixed(6));
//                 setPosition([lat, lng]);
//               },
//             }}
//           >
//             <Popup>
//               You are here 🧭 <br />
//               Lat: {lat} <br />
//               Lng: {lng}
//             </Popup>
//           </Marker>
//         </MapContainer>
//       ) : (
//         <p>Detecting your location...</p>
//       )}
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import axios from "axios";

// // Fix missing marker icons in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// export function Map() {
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [position, setPosition] = useState(null);
//   const [lat, setLat] = useState("");
//   const [lng, setLng] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Function to fetch location using structured Nominatim API query
//   const handleSearch = async () => {
//     if (!street && !city && !state) {
//       alert("Please fill at least Street/Area and City.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get("https://nominatim.openstreetmap.org/search", {
//         params: {
//           street: street,
//           city: city,
//           state: state,
//           country: "India",
//           format: "json",
//           addressdetails: 1,
//           limit: 1,
//         },
//       });

//       if (response.data && response.data.length > 0) {
//         const { lat, lon, display_name } = response.data[0];
//         const coords = [parseFloat(lat), parseFloat(lon)];
//         setPosition(coords);
//         setLat(lat);
//         setLng(lon);
//         console.log("Found location:", display_name);
//       } else {
//         alert("No location found. Try a simpler or nearby address.");
//       }
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       alert("Error while finding location. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mb-4">Find Precise Location</h1>

//       {/* Input fields */}
//       <div className="flex flex-wrap gap-2 justify-center mb-4">
//         <input
//           type="text"
//           placeholder="Street / Area (e.g. 22 MIG, Mukherjee Nagar)"
//           value={street}
//           onChange={(e) => setStreet(e.target.value)}
//           className="p-2 rounded text-black w-72"
//         />
//         <input
//           type="text"
//           placeholder="City (e.g. Dewas)"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="p-2 rounded text-black w-48"
//         />
//         <input
//           type="text"
//           placeholder="State (e.g. Madhya Pradesh)"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           className="p-2 rounded text-black w-48"
//         />
//         <button
//           onClick={handleSearch}
//           disabled={loading}
//           className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//       </div>

//       {/* Map Display */}
//       {position ? (
//         <>
//           <p className="text-sm text-gray-300 mb-2">
//             📍 Lat: {lat} | Lng: {lng}
//           </p>

//           <MapContainer
//             center={position}
//             zoom={17}
//             style={{ height: "70vh", width: "80vw", borderRadius: "16px" }}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <Marker
//               position={position}
//               draggable={true}
//               eventHandlers={{
//                 dragend: (e) => {
//                   const { lat, lng } = e.target.getLatLng();
//                   setLat(lat.toFixed(6));
//                   setLng(lng.toFixed(6));
//                   setPosition([lat, lng]);
//                 },
//               }}
//             >
//               <Popup>
//                 {street}, {city}, {state}
//                 <br />
//                 Lat: {lat}
//                 <br />
//                 Lng: {lng}
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </>
//       ) : (
//         <p className="text-gray-400 mt-4">
//           Enter an address above and click <strong>Search</strong> to view it on the map.
//         </p>
//       )}
//     </div>
//   );
// }


//---------------------------------------------------------------------------------------------------------------------------





import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 👇 Replace this with your actual LocationIQ key
const LOCATIONIQ_KEY = "pk.c1cbcde243f12ebfed6bcc30eaa8e589";

export function Map() {
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!address.trim()) return alert("Please enter a valid address.");

    setLoading(true);
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search`,
        {
          params: {
            key: LOCATIONIQ_KEY,
            q: address,
            format: "json",
            countrycodes: "in", // restrict to India for better results
            limit: 1,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setLat(lat);
        setLng(lon);
        console.log("Found:", display_name);
      } else {
        alert("Address not found. Try again with a more specific input.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Error fetching location. Check your API key or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Find Exact Location (LocationIQ)</h1>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <input
          type="text"
          placeholder="Enter address (e.g. 22 MIG, Mukherjee Nagar, Dewas)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 rounded text-black w-80"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {position ? (
        <>
          <p className="text-sm text-gray-300 mb-2">
            📍 Lat: {lat} | Lng: {lng}
          </p>
          <MapContainer
            center={position}
            zoom={18}
            style={{ height: "70vh", width: "80vw", borderRadius: "16px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={position}
              draggable={true}
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  setLat(lat.toFixed(6));
                  setLng(lng.toFixed(6));
                  setPosition([lat, lng]);
                },
              }}
            >
              <Popup>
                {address} <br />
                Lat: {lat} <br />
                Lng: {lng}
              </Popup>
            </Marker>
          </MapContainer>
        </>
      ) : (
        <p className="text-gray-400 mt-4">
          Enter an address and click <strong>Search</strong> to locate it on the map.
        </p>
      )}
    </div>
  );
}

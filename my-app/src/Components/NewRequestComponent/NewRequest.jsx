import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import L from "leaflet";
import "./NewRequest.css";

// Marker on click
function LocationMarker({ setPosition }) {
  const [marker, setMarker] = useState(null);

  useMapEvents({
    click(e) {
      setMarker(e.latlng);
      setPosition(e.latlng);
    },
  });

  return marker === null ? null : (
    <Marker
      position={marker}
      icon={L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30],
      })}
    >
      <Popup>Selected Location</Popup>
    </Marker>
  );
}

function NewRequest() {
  const [position, setPosition] = useState(null);
  const navigate = useNavigate(); // ✅ hook for route navigation

  const handleConfirm = () => {
    if (position) {
      // Pass location data to Services page
      navigate("/services", { state: { position } });
    }
  };

  return (
    <div className="new-request">
      <div className="map-container">
        <h2>Select a Location</h2>
        <input
          type="text"
          placeholder="Search for Location or Address"
          className="search-box"
        />
        <MapContainer
          center={[22.7196, 75.8577]} // default Indore
          zoom={13}
          style={{ height: "400px", width: "100%", marginTop: "10px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationMarker setPosition={setPosition} />
        </MapContainer>
        <button
          className="confirm-btn"
          disabled={!position}
          onClick={handleConfirm}
        >
          Confirm Location
        </button>
      </div>

      <div className="side-panel">
        <h3>{position ? "Selected Location" : "Select a location to get started"}</h3>
        {position && (
          <p>
            Latitude: {position.lat.toFixed(4)}, Longitude:{" "}
            {position.lng.toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
}

export default NewRequest;

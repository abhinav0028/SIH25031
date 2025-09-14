import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import "./Homepage.css";

// Component to place a marker on map click
function LocationMarker({ position }) {
  return position === null ? null : (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30],
      })}
    >
      <Popup>You selected this location</Popup>
    </Marker>
  );
}

// Component to move map when location updates
function MapUpdater({ position }) {
  const map = useMap();
  if (position) {
    map.setView(position, 13);
  }
  return null;
}

function Homepage() {
  const [location, setLocation] = useState("Indore, Madhya Pradesh");
  const [position, setPosition] = useState([22.7196, 75.8577]); // default Indore

  const providers = [];
  const nearbyProviders = [
    { name: "Department of Public Works" },
    { name: "Customer Service Care Centre" },
    
  ];

  // Function to search location using Nominatim API
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        const data = await res.json();
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setPosition([lat, lon]);
          setLocation(query);
        } else {
          alert("Location not found. Try again.");
        }
      } catch (err) {
        console.error("Error fetching location:", err);
      }
    }
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">SpotNFix</h1>
        <div className="nav-links">
          
          <Link to="/about">Info for Orgs</Link>
          <span className="notification">Notification🔔 </span>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to Spotit</h1>
        <p>
          Report issues, connect with neighbors, and stay updated with your
          community.
        </p>
        <div className="hero-buttons">
          <Link to="/report">
            <button className="btn btn-primary">Report Issue</button>
          </Link>
          <Link to="/explore">
            <button className="btn btn-dark">Explore Map</button>
          </Link>
        </div>
      </motion.section>

      {/* Header */}
      <header className="header">
        <h2>{location}</h2>
        <button className="follow-btn">Follow this Place</button>
        <div className="tabs">
         
        </div>
      </header>

      {/* Content */}
      <main className="content">
        {/* Map + Search */}
        <section className="section">
          <h3>Set Location on Map</h3>
          <input
            type="text"
            placeholder="Search location..."
            className="search-box"
            onKeyDown={handleSearch}
          />
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "400px", width: "100%", marginTop: "15px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker position={position} />
            <MapUpdater position={position} />
          </MapContainer>
        </section>

        {/* Service Providers */}
        {/* Service Providers */}
<section className="section">
  
  {providers.length === 0 ? (
    <p className="empty-text">
     
    </p>
  ) : (
    <div className="providers-grid">
      {providers.map((p, idx) => (
        <div key={idx} className="provider-card">
          <img
            src={p.logo || "https://via.placeholder.com/150"}
            alt={p.name}
            className="provider-logo"
          />
          <h4>{p.name}</h4>
          <p>{p.description || "Local service provider"}</p>
          <button className="btn btn-outline">View Details</button>
        </div>
      ))}
    </div>
  )}
</section>

{/* Community Building */}
<section className="section community-section">
  <h3 className="section-title"> Community Building</h3>
  <div className="card-grid">
    <div className="card feature-card">
      <h4> Report to Neighbors</h4>
      <p>Start a conversation with neighbors or share important updates.</p>
      <div className="card-links">
        <Link to="/new-request" className="btn-link"> New Request➕</Link>
        <a href="#" className="btn-link-outline">🗺 Explore Map</a>
      </div>
    </div>
  </div>
</section>


{/* Nearby Providers */}
<section className="section">
  <h3>Nearby Service Providers</h3>
  <div className="providers-grid">
    {nearbyProviders.map((p, idx) => (
      <div key={idx} className="provider-card">
        <img
          src={p.logo || "https://via.placeholder.com/200"}
          alt={p.name}
          className="provider-logo"
        />
        <h4>{p.name}</h4>
        <button className="btn btn-primary">Contact</button>
      </div>
    ))}
  </div>
</section>

      </main>
    </div>
  );
}

export default Homepage;

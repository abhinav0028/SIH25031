import { useLocation, Link } from "react-router-dom";
import "./ServicePage.css";

function ServicesPage() {
  const { state } = useLocation();
  const location = state?.location;

  return (
    <div className="services-page">
      <div className="services-box">
        <h2>No Verified Services</h2>
        <p>
          Based on the location you've selected, there are no verified services
          available. However, there are still some options for you!
        </p>

        <div className="service-card">
          <h3> Post to Neighbors</h3>
          <p>
            Start a conversation with neighbors and any unverified officials
            monitoring this area.
          </p>
          <Link to="/report">New Request</Link>
        </div>

        <div className="service-card">
          <h3>❓ Learn More</h3>
          <p>
            We have lots of great information for new organizations to get
            started.
          </p>
          <a href="#">Product Info</a> | <a href="#">Contact Sales</a>
        </div>
      </div>

      <div className="preview-box">
        <h3>Post to Neighbors</h3>
        <p>
          {location
            ? `Selected Location: Lat ${location.lat.toFixed(
                4
              )}, Lng ${location.lng.toFixed(4)}`
            : "No location selected"}
        </p>
        <p className="tag">Community</p>
      </div>
    </div>
  );
}

export default ServicesPage;

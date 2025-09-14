// src/Components/LandingPage/LandingPage.jsx
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig"; // ✅ if using Firebase Auth
import potholeImg from "../../assets/pothole.jpg";
import streetlightImg from "../../assets/broken-streetlight.jpg";
import garbageImg from "../../assets/garbage.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleReportClick = () => {
    const user = auth.currentUser; // ✅ check Firebase Auth login state
    if (user) {
      navigate("/report"); // ✅ logged-in → go to report page
    } else {
      navigate("/login", { state: { redirectTo: "/report" } }); 
      // ✅ not logged-in → go to login, pass redirect target
    }
  };

  const problems = [
    {
      img: potholeImg,
      text: "Potholes go unrepaired for weeks",
    },
    {
      img: streetlightImg,
      text: "Broken streetlights leave areas unsafe",
    },
    {
      img: garbageImg,
      text: "Overflowing garbage bins spread disease",
    },
  ];

  return (
    <div className="landing-container">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Empowering Citizens, Transforming Cities</h1>
        <p>
         
        </p>
        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            aria-label="Report an Issue"
            onClick={handleReportClick}
          >
            Report an Issue
          </button>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="section problem">
        <h2>The Challenge We’re Solving</h2>
        <p>
          Local governments struggle with civic issues like potholes,
          malfunctioning streetlights, and overflowing garbage bins due to
          unstructured reporting and lack of transparency.
        </p>

        <div className="grid grid-3">
          {problems.map((item, i) => (
            <div key={i} className="card">
              <img
                src={item.img}
                alt={item.text}
                className="card-image"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "0.75rem",
                }}
              />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

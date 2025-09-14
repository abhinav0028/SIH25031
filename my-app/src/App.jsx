import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/HeaderComponent/Header.jsx";
import Hero from "./Components/HeroComponent/Hero.jsx";
import LearnMore from "./Components/LearnMoreComponent/LearnMore.jsx";
import Footer from "./Components/FooterComponent/Footer.jsx";
import Login from "./Components/LoginComponent/Login.jsx";
import Register from "./Components/RegisterComponent/Register.jsx"; 
import Report from "./Components/ReportComponent/Report.jsx";
import Homepage from "./Components/HomepageComponent/Homepage.jsx";
import NewRequest from "./Components/NewRequestComponent/NewRequest.jsx";
import ServicesPage from "./Components/ServicePageComponent/ServicePage.jsx";


import "./App.css";

function App() {
  return (
    <Router>
      

      <Routes>
        {/* Home Page */}
        <Route path="/"element={
            <>
            <Header />
              <Hero />
              <LearnMore />
            </>
          }
        />

        
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
        <Route path="/report" element={<Report />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/new-request" element={<NewRequest />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

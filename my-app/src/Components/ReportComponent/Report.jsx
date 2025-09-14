import React, { useState } from "react";
import axios from "axios";
import "./Report.css";

const ReportIssue = () => {
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [duplicate, setDuplicate] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Ask for location dynamically when submitting
  const requestLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(loc);
          resolve(loc);
        },
        (error) => reject(error)
      );
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // ✅ Get location right before submitting
      const currentLocation = location || (await requestLocation());

      if (!currentLocation || !photo) {
        setMessage("Please allow location access and upload a photo.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("latitude", currentLocation.latitude);
      formData.append("longitude", currentLocation.longitude);
      formData.append("description", description);
      formData.append("photo", photo);

      const res = await axios.post("/api/report", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.isDuplicate) {
        setDuplicate(res.data.existingReport);
        setMessage("This issue has already been reported. You can support it.");
      } else {
        setMessage("Your issue has been reported successfully!");
        setPhoto(null);
        setPhotoPreview(null);
        setDescription("");
        setLocation(currentLocation); // ✅ Save successful location
      }
    } catch (error) {
      console.error(error);
      if (error.code === 1) {
        setMessage("Location access denied. Please enable it to report.");
      } else {
        setMessage("An error occurred while reporting the issue.");
      }
    }

    setLoading(false);
  };

  const handleSupport = async () => {
    if (!duplicate) return;
    setLoading(true);
    try {
      await axios.post(`/api/report/${duplicate.id}/support`);
      setMessage("Thank you for supporting this issue!");
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while supporting the issue.");
    }
    setLoading(false);
  };

  return (
    <div className="report-container">
      <h2>Report an Issue</h2>

      <form className="report-form" onSubmit={handleSubmit}>
        {/* Upload Section */}
        <div className="photo-upload">
          <label>Upload Photo:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          {photoPreview && (
            <div className="photo-preview">
              <img src={photoPreview} alt="Preview" />
              <p>{photo?.name}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label>Description (optional):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Report Issue"}
        </button>
      </form>

      {/* Status Message */}
      {message && <div className="message">{message}</div>}

      {/* Duplicate Issue Section */}
      {duplicate && (
        <div className="duplicate-report">
          <h4>Existing Report Found!</h4>
          <p>
            <strong>Description:</strong> {duplicate.description}
          </p>
          <p>
            <strong>Reported by:</strong> {duplicate.reportedBy || "Multiple users"}
          </p>
          <button onClick={handleSupport} disabled={loading}>
            {loading ? "Processing..." : "Support this Issue"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportIssue;

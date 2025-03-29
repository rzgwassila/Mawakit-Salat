import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [location, setLocation] = useState({
    city: "Algiers",
    country: "Algeria",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrayerTimes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/prayer-times",
        {
          params: location,
        }
      );
      setPrayerTimes(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch prayer times");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/prayer-times", {
          params: location,
        });
        setPrayerTimes(response.data.data);
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch prayer times");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [location]); // Only include actual dependencies

  const handleInputChange = (e) => {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPrayerTimes();
  };

  return (
    <div className="app">
      <h1>Mawakit Salat</h1>

      <form onSubmit={handleSubmit} className="location-form">
        <input
          type="text"
          name="city"
          value={location.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <input
          type="text"
          name="country"
          value={location.country}
          onChange={handleInputChange}
          placeholder="Country"
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Get Prayer Times"}
        </button>
      </form>

      {prayerTimes && (
        <div className="prayer-times">
          <div className="Prayer-times-title">
            <h2>Prayer Times for {prayerTimes.date.gregorian.date}</h2>
          </div>
          <div className="times-grid">
            <div className="time-card">
              <h3>Fajr</h3>
              <p>{prayerTimes.timings.Fajr}</p>
            </div>
            <div className="time-card">
              <h3>Sunrise</h3>
              <p>{prayerTimes.timings.Sunrise}</p>
            </div>
            <div className="time-card">
              <h3>Dhuhr</h3>
              <p>{prayerTimes.timings.Dhuhr}</p>
            </div>
            <div className="time-card">
              <h3>Asr</h3>
              <p>{prayerTimes.timings.Asr}</p>
            </div>
            <div className="time-card">
              <h3>Maghrib</h3>
              <p>{prayerTimes.timings.Maghrib}</p>
            </div>
            <div className="time-card">
              <h3>Isha</h3>
              <p>{prayerTimes.timings.Isha}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFlightDetails } from "../api/flightAPI";
import { FlightDetail } from "../type";
import Navbar from "../components/Navbar";
import plane from "../assets/plane.png";

const FlightDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [flightData, setFlight] = useState<FlightDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [backgroundImage, setBackgroundImage] = useState("");
  const oceanBackgrounds = [
    "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3433&q=80",
    "https://images.unsplash.com/photo-1439405326854-014607f694d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
  ];

  useEffect(() => {
    const loadFlight = async () => {
      try {
        const data = await fetchFlightDetails(id!);
        setFlight(data);
      } catch (err) {
        setError("Error fetching flight details");
      }
    };

    loadFlight();
  }, [id]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const randomIndex = Math.floor(Math.random() * oceanBackgrounds.length);
    setBackgroundImage(oceanBackgrounds[randomIndex]);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={` ${darkMode ? "bg-dark text-light" : ""}`}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <div
        className="d-flex align-items-center justify-content-center vh-100 flight-details-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`card shadow-lg p-4 bg-opacity-90 custom-card ${
            darkMode ? "bg-dark text-light" : "bg-light text-dark"
          }`}
        >
          <div
            className={`${darkMode ? " text-dark " : " text-dark"} text-center`}
          >
            <h3 className="mb-3 display-4">Flight Details</h3>
            <div className="d-flex justify-content-center align-items-center mb-4">
              <p className="h3">
                {currentTime.toLocaleTimeString("en-US", { hour12: true })}
              </p>
            </div>
          </div>
          <img
            src={plane}
            style={{
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto 20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
            alt=""
          />
          <div className="row g-3">
            <div className="col-md-6">
              <label
                className={`form-label ${
                  darkMode ? " text-dark" : "text-dark"
                }`}
              >
                Airline
              </label>
              <div
                className={`form-control ${
                  darkMode ? "bg-secondary text-light" : "bg-light"
                }`}
              >
                {flightData?.airline}
              </div>
            </div>
            <div className="col-md-6">
              <label
                className={`form-label ${
                  darkMode ? " text-dark" : "text-dark"
                }`}
              >
                {" "}
                Flight Number
              </label>
              <div
                className={`form-control ${
                  darkMode ? "bg-secondary text-light" : "bg-light"
                }`}
              >
                {flightData?.flightNumber}
              </div>
            </div>
            <div className="col-md-6">
              <label
                className={`form-label ${
                  darkMode ? " text-dark" : "text-dark"
                }`}
              >
                Status
              </label>
              <div
                className={`form-control ${
                  flightData?.status === "On Time"
                    ? "badge-ontime"
                    : flightData?.status === "Delayed"
                    ? "badge-delayed"
                    : flightData?.status === "Departed"
                    ? "badge-departed"
                    : flightData?.status === "Boarding"
                    ? "badge-boarding"
                    : "badge-default"
                }`}
              >
                {flightData?.status}
              </div>
            </div>

            <div className="col-md-6">
              <label
                className={`form-label ${
                  darkMode ? " text-dark" : "text-dark"
                }`}
              >
                Departure Time
              </label>
              <div
                className={`form-control ${
                  darkMode ? "bg-secondary text-light" : "bg-light"
                }`}
              >
                {flightData?.departureTime
                  ? new Date(flightData.departureTime).toLocaleTimeString()
                  : "N/A"}
              </div>
            </div>
            <div className="col-md-6">
              <label
                className={`form-label ${
                  darkMode ? " text-dark" : "text-dark"
                }`}
              >
                Destination
              </label>
              <div
                className={`form-control ${
                  darkMode ? "bg-secondary text-light" : "bg-light"
                }`}
              >
                {flightData?.destination}
              </div>
            </div>
            <div className="col-md-6">
              <label
                className={`form-label ${
                  darkMode ? " text-dark" : "text-dark"
                }`}
              >
                Origin
              </label>
              <div
                className={`form-control ${
                  darkMode ? "bg-secondary text-light" : "bg-light"
                }`}
              >
                {flightData?.origin}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailPage;

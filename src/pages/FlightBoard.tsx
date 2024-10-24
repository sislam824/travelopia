import { useEffect, useState } from "react";
import { fetchFlights } from "../api/flightAPI";
import FlightTable from "../components/FlightList";
import { Flight } from "../type";
import Navbar from "../components/Navbar";
import FlightCard from "../components/flightCatd";

const FlightBoard = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadFlights = async () => {
      try {
        const data = await fetchFlights();
        setFlights(data);
        setFilteredFlights(data);
      } catch (err) {
        setError("Error fetching flight data");
      }
    };

    loadFlights();
    const interval = setInterval(loadFlights, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (flightNumber: string) => {
    if (!flightNumber) {
      setFilteredFlights(flights);
    } else {
      const filtered = flights.filter((flight) =>
        flight.flightNumber.toLowerCase().includes(flightNumber.toLowerCase())
      );
      setFilteredFlights(filtered);
    }
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (error) {
    return (
      <div
        className={`container mt-5 ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`  ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}
    >
      <Navbar
        onSearch={handleSearch}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="text-center mb-4 text-light pt-4">
          <h1
            className={`overlay-text ${darkMode ? "text-light" : "text-dark"}`}
          >
            Flight Schedule
          </h1>
        </div>
        <div className="d-flex ">
          <div className="row justify-content-center col-lg-10 col-md-12 m-md-auto m-sm-auto m-lg-auto ">
            {filteredFlights.length === 0 ? (
              <div className="text-center alert alert-warning">
                No flights found matching your Flight Number .
              </div>
            ) : (
              <FlightTable flights={filteredFlights} darkMode={darkMode} />
            )}
          </div>

          <div className=" carousel d-flex flex-column gap-4 col-lg-2 ">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                {flights.map((flight, index) => (
                  <div
                    key={flight.flightNumber}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <FlightCard flights={flight} />
                  </div>
                ))}
              </div>
            </div>
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                {flights.slice(5).map((flight, index) => (
                  <div
                    key={flight.flightNumber}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <FlightCard flights={flight} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBoard;

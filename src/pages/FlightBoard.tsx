import { useEffect, useState } from "react";
import { fetchFlights } from "../api/flightAPI";
import FlightTable from "../components/FlightList";
import { Flight } from "../type";
import Navbar from "../components/Navbar";

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
    const interval = setInterval(loadFlights, 30000);
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
      style={{ minHeight: "100vh" }}
    >
      <Navbar
        onSearch={handleSearch}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      <div className="row justify-content-center">
        {filteredFlights.length === 0 ? (
          <div className="text-center alert alert-warning">
            No flights found matching your Flight Number .
          </div>
        ) : (
          <FlightTable flights={filteredFlights} darkMode={darkMode} />
        )}
      </div>
    </div>
  );
};

export default FlightBoard;

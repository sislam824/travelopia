import React from "react";
import { Flight } from "../type";
import { Link } from "react-router-dom";

interface FlightRowProps {
  flight: Flight;
}

const FlightRow: React.FC<FlightRowProps> = ({ flight }) => {
  return (
    <tr className="text-center">
      <td>{flight.flightNumber}</td>
      <td>{flight.airline}</td>
      <td>{flight.origin}</td>
      <td>{flight.destination}</td>
      <td>{new Date(flight.departureTime).toLocaleTimeString()}</td>
      <td>
        <span
          className={`badge ${
            flight?.status === "On Time"
              ? "badge-ontime"
              : flight?.status === "Delayed"
              ? "badge-delayed"
              : flight?.status === "Departed"
              ? "badge-departed"
              : flight?.status === "Boarding"
              ? "badge-boarding"
              : "badge-default"
          }`}
        >
          {flight.status}
        </span>
      </td>

      <td className="d-flex justify-content-center">
        <Link to={`/flight/${flight.id}`} className="btn btn-link">
          View Details <span className="bi bi-arrow-right"></span>
        </Link>
      </td>
    </tr>
  );
};

export default FlightRow;

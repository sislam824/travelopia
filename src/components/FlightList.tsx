import React from "react";
import { Flight } from "../type";
import FlightRow from "./FlightRow";
import "bootstrap/dist/css/bootstrap.min.css";

interface FlightTableProps {
  flights: Flight[];
  darkMode: boolean;
}

const FlightTable: React.FC<FlightTableProps> = ({ flights, darkMode }) => {
  return (
    <div
      className={`flight-list-container py-5  ${
        darkMode ? "text-light" : "text-dark"
      }`}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="bg-dark-overlay"></div>
      <div className="container position-relative z-index-1">
        <div className="text-center mb-4 text-light">
          <h1>Flight Schedule</h1>
        </div>
        <div
          className={`card shadow-sm ${
            darkMode ? "bg-dark text-light" : "bg-white text-dark"
          }`}
        >
          <div className="table-responsive">
            <table
              className={`table table-bordered table-hover ${
                darkMode ? "table-dark" : "table-light"
              }`}
            >
              <thead className={`${darkMode ? "thead-dark" : "thead-light"}`}>
                <tr>
                  <th scope="col" className="text-center">
                    <i className="bi bi-airplane"></i> Flight No
                  </th>
                  <th scope="col" className="text-center">
                    <i className="bi bi-building"></i> Airline
                  </th>
                  <th scope="col" className="text-center">
                    <i className="bi bi-geo-alt"></i> Origin
                  </th>
                  <th scope="col" className="text-center">
                    <i className="bi bi-geo"></i> Destination
                  </th>
                  <th scope="col" className="text-center">
                    <i className="bi bi-clock"></i> Departure Time
                  </th>
                  <th scope="col" className="text-center">
                    <i className="bi bi-exclamation-circle"></i> Status
                  </th>
                  <th scope="col" className="text-center">
                    <i className="bi bi-pencil-square"></i> Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <FlightRow key={flight.id} flight={flight} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTable;

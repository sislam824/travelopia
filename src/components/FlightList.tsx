import React from "react";
import { Flight } from "../type";
import FlightRow from "./FlightRow";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

interface FlightTableProps {
  flights: Flight[];
  darkMode: boolean;
}

const FlightTable: React.FC<FlightTableProps> = ({ flights, darkMode }) => {
  return (
    <div
      className={`flight-list-container  ${
        darkMode ? "text-light" : "text-dark"
      }`}
    >
      <div className="bg-dark-overlay"></div>
      <div className="container position-relative z-index-1">
        <div
          className={`card shadow-sm ${
            darkMode ? "bg-dark text-light" : "bg-white text-dark"
          }`}
        >
          <div className="table-responsive desktop-view">
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
            </table>{" "}
          </div>
        </div>
        <div className="table-responsive mobile-view">
          <div
            className={`d-flex flex-wrap justify-content-center gap-3 ${
              darkMode ? "text-light" : "text-dark"
            }`}
          >
            {flights.map((flight) => (
              <div
                key={flight.id}
                className={`card shadow-sm border-0 flex-grow-1 ${
                  darkMode ? "bg-dark text-light" : "bg-white text-dark"
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title text-center">
                    <i className="bi bi-airplane"></i> {flight.flightNumber}
                  </h5>
                  <p className="card-text text-center">
                    <strong>Airline:</strong> <i className="bi bi-building"></i>{" "}
                    {flight.airline}
                  </p>
                  <p className="card-text text-center">
                    <strong>Origin:</strong> <i className="bi bi-geo-alt"></i>{" "}
                    {flight.origin}
                  </p>
                  <p className="card-text text-center">
                    {" "}
                    <strong>
                      Destination:
                    </strong> <i className="bi bi-geo"></i> {flight.destination}
                  </p>
                  <p className="card-text text-center">
                    <strong>Departure Time:</strong>{" "}
                    <i className="bi bi-clock"></i>{" "}
                    {new Date(flight.departureTime).toLocaleTimeString()}
                  </p>
                  <p
                    className={`card-text w-50 m-auto text-center ${
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
                    <strong>Status:</strong>{" "}
                    <i className="bi bi-exclamation-circle"></i> {flight.status}
                  </p>
                  <div className="text-center">
                    <Link
                      to={`/flight/${flight.id}`}
                      className="btn btn-link"
                      style={{ margin: "auto", width: "max-content" }}
                    >
                      View Details <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTable;

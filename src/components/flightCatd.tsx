const FlightCard = ({ flights }: any) => {
  const departureDate = new Date(flights.departureTime);

  const arrivalTime = departureDate.setHours(departureDate.getHours() + 2);

  return (
    <div
      className="card p-3"
      style={{ borderRadius: "10px", backgroundColor: "#e6f0ff" }}
    >
      <div className="d-flex justify-content-between">
        <div>
          <h4>
            <i className="bi bi-airplane-engines me-2"></i>
            {flights.flightNumber}
          </h4>
          <h6 className="text-muted">
            {new Date(flights.departureTime).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h6>
        </div>
        <div>
          <span className="badge bg-primary me-2">{flights.airline}</span>
          <br />
          <span
            className={`badge ${
              flights?.status === "On Time"
                ? "badge-ontime"
                : flights?.status === "Delayed"
                ? "badge-delayed"
                : flights?.status === "Departed"
                ? "badge-departed"
                : flights?.status === "Boarding"
                ? "badge-boarding"
                : "badge-default"
            }`}
          >
            {flights.status}
          </span>
        </div>
      </div>

      <div
        className="card mt-3 p-3"
        style={{ borderRadius: "10px", backgroundColor: "#d0e6ff" }}
      >
        <div className="row text-center flex-column">
          <div className="col mb-3">
            <h6>
              <i className="bi bi-arrow-up-right me-1"></i> Departure
            </h6>
            <p>{new Date(flights.departureTime).toLocaleTimeString()}</p>
          </div>

          <div className="col mb-3 d-flex align-items-center justify-content-center">
            <div>
              <i className="bi bi-arrow-down" style={{ fontSize: "2rem" }}></i>
              <p className="mx-2">{flights.duration}</p>
            </div>
          </div>

          <div className="col">
            <h6>
              <i className="bi bi-arrow-down-right me-1"></i> Arrival
            </h6>
            <p>{new Date(arrivalTime).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;

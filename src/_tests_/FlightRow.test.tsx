import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Flight } from "../type";
import FlightRow from "../components/FlightRow";
const mockFlight: Flight = {
  id: "1",
  flightNumber: "AA123",
  airline: "American Airlines",
  origin: "JFK",
  destination: "LAX",
  departureTime: "4:21:17 AM",
  status: "On Time",
};

describe("FlightRow", () => {
  it("renders flight details correctly", () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <FlightRow flight={mockFlight} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    expect(screen.getByText(/AA123/i)).toBeInTheDocument();
    expect(screen.getByText(/American Airlines/i)).toBeInTheDocument();
    expect(screen.getByText(/JFK/i)).toBeInTheDocument();
    expect(screen.getByText(/LAX/i)).toBeInTheDocument();

    expect(screen.getByText(/On Time/i)).toBeInTheDocument();
  });

  it("contains a link to flight details", () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <FlightRow flight={mockFlight} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /view details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/flight/1");
  });
  it("renders flight with Boarding status", () => {
    const boardingFlight: Flight = {
      ...mockFlight,
      status: "Boarding",
    };

    render(
      <MemoryRouter>
        <table>
          <tbody>
            <FlightRow flight={boardingFlight} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    expect(screen.getByText(/Boarding/i)).toBeInTheDocument();
    expect(screen.getByText(/Boarding/i)).toHaveClass("badge-boarding");
  });
  it("renders flight with Departed status", () => {
    const departedFlight: Flight = {
      ...mockFlight,
      status: "Departed",
    };

    render(
      <MemoryRouter>
        <table>
          <tbody>
            <FlightRow flight={departedFlight} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    expect(screen.getByText(/Departed/i)).toBeInTheDocument();
    expect(screen.getByText(/Departed/i)).toHaveClass("badge-departed");
  });
  it("renders flight with Delayed status", () => {
    const delayedFlight: Flight = {
      ...mockFlight,
      status: "Delayed",
    };

    render(
      <MemoryRouter>
        <table>
          <tbody>
            <FlightRow flight={delayedFlight} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    expect(screen.getByText(/Delayed/i)).toBeInTheDocument();
    expect(screen.getByText(/Delayed/i)).toHaveClass("badge-delayed");
  });
});

import axios from "axios";
import { fetchFlights, fetchFlightDetails } from "../api/flightAPI";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Flight API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchFlights", () => {
    it("should fetch flight data successfully", async () => {
      const mockFlights = [
        { id: "1", flightNumber: "AA123", airline: "American Airlines" },
        { id: "2", flightNumber: "BA456", airline: "British Airways" },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockFlights });

      const flights = await fetchFlights();
      expect(axios.get).toHaveBeenCalledWith(
        "https://flight-status-mock.core.travelopia.cloud/flights"
      );
      expect(flights).toEqual(mockFlights);
    });

    it("should throw an error if fetching flight data fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchFlights()).rejects.toThrow(
        "Failed to fetch flight data"
      );
      expect(axios.get).toHaveBeenCalledWith(
        "https://flight-status-mock.core.travelopia.cloud/flights"
      );
    });
  });

  describe("fetchFlightDetails", () => {
    it("should fetch flight details successfully", async () => {
      const mockFlightDetail = {
        id: "1",
        flightNumber: "AA123",
        airline: "American Airlines",
        status: "On Time",
        origin: "JFK",
        destination: "LAX",
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockFlightDetail });

      const flightDetail = await fetchFlightDetails("1");
      expect(axios.get).toHaveBeenCalledWith(
        "https://flight-status-mock.core.travelopia.cloud/flights/1"
      );
      expect(flightDetail).toEqual(mockFlightDetail);
    });

    it("should throw an error if fetching flight details fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchFlightDetails("1")).rejects.toThrow(
        "Failed to fetch flight details"
      );
      expect(axios.get).toHaveBeenCalledWith(
        "https://flight-status-mock.core.travelopia.cloud/flights/1"
      );
    });
  });
});

import axios from "axios";

const BASE_URL = "https://flight-status-mock.core.travelopia.cloud";

export const fetchFlights = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/flights`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch flight data");
  }
};

export const fetchFlightDetails = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/flights/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch flight details");
  }
};

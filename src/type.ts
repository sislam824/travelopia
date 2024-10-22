export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

export interface FlightDetail extends Flight {
  arrivalTime: string;

  delayInfo?: string;
}

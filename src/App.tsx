import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightBoard from "./pages/FlightBoard";
import FlightDetailPage from "./pages/FlightDetailPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightBoard />} />
        {/* <Route path="/" element={<FlightList />} /> */}
        <Route path="/flight/:id" element={<FlightDetailPage />} />
        {/* <Route path="/flightdet" element={<FlightDetails />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

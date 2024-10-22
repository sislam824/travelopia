import React, { useState } from "react";

import logo from "../assets/logo.webp";
import "./Navbar.css";

const Navbar: React.FC<{
  onSearch?: (searchTerm: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}> = ({ onSearch, darkMode, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow-sm fixed-top`}
    >
      <div className="container-fluid justify-content-between">
        <div>
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" width="30" height="30" />
          </a>
          <span>Travelopia</span>
        </div>
        <div className="d-flex ">
          <form className="d-flex " onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by Flight Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        <button
          className="btn btn-outline-secondary ms-2"
          onClick={toggleTheme}
        >
          {darkMode ? (
            <span className="bi bi-sun"></span>
          ) : (
            <span className="bi bi-moon-fill"></span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

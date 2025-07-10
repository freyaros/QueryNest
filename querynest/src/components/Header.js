// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav style={{ padding: '10px', background: '#222', color: 'white' }} className="navbar">
      <div className="nav-links">
      <Link to="/" style={{ margin: '0 10px', color: 'white' }}>Home</Link>
      <Link to="/ask" style={{ margin: '0 10px', color: 'white' }}>Ask</Link>
      <Link to="/login" style={{ margin: '0 10px', color: 'white' }}>Login</Link>
      </div>
    </nav>
  );
}

export default Header;

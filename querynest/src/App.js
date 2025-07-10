import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Ask from "./components/Ask";
import Login from "./components/Login";
import Answer from "./components/Answer";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/answer/:id" element={<Answer />} />
      </Routes>
    </Router>
  );
}

export default App;

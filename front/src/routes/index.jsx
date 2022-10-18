import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Register from "../pages/register/Register";
import Profil from "../pages/profil/profil";
import Header from "../components/header/Header";

const index = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {" "}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/logout" element={<Navigate to="/" />} />
        {" "}
      </Routes>
    </Router>
  );
};

export default index;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Login/Register';
import Header from '../components/header/Header';

const index = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {" "}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />{" "}
      </Routes>
    </Router>
  );
};

export default index;
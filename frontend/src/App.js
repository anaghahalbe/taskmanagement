import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>
                <Route path="/" element={<LoginComponent />} />
                <Route path="/signup" element={<RegisterComponent />} />
                <Route path="/dashboard" element={<DashboardComponent />} />
               
                </Routes>
            </div>
        </Router>
    );
};


export default App;
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';


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
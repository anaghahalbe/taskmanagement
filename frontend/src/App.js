import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';

const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>

                    <Route path="/signup" element={<RegisterComponent />} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;
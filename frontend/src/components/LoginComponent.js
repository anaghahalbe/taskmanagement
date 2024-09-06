import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService'; // Adjust the path as needed


const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login({ username, password }); // Assuming AuthService.login exists

      if (response.data.accessToken) { // Adjust based on your backend response
        localStorage.setItem('user', JSON.stringify(`${response.data.tokenType} ${response.data.accessToken}`)); 
       // Store user data in local storage
        navigate('/dashboard'); // Redirect to a protected route
      } else {
        setMessage(response.data.message || 'Login failed'); // Display error message
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <div>
        <div>
          <div>
            <div className="card-body">
              {message && <div className="alert alert-danger">{message}</div>}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <Link to="/signup" className="btn btn-link">
                  Register
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

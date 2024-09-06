import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import AuthService from '../services/AuthService'; // Adjust the path as needed
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
const navigate = useNavigate();
const [redirectToLogin, setRedirectToLogin] = useState(false);



  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.register({
        username,
        email,
        password,
        firstName,
        lastName,
      });

      setMessage(response.data.message); // Assuming your backend sends a message

      if (response.data.message === "User registered successfully!") {
        setRedirectToLogin(true); 

        console.log("-----inside redirect flag setup-----")
      }
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage);
    }
  };

  React.useEffect(() => {
    if (redirectToLogin) {
      navigate('/'); 
      console.log("-----inside Use Effect-----")
    }
  }, [redirectToLogin, navigate]); 


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card-container">
            <div className="card-header">Register</div>
            <div className="card-body">
              {message && (
                <div
                  className={
                    message.includes('successfully') // Check for success message
                      ? 'alert alert-success'
                      : 'alert alert-danger'
                  }
                  role="alert"
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleRegister}>
                {/* Username input */}
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

                {/* Email input */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password input */}
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

                {/* First Name input */}
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                {/* Last Name input */}
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                <Link to="/" className="btn btn-link">Login</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;


import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/auth";

class AuthService {
    register(signuprequest) {
        return axios.post(`${API_BASE_URL}/signup`, signuprequest);
    }
    login(user) {
        return axios.post(`${API_BASE_URL}/signin`, user);
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user')); 
      }
      logout() {
        localStorage.removeItem('user');
        window.location.href = '/'; // Redirect to the login page
      }

}

export default new AuthService();
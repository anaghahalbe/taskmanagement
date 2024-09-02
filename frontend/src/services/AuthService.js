import axios from 'axios';

const API_BASE_URL = "http://localhost:4200/auth";

class AuthService {
    register(user) {
        return axios.post(`${API_BASE_URL}/signup`, user);
    }


}

export default new AuthService();
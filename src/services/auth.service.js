import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/impoundsrv-0.0.1-SNAPSHOT/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            // .then(response => {
            //     if (response.data.token) {
            //         localStorage.setItem("user", JSON.stringify(response.data));
            //     }

        //     return response.data;
        // });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, role) {
        return axios({
            method: 'post',
            url: API_URL + "signup",
            headers: authHeader(),
            data: {
                username,
                email,
                password,
                role: [role]
            }
        });
    }
}

export default new AuthService();
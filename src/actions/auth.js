import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_MESSAGE,
    LOGOUT
} from "./types"
import AuthService from '../services/auth.service';

export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: REGISTER_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const login = (username, password) => (dispatch) => {
    AuthService.login(username, password)
        .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: response.data !== undefined && response.data
                }
            });
            // return Promise.resolve();
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            const statusCode = error.response !== undefined ? error.response.status : 0;

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message,
                    statusCode
                }
            });

            // return Promise.reject();
        });
}

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT
    });
};
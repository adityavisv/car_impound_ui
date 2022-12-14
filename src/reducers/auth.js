import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? {
    isLoggedIn: true,
    user,
    loginFail: false
} : {
    isLoggedIn: false,
    user: null,
    loginFail: false
};

export default function(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loginFail: false,
                user: payload.user
            };
        case LOGIN_FAIL:
            {
                return {
                    ...state,
                    isLoggedIn: false,
                    user: null,
                    loginFail: true
                }
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                loginFail: false
            }
        default:
            return state;
    }
}
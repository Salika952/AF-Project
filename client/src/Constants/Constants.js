export const REGISTER_SUCCESS = "REGISTER SUCCESS";
export const AUTH_USER = 'auth_user';
export const LOAD_USER = "LOAD USER";
export const LOGIN_FAIL = "LOGIN FAIL";
export const LOG_OUT = "LOG OUT";
export const AUTH_ERROR = "AUTHENTICATION ERROR";
export const LOAD_SM = "LOAD SM";
export const LOGIN_SUCCESS = "LOGIN SUCCESS";
export const ADD_TO_CART_USER = 'add_to_cart_user';
export const REGISTER_FAIL = "REGISTER FAIL";

export const SERVER_ADDRESS = getServerPath();

export const CLIENT_ADDRESS = getClientPath();

function getClientPath() {

    if (process.env.NODE_ENV === 'production') {
        return document.location.origin;
    } else {
        return 'http://localhost:1234';
    }
}

function getServerPath() {
    if (process.env.NODE_ENV === 'production') {
        return document.location.origin;
    } else {
        return 'http://localhost:4002';
    }
}

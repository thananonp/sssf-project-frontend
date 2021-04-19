import {clearToken} from "../helpers/utils";

const jwt = require('jsonwebtoken')

export const loginWithoutCredential = () => {
    return async dispatch => {
        dispatch({
            type: "LOGIN"
        })
    }
}
export const logInWithCredential = (token) => {
    return async dispatch => {
        dispatch({
            type: "LOGIN",
            token: token
        })
    }
}
export const logoutWithoutCredential = (history) => {
    clearToken()
    history.push('/')
    return async dispatch => {
        dispatch({
            type: "LOGOUT"
        })
    }
}

const loginReducer = (state = {login: false, token: undefined, user: undefined}, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return {login: true, token: action.token, user:jwt.decode(action.token)}
        }
        case 'LOGOUT': {
            clearToken()
            return {login: false, token: undefined}
        }
    }
    return state
}

export default loginReducer
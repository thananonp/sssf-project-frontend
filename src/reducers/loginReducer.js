export const loginWithoutCredential = () => {
    return async dispatch => {
        dispatch({
            type: "LOGIN"
        })
    }
}
export const logoutWithoutCredential = () => {
    return async dispatch => {
        dispatch({
            type: "LOGOUT"
        })
    }
}

const loginReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return true
        }
        case 'LOGOUT': {
            return false
        }
    }
    return state
}

export default loginReducer
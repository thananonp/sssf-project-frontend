export const setUpToken = (token) => {
    console.log("setUpToken")
    localStorage.setItem('jwtToken', token)
}

export const clearToken = () => {
    console.log("clearToken")
    localStorage.clear()
}

export const getToken = () => {
    console.log("getToken")
    return localStorage.getItem('jwtToken')
}
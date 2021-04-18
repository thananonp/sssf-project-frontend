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

//

export const notificationAlert = (event) => {
    event.setValue(true)
    setTimeout(() => {
        event.setValue(false)
    }, 3000)
}
//
// export const changeNotificationText = (event, text) => {
//     event.setValue(text)
//     setTimeout(()=>{
//         event.setValue('')
//     },3000)
// }


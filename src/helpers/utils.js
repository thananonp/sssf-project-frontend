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

export const staffChecker = (props, history) => {
    if (props.login.login) {
        if (props.login.user.type === 'staff') {
            history.push('/staff/home')
        }
    }
}
export const userChecker = (props, history) => {
    if (props.login.login) {
        if (props.login.user.type === 'user') {
            history.push('/user/home')
        }
    }
}

export const requireStaff = (props, history) => {
    if (props.login.login) {
        if (props.login.user.type === 'staff') {
        }
        else {
            alert("You don't have the permission to be here!")
            history.push('/')
        }

    } else {
        alert("You don't have the permission to be here!")
        history.push('/')
    }
}

export const requ = (props, history) => {
    if (props.login.login) {
        if (props.login.user.type === 'user') {
            history.push('/user/home')
        }
    }
}


export const restLogin = (url, option, history, props, push) => {
    fetch(process.env.REACT_APP_BACKEND_REST_URL + url, option)
        .then(response => {
            console.log("response", response)
            if (!response.ok) {
                if (response.status === 404) {
                    alert('Email not found, please retry')
                    return false
                }
                if (response.status === 401) {
                    alert('Email and password do not match, please retry')
                    return false
                }
                if (response.status === 400) {
                    alert('Email and password do not match, please retry')
                    return false
                }
            }
            return response
        })
        .then(response => {
                if (response !== false) {
                    return response.json()
                }
            }
        )
        .then(data => {
            console.log(data)
            if (data !== undefined) {
                props.logInWithCredential(data.token)
                // document.cookie = `token= ${data.token}`;
                setUpToken(data.token)
                history.push(push)
            }
        })
        .catch(e => {
            console.error(e)
            alert(e)
        })
}
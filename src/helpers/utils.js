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

export const notificationAlert = (event) => {
    event.setValue(true)
    setTimeout(() => {
        event.setValue(false)
    }, 3000)
}

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
        } else {
            alert("Please log in first!")
            history.push('/')
        }

    } else {
        alert("Please log in first!")
        history.push('/')
    }
}

export const requireUser = (props, history) => {
    if (props.login.login) {
        if (props.login.user.type === 'user') {
        } else {
            alert("Please log in first!")
            history.push('/')
        }

    } else {
        alert("Please log in first!")
        history.push('/')
    }
}

export const login = (history, props, data) => {
    if (data.userLogin) {
        const token = data.userLogin
        props.logInWithCredential(token)
        setUpToken(token)
        history.push('/user/home')

    }else if(data.staffLogin){
        const token = data.staffLogin
        props.logInWithCredential(token)
        setUpToken(token)
        history.push('/staff/home')
    }
}

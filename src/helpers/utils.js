export const setUpToken = (token) => {
    // console.log("setUpToken")
    localStorage.setItem('jwtToken', token)
}

export const clearToken = () => {
    // console.log("clearToken")
    localStorage.clear()
}

export const getToken = () => {
    // console.log("getToken")
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
            window.alert("You are already logged in with staff")
            history.push('/staff/home')
        }
    }
}
export const userChecker = (props, history) => {
    if (props.login.login) {
        if (props.login.user.type === 'user') {
            window.alert("You are already logged in with user")
            history.push('/user/home')
        }
    }
}

export const requireStaff = (props, history) => {
    if (props.login.login) {
        if (props.login.user.type === 'staff') {
        } else {
            window.alert("Please log in first!")
            history.push('/')
        }

    } else {
        window.alert("Please log in first!")
        history.push('/')
    }
}

export const requireUser = (props, history) => {
    if (props.login.login) {
        if (props.login.user.type === 'user') {
        } else {
            window.alert("Please log in first!")
            history.push('/')
        }

    } else {
        window.alert("Please log in first!")
        history.push('/')
    }
}

export const login = (history, props, data) => {
    if (data.userLogin) {
        const token = data.userLogin
        props.logInWithCredential(token)
        setUpToken(token)
        history.push('/user/home')

    } else if (data.staffLogin) {
        const token = data.staffLogin
        props.logInWithCredential(token)
        setUpToken(token)
        history.push('/staff/home')
    }
}


export const getToday = () => {
    const today = new Date()
    let  day = today.getDate()
    let month = today.getUTCMonth()
    const year = today.getFullYear()
    if (month !== 10 || 11) {
        month = month + 1
        month = "0" + month
    }
    if (day === 1 || 2 || 3 || 4 | 5 || 6 || 7 || 8 || 9 || 10) {
        day = day + 1
        day = "0" + day
    }
    // console.log(`${year}-${month}-${day}`)
    return (`${year}-${month}-${day}`)
}

export const checkIfPasswordIsTheSameAsConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        alert("Password and confirm password does not match!")
        return false
    } else {
        // console.log("Password matched")
        return true
    }
}

export const backToTop = () => {
    return window.scrollTo(0, 0)
}
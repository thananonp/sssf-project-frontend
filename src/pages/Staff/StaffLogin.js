import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {logInWithCredential, loginWithoutCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";
import {useField} from "../../hooks";
import {setUpToken, staffChecker} from "../../helpers/utils";

const StaffLogin = (props) => {
    const email = useField('email', "staff1@staff.com")
    const password = useField('password', "passwordstaff1")
    const history = useHistory()

    const loginStaff = (e) => {
        e.preventDefault()
        if (password.value.length < 8) {
            alert("Password length needs to be greater than 8 characters")
            return false
        }
        const option = {
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `email=${email.value}&password=${password.value}`
        }
        // console.log("option", option)
        // console.log("url", process.env.REACT_APP_BACKEND_REST_URL + 'staff/authenticate')
        fetch(process.env.REACT_APP_BACKEND_REST_URL + 'staff/authenticate', option)
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
                    // localStorage.setItem('jwtToken', data.token)
                    history.push('/staff/home')
                }
            })
            .catch(e => {
                console.error(e)
                alert(e)
            })
    }

    staffChecker(props, history)
    return (
        <div>
            <Container>
                <h1>Staff Login</h1>
                <Form onSubmit={loginStaff}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type={email.type} value={email.value} onChange={email.onChange}/>
                        {/*<Form.Text className="text-muted">*/}
                        {/*    Currently mocked just click submit*/}
                        {/*</Form.Text>*/}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type={password.type} value={password.value}
                                      onChange={password.onChange}/>
                    </Form.Group>
                    {/*<Form.Group controlId="formBasicCheckbox">*/}
                    {/*    <Form.Check type="checkbox" label="Check me out" />*/}
                    {/*</Form.Group>*/}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" type="reset">
                        Reset
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}


const mapDispatchToProps = {
    loginWithoutCredential, logoutWithoutCredential, logInWithCredential
}
const connectedStaffLogin = connect(mapStateToProps, mapDispatchToProps)(StaffLogin)

export default connectedStaffLogin
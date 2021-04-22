import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {logInWithCredential, loginWithoutCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";
import {useField} from "../../hooks";
import {login, staffChecker} from "../../helpers/utils";
import {useLazyQuery} from "@apollo/client";
import {STAFF_LOGIN} from "../../helpers/gql";

const StaffLogin = (props) => {
    const email = useField('email', "staff1@staff.com")
    const password = useField('password', "passwordstaff1")
    const history = useHistory()
    const [LoginStaff] = useLazyQuery(STAFF_LOGIN,{
        onCompleted: (data) => {
            console.log(data)
            login(history, props, data)
        },
        onError: (error) => {
            window.alert(error)
        }
    })

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
        LoginStaff({variables: {email: email.value, password: password.value}})
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
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type={password.type} value={password.value}
                                      onChange={password.onChange}/>
                    </Form.Group>
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
import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {logInWithCredential, loginWithoutCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";
import {useField, useNotification} from "../../hooks";
import {login, staffChecker} from "../../helpers/utils";
import {useLazyQuery} from "@apollo/client";
import {STAFF_LOGIN} from "../../helpers/gql";
import {NotificationAlert} from "../Components";

const StaffLogin = (props) => {

    const email = useField('email')
    const password = useField('password')
    const history = useHistory()
    const notification = useNotification()

    const [LoginStaff] = useLazyQuery(STAFF_LOGIN, {
        onCompleted: (data) => {
            // console.log(data)
            login(history, props, data)
        },
        onError: (error) => {
            notification.alertFailure(error.toString())
        }, fetchPolicy: "no-cache"
    })


    const loginStaff = (e) => {
        e.preventDefault()
        if (password.value.length < 8) {
            alert("Password length needs to be greater than 8 characters")
            return false
        }
        LoginStaff({variables: {email: email.value, password: password.value}})
    }

    const reset = () => {
        email.reset()
        password.reset()
    }

    staffChecker(props, history)
    return (
        <div>
            <Container>
                <h1 className={'mt-3'}>Staff Login</h1>
                <NotificationAlert success={notification.success} failure={notification.failure}
                                   successText={notification.successText} failureText={notification.failureText}/>
                <Form onSubmit={loginStaff} onReset={reset}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address (*)</Form.Label>
                        <Form.Control required type={email.type} value={email.value} onChange={email.onChange}
                                      placeholder="Enter staff email address"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password (*)</Form.Label>
                        <Form.Control required minLength="8" type={password.type} value={password.value}
                                      placeholder="Enter staff password"
                                      onChange={password.onChange}/>
                    </Form.Group>
                    <p>To create a new staff. You must be registered by the staff team.</p>
                    <p>(*) means the field is required</p>
                    <div className={"float-right"}>
                        <Button className='ml-3' variant="outline-primary" type="submit">
                            Submit
                        </Button>
                        <Button className='ml-3' variant="outline-secondary" type="reset">
                            Reset
                        </Button>
                    </div>
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
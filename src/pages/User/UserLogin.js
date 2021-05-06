import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {useField, useNotification} from "../../hooks";
import {logInWithCredential} from "../../reducers/loginReducer";
import {login, userChecker} from "../../helpers/utils";
import {useLazyQuery} from "@apollo/client";
import {USER_LOGIN} from "../../helpers/gql";
import {NotificationAlert, ReturnLanding} from "../Components";


const UserLogin = (props) => {
    const email = useField('email')
    const password = useField('password')
    const history = useHistory()
    const notification = useNotification()

    let [LoginUser] = useLazyQuery(USER_LOGIN, {
        onCompleted: (data) => {
            // console.log(data)
            login(history, props, data)
        }, onError: (error) => {
            window.alert(error)
        }, fetchPolicy: "no-cache"
    })


    const loginUser = (e) => {
        e.preventDefault()
        if (password.value.length < 8) {
            alert("Password length needs to be greater than 8 characters")
            return false
        }
        LoginUser({variables: {email: email.value, password: password.value}})
    }

    const resetForm = () => {
        email.reset()
        password.reset()
    }


    userChecker(props, history)
    return (
        <Container>
            <ReturnLanding/>
            <h1 className={"mt-2"}>User Login</h1>
            <NotificationAlert success={notification.success} failure={notification.failure}
                               successText={notification.successText} failureText={notification.failureText}/>
            <Form onSubmit={loginUser} onReset={resetForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address (*)</Form.Label>
                    <Form.Control required type={email.type} value={email.value} onChange={email.onChange}
                                  placeholder={"Enter your email"}/>
                    <Form.Text>Email address must follow the format of xxx@xxx.</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password (*)</Form.Label>
                    <Form.Control required type={password.type} value={password.value} onChange={password.onChange}
                                  placeholder={"Enter your password"}/>
                    <Form.Text>Password must be at least 8 characters.</Form.Text>
                </Form.Group>
                <p>Does not have an account? Click <a href={"register"}>here</a> to go to register page.</p>
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
    );
}

const mapDispatchToProps = {
    logInWithCredential
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
const connectedUserLogin = connect(mapStateToProps, mapDispatchToProps)(UserLogin)

export default connectedUserLogin
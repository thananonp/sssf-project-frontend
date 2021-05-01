import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {useField} from "../../hooks";
import {logInWithCredential} from "../../reducers/loginReducer";
import {login, userChecker} from "../../helpers/utils";
import {useLazyQuery} from "@apollo/client";
import {USER_LOGIN} from "../../helpers/gql";


const UserLogin = (props) => {
    const email = useField('email', "user1@user.com")
    const password = useField('password', "passworduser11")
    const history = useHistory()
    let [LoginUser] = useLazyQuery(USER_LOGIN, {
        onCompleted: (data) => {
            console.log(data)
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

    userChecker(props, history)
    return (
        <Container>
            <h1>User Login</h1>
            <Form onSubmit={loginUser}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type={email.type} value={email.value} onChange={email.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type={password.type} value={password.value} onChange={password.onChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
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
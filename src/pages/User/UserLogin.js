import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {useField} from "../../hooks";
import {logInWithCredential} from "../../reducers/loginReducer";
import {restLogin, userChecker} from "../../helpers/utils";


const UserLogin = (props) => {
    const email = useField('email', "user1@user.com")
    const password = useField('password', "passworduser11")
    const history = useHistory()

    const loginUser = (e) => {
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
        restLogin('user/authenticate', option, history, props, '/user/home')

    }

// if(props.login.login && props.login.user
    userChecker(props, history)
    return (
        <Container>
            <h1>User Login</h1>
            <Form onSubmit={loginUser}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type={email.type} value={email.value} onChange={email.onChange}/>
                    {/*<Form.Text className="text-muted">*/}
                    {/*    Currently mocked just click submit*/}
                    {/*</Form.Text>*/}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type={password.type} value={password.value} onChange={password.onChange}/>
                </Form.Group>
                {/*<Form.Group controlId="formBasicCheckbox">*/}
                {/*    <Form.Check type="checkbox" label="Check me out" />*/}
                {/*</Form.Group>*/}
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
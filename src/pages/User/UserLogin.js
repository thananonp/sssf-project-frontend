import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {loginWithoutCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";


const UserLogin = (props) => {
    const history = useHistory()
    const loginUser = (e) =>{
        e.preventDefault()
        history.push('/user/home')
        props.loginWithoutCredential()
    }

    return (
        <Container>
            <h1>User</h1>
            <Form onSubmit={loginUser}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        Currently mocked just click submit
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
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
    loginWithoutCredential,logoutWithoutCredential
}
const connectedUserLogin = connect(null, mapDispatchToProps)(UserLogin)

export default connectedUserLogin
import {useHistory} from "react-router";
import {Button, Form} from "react-bootstrap";


const UserLogin = () => {
    const history = useHistory()
    const loginUser = (e) =>{
        e.preventDefault()
        alert("Logged in")
        history.push('/user/home')
    }

    return (
        <div>
            <h1>User</h1>
            <Form onSubmit={loginUser}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
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
        </div>
    )
}

export default UserLogin
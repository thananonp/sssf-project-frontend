import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";

const StaffLogin = () => {
    const history = useHistory()
    const loginStaff = (e) => {
        e.preventDefault()
        history.push('/staff/home')
    }

    return (
        <div>
            <Container>
                <h1>Staff Login</h1>
                <Form onSubmit={loginStaff}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            Currently mocked just click submit
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
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

export default StaffLogin
import {Button, Container, Form} from "react-bootstrap";
import {useField} from "../../hooks";
import {useHistory} from "react-router";

const UserRegister = () => {
    const history = useHistory()
    const email = useField('email')
    const firstName = useField('text')
    const lastName = useField('text')
    const password = useField('password')
    const confirmPassword = useField('password')

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("New User registered")
        history.push('/user/home')
    }


    const resetForm = () => {
        email.reset()
        firstName.reset()
        lastName.reset()
        password.reset()
        confirmPassword.reset()
    }
    return (
        <div>
            <h1>Register New User</h1>
            <Container>
            <Form onSubmit={handleSubmit} onReset={resetForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type={email.type} placeholder="Enter email" value={email.value}
                                  onChange={email.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type={firstName.type} placeholder="Enter first name" value={firstName.value}
                                  onChange={firstName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type={lastName.type} placeholder="Enter last name" value={lastName.value}
                                  onChange={lastName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={password.type} placeholder="Password" value={password.value}
                                  onChange={password.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type={confirmPassword.type} placeholder="Password" value={confirmPassword.value}
                                  onChange={confirmPassword.onChange}/>
                </Form.Group>
                <Button type="submit">Submit</Button>

                <Button variant="secondary" type="reset">
                    Reset
                </Button>
            </Form>
        </Container>
</div>
)
}

export default UserRegister
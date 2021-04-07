import {Button, Container, Form} from "react-bootstrap";
import {useField} from "../../hooks";
import {useHistory} from "react-router";

const StaffRegister = () => {
    const history = useHistory()
    const email = useField('email')
    const firstName = useField('text')
    const lastName = useField('text')
    const password = useField('password')

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("New staff registered")
        history.push('/staff/home')
    }

    return (
        <div>
            <h1>Register New Staff</h1>
            <Container>
            <Form onSubmit={handleSubmit}>
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
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
</div>
)
}

export default StaffRegister
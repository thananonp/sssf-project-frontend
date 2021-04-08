import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import ReturnStaff from "../ReturnStaff";
import {useField} from "../../hooks";

const StaffSetting = () => {
    const email = useField('email')
    const firstName = useField('text')
    const lastName = useField('text')
    const password = useField('password')
    const confirmPassword = useField('password')

    const history = useHistory()
    const updateInfo = () => {
        alert("Info updated")
        history.push('/staff/home')
    }

    const resetForm = () => {
        email.reset()
        firstName.reset()
        lastName.reset()
        password.reset()
        confirmPassword.reset()
    }
    return (
        <Container>
            <ReturnStaff/>
            <h1>Staff Setting</h1>
            <Form onSubmit={updateInfo} onReset={resetForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email.value} onChange={email.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" value={firstName.value}
                                  onChange={firstName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" value={lastName.value}
                                  onChange={lastName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password.value}
                                  onChange={password.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPasswordCheck">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={confirmPassword.value}
                                  onChange={confirmPassword.onChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="secondary" type="reset">
                    Reset
                </Button>
            </Form>
        </Container>
    )
}

export default StaffSetting
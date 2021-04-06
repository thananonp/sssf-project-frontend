import {Button, Form} from "react-bootstrap";
import {useHistory} from "react-router";

const StaffSetting = () => {
    const email = "abc@example.com"
    const firstName = "John"
    const lastName = "Alexander"

    const history = useHistory()
    const updateInfo = () => {
        alert("Info updated")
        history.push('/staff/home')
    }
    return (
        <div>
            <h1>Staff Setting</h1>
            <Form onSubmit={updateInfo}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}/>
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" value={firstName}/>
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" value={lastName}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicPasswordCheck">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default StaffSetting
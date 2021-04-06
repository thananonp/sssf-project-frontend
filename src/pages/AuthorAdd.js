import {Button, Form} from "react-bootstrap";
import {useField} from "../hooks";
import {useHistory} from "react-router";

const AuthorAdd = () => {
    const firstName = useField('text')
    const lastName = useField('text')
    const email = useField('email')

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Add author ${firstName.value} ${lastName.value} ${email.value}`)
        history.push('/staff/home')
    }

    return (
        <div>
            <h1>Add new author</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control value={firstName.value} type={firstName.type} onChange={firstName.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control value={lastName.value} type={lastName.type} onChange={lastName.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email.value} type={email.type} onChange={email.onChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AuthorAdd
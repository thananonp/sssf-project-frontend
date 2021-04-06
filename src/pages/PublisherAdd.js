import {useField} from "../hooks";
import {useHistory} from "react-router";
import {Button, Form} from "react-bootstrap";

const PublisherAdd = () => {
    const name = useField('text')
    const email = useField('email')

    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Add publisher ${name.value}  ${email.value}`)
        history.push('/staff/home')
    }
    return (
        <div>
            <h1>Add new author</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Publisher Name</Form.Label>
                    <Form.Control value={name.value} type={name.type} onChange={name.onChange}/>
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

export default PublisherAdd
import {useField} from "../../hooks";
import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReturnStaff from "../ReturnStaff";

const PublisherAdd = () => {
    const name = useField('text')
    const email = useField('email')

    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Add publisher ${name.value}  ${email.value}`)
        history.push('/staff/home')
    }
    const resetForm = () => {
        name.reset()
        email.reset()
    }
    return (
        <Container>
            <ReturnStaff/>

            <h1>Add new publisher</h1>
            <Form onSubmit={handleSubmit} onReset={resetForm}>
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
                <Button variant="secondary" type="reset">
                    Reset
                </Button>
            </Form>
        </Container>
    )
}

export default PublisherAdd
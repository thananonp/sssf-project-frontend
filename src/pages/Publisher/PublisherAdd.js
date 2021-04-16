import {useField} from "../../hooks";
import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {ReturnStaff} from "../ReturnStaff";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";

const ADD_PUBLISHER = gql`
    mutation AddPublisher(
        $name: String,
        $description: String
    ){
        addPublisher(
            name:$name,
            description:$description
        ){
            id
            name
        }
    }
`

const PublisherAdd = () => {
    const name = useField('text')
    const description = useField('email')
    const [addPublisher] = useMutation(ADD_PUBLISHER)

    const history = useHistory()
    const handleSubmit = (e) => {

        console.log({
            name:name.value,
            description: description.value
        })
        e.preventDefault()
        addPublisher({
            variables:{
                name:name.value,
                description: description.value
            }
        }).then(result => {
            console.log(result)
            alert(`Added Author: ${result.data.addPublisher.name}`)
            resetForm()
        }).catch(e => {
            alert(e)
            console.error(e)
        })
        // history.push('/staff/home')
    }
    const resetForm = () => {
        name.reset()
        description.reset()
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
                    <Form.Label>Publisher Description</Form.Label>
                    <Form.Control value={description.value} type={description.type} onChange={description.onChange}
                                  as="textarea" rows={3}/>
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
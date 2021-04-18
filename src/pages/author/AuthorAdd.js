import {Alert, Button, Container, Form} from "react-bootstrap";
import {useField} from "../../hooks";
import {ReturnStaff} from "../ReturnStaff";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {notificationAlert} from "../../helpers/utils";

const ADD_AUTHOR = gql`
    mutation AddAuthor(
        $name:String!,
        $biography: String!
    ){
        addAuthor(
            name:$name,
            biography:$biography
        ){
            id
            name
        }
    }
`

const AuthorAdd = () => {
    const name = useField('text')
    const biography = useField('email')
    const [addAuthor] = useMutation(ADD_AUTHOR)
    const successAlert = useField('boolean', false)
    const failureAlert = useField('boolean', false)

    // const history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault()
        addAuthor({
            variables: {
                name: name.value,
                biography: biography.value
            }
        }).then(result => {
            console.log(result)
            notificationAlert(successAlert)
            resetForm()
        }).catch(e => {
            notificationAlert(failureAlert)
            console.error(e)
        })
    }

    const resetForm = () => {
        name.reset()
        biography.reset()
    }

    return (
        <Container>
            <ReturnStaff/>
            <h1>Add new author</h1>
            <Alert show={successAlert.value} variant="success">
                Added new author
            </Alert>
            <Alert show={failureAlert.value} variant="danger">
                Failed to add new author (Duplicated name)
            </Alert>
            <Form onSubmit={handleSubmit} onReset={resetForm}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Author Name</Form.Label>
                    <Form.Control required value={name.value} type={name.type} onChange={name.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Biography</Form.Label>
                    <Form.Control required value={biography.value} type={biography.type} onChange={biography.onChange}
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

export default AuthorAdd
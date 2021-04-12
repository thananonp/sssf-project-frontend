import {Button, Container, Form} from "react-bootstrap";
import {useField} from "../../hooks";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import ReturnStaff from "../ReturnStaff";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";

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

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        addAuthor({
            variables: {
                name: name.value,
                biography: biography.value
            }
        }).then(result => {
            console.log(result)
            alert(`Added Author: ${result.data.addAuthor.name}`)
            resetForm()
        }).catch(e => {
            alert(e)
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
            <Form onSubmit={handleSubmit} onReset={resetForm}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Author Name</Form.Label>
                    <Form.Control value={name.value} type={name.type} onChange={name.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Biography</Form.Label>
                    <Form.Control value={biography.value} type={biography.type} onChange={biography.onChange}
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
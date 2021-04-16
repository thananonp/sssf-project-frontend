import {useField} from "../../hooks";
import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {ReturnStaff} from "../ReturnStaff";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";

const ADD_CATEGORY = gql`
    mutation AddCategory(
        $title: String!
    ){
        addCategory(title:$title) {
            id
            title
        }
    }
`

const CategoryAdd = () => {
    const title = useField('text')
    const [addCategory] = useMutation(ADD_CATEGORY)

    const history = useHistory()
    const handleSubmit = (e) => {
        // console.log({
        //     title: title.value
        // })
        e.preventDefault()
        addCategory({
            variables: {
                title: title.value
            }
        }).then(result => {
            console.log(result)
            alert(`Added Author: ${result.data.addCategory.title}`)
            resetForm()
        }).catch(e => {
            alert(e)
            console.error(e)
        })
        // history.push('/staff/home')
    }
    const resetForm = () => {
        title.reset()
    }
    return (
        <Container>
            <ReturnStaff/>

            <h1>Add new category</h1>
            <Form onSubmit={handleSubmit} onReset={resetForm}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Category title</Form.Label>
                    <Form.Control value={title.value} type={title.type} onChange={title.onChange}/>
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

export default CategoryAdd
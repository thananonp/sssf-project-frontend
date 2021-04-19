import {useField, useNotification} from "../../hooks";
import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {NotificationAlert, ReturnStaff} from "../ReturnStaff";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {requireStaff} from "../../helpers/utils";
import {connect} from "react-redux";

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

const CategoryAdd = (props) => {
    const title = useField('text')
    const [addCategory] = useMutation(ADD_CATEGORY)
    const history = useHistory()
    const notification = useNotification()

    const handleSubmit = (e) => {
        e.preventDefault()
        addCategory({
            variables: {
                title: title.value
            }
        }).then(result => {
            notification.alertSuccess(`Added category: ${result.data.addCategory.title}`)
            resetForm()
        }).catch(e => {
            notification.alertFailure(String(e))
            console.error(e)
        })
        // history.push('/staff/home')
    }
    const resetForm = () => {
        title.reset()
    }

    requireStaff(props, history)
    return (
        <Container>
            <ReturnStaff/>

            <h1>Add new category</h1>
            <NotificationAlert success={notification.success} failure={notification.failure}
                               successText={notification.successText} failureText={notification.failureText}/>
            <Form onSubmit={handleSubmit} onReset={resetForm}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Category title</Form.Label>
                    <Form.Control required value={title.value} type={title.type} onChange={title.onChange}/>
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
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
const connectedCategoryAdd= connect(mapStateToProps, null)(CategoryAdd)

export default connectedCategoryAdd

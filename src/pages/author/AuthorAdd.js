import {Button, Container, Form} from "react-bootstrap";
import {useField, useFile, useNotification} from "../../hooks";
import {NotificationAlert, ReturnStaff} from "../Components";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {backToTop, requireStaff} from "../../helpers/utils";
import {connect} from "react-redux";
import {useHistory} from "react-router";

const ADD_AUTHOR = gql`
    mutation AddAuthor(
        $name:String!,
        $biography: String!
        $file: Upload!
    ){
        addAuthor(
            name:$name,
            biography:$biography,
            file:$file
        ){
            id
            name
        }
    }
`

const AuthorAdd = (props) => {
    const name = useField('text')
    const biography = useField('email')
    const file = useFile()

    const [addAuthor] = useMutation(ADD_AUTHOR)
    const notification = useNotification()
    const history = useHistory()

    const handleSubmit = (e) => {
        backToTop()
        e.preventDefault()
        addAuthor({
            variables: {
                name: name.value,
                biography: biography.value,
                file: file.value
            }
        }).then(result => {
            // console.log(result)
            notification.alertSuccess(`Added new author ${name.value}`)
            resetForm()
        }).catch(e => {
            notification.alertFailure(String(e))
            console.error(e)
        })
    }

    const resetForm = () => {
        name.reset()
        biography.reset()
        file.reset()
    }

    requireStaff(props, history)
    return (
        <Container>
            <ReturnStaff/>
            <h1>Add new author</h1>
            <NotificationAlert success={notification.success} failure={notification.failure}
                               successText={notification.successText} failureText={notification.failureText}/>

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
                <Form.Group>
                    <Form.File required type="file" onChange={file.onChange} id="exampleFormControlFile1"
                               accept="image/*"
                               label="Example file input"/>
                    {file.url
                        ? <img className="imagePreview" alt="input" src={file.url}/>
                        : null}
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

const connectedAuthorAdd = connect(mapStateToProps, null)(AuthorAdd)

export default connectedAuthorAdd
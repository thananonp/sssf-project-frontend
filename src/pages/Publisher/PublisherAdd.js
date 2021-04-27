import {useField, useFile, useNotification} from "../../hooks";
import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {NotificationAlert, ReturnStaff} from "../ReturnStaff";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {requireStaff} from "../../helpers/utils";
import {connect} from "react-redux";

const ADD_PUBLISHER = gql`
    mutation AddPublisher(
        $name: String!,
        $description: String!,
        $file: Upload!
    ){
        addPublisher(
            name:$name,
            description:$description
            file:$file
        ){  
            id
            name
        }
    }
`

const PublisherAdd = (props) => {
    const name = useField('text')
    const description = useField('email')
    const file = useFile()

    const [addPublisher] = useMutation(ADD_PUBLISHER)
    const notification = useNotification()

    const history = useHistory()
    const handleSubmit = (e) => {
        //
        // console.log({
        //     name:name.value,
        //     description: description.value
        // })
        e.preventDefault()
        addPublisher({
            variables:{
                name:name.value,
                description: description.value,
                file: file.value
            }
        }).then(result => {
            console.log(result)
            notification.alertSuccess(`Added new Publisher ${result.data.addPublisher.name}`)
            resetForm()
        }).catch(e => {
            notification.alertFailure(String(e))
            console.error(e)
        })
        // history.push('/staff/home')
    }
    const resetForm = () => {
        name.reset()
        description.reset()
    }

    requireStaff(props, history)
    return (
        <Container>
            <ReturnStaff/>
            <h1>Add new publisher</h1>
            <NotificationAlert success={notification.success} failure={notification.failure} successText={notification.successText} failureText={notification.failureText}/>
            <Form onSubmit={handleSubmit} onReset={resetForm}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Publisher Name</Form.Label>
                    <Form.Control required value={name.value} type={name.type} onChange={name.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Publisher Description</Form.Label>
                    <Form.Control required value={description.value} type={description.type} onChange={description.onChange}
                                  as="textarea" rows={3}/>
                </Form.Group>
                <Form.Group>
                    <Form.File required type="file" onChange={file.onChange} id="exampleFormControlFile1"
                               accept="image/*"
                               label="Example file input"/>
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
const connectedPublisherAdd = connect(mapStateToProps, null)(PublisherAdd)

export default connectedPublisherAdd
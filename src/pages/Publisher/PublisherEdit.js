import {useHistory} from "react-router";
import {useField} from "../../hooks";
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {LoadingSpinner, ReturnStaff} from "../ReturnStaff";
import {connect} from "react-redux";
import {requireStaff} from "../../helpers/utils";

const PUBLISHERS = gql`
    query{
        publishers{
            id
            name
            description
        }
    }
`

const EDIT_PUBLISHER = gql`
    mutation EditPublisher(
        $id:ID!
        $name:String
        $description:String,
    ){editPublisher(
        id:$id,
        name: $name,
        description:$description
    ){
        id
        name
        description
    }
    }
`

const DELETE_PUBLISHER = gql`
    mutation DeletePublisher($id:ID!){
        deletePublisher(
            id:$id
        ){
            id
        }
    }
`

const PublisherEdit = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [editId, setEditId] = useState(0)
    const history = useHistory()
    const {loading, error, data} = useQuery(PUBLISHERS)
    const [editPublisher] = useMutation(EDIT_PUBLISHER)
    const [deletePublisher] = useMutation(DELETE_PUBLISHER)
    console.log(data)

    const deletePublisherFun = async (id, name) => {
        // alert(`delete ${id}`)
        // deletePublisher({variables: {id}}).then(result => {
        //     console.log(result)
        //     window.location.reload(false);
        //     setModalShow(false)
        // }).catch(e => {
        //     alert(e)
        //     console.error(e)
        // })
        if (window.confirm(`Are you sure you want to delete publisher: ${name}`)) {
            try {
                await deletePublisher({variables: {id}})
                window.location.reload(false);
            } catch (e) {
                window.alert(e)
            }
        }
    }

    const EditModal = (props) => {
        const name = useField('text')
        const description = useField('email')

        const handleSubmit = (e) => {
            e.preventDefault()
            editPublisher({
                variables: {
                    id: editId,
                    name: name.value,
                    description: description.value
                }
            }).then(result => {
                console.log(result)
                setModalShow(false)
                window.alert(`Edited Publisher: ${result.data.editPublisher.name}`)
                window.location.reload(false);
            }).catch(e => {
                window.alert(e)
            })
        }

        const resetForm = () => {
            name.reset()
            description.reset()
        }

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   size="lg"
                   backdrop="static"
                   onEnter={() => {
                       const editData = data.publishers.find(publisher => publisher.id === editId)
                       name.setValue(editData.name)
                       description.setValue(editData.description)
                   }
                   }
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Publisher
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label>Publisher Name</Form.Label>
                                <Form.Control value={name.value} type={name.type} onChange={name.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Publisher Description</Form.Label>
                                <Form.Control value={description.value} type={description.type}
                                              onChange={description.onChange}/>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={resetForm}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }


    if (loading) return (<LoadingSpinner/>);
    if (error) return <p>Error :( {error}</p>;
    requireStaff(props, history)
    return (
        <Container>
            <ReturnStaff/>
            <h1>View, Edit and Delete Publisher</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Publisher Name</th>
                    <th>Description</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.publishers.map((publisher, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{publisher.name}</td>
                            <td>{publisher.description}</td>
                            <td><Link onClick={() => {
                                setEditId(publisher.id)
                                setModalShow(true)
                            }}>
                                Edit
                            </Link>
                            </td>
                            <td><Link onClick={() =>
                                deletePublisherFun(publisher.id, publisher.name)
                            }>
                                Delete
                            </Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedPublisherEdit = connect(mapStateToProps,null)(PublisherEdit)

export default connectedPublisherEdit
import {useHistory} from "react-router";
import {useField, useFile} from "../../hooks";
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {ErrorMessage, LoadingSpinner, ReturnStaff} from "../Components";
import {connect} from "react-redux";
import {requireStaff} from "../../helpers/utils";

const PUBLISHERS = gql`
    query{
        publishers{
            id
            name
            description
            imageUrl
        }
    }
`

const EDIT_PUBLISHER = gql`
    mutation EditPublisher(
        $id:ID!
        $name:String!
        $description:String!
        $file:Upload
    ){
        editPublisher(
            id:$id
            name: $name
            description:$description
            file:$file
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
    // console.log(data)

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
        const description = useField('text')
        const fileHolder = useFile()
        const file = useFile()
        const editData = data.publishers.find(publisher => publisher.id === editId)

        const populateData = () => {
            fileHolder.setValue(editData.imageUrl)
            name.setValue(editData.name)
            description.setValue(editData.description)
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            editPublisher({
                variables: {
                    id: editId,
                    name: name.value,
                    description: description.value,
                    file: file.value
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
            populateData()
            file.reset()
        }

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   size="lg"
                   backdrop="static"
                   onEnter={() => {
                       populateData()
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
                        <Form onReset={resetForm} onSubmit={handleSubmit}>
                            <img className="mediumAvatar" src={fileHolder.value} alt={name.value}/>
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label>Publisher Name</Form.Label>
                                <Form.Control required value={name.value} type={name.type} onChange={name.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Publisher Description</Form.Label>
                                <Form.Control required value={description.value} type={description.type}
                                              onChange={description.onChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Text>To update the picture upload a new file. If you don't upload the new picture,
                                    the old one will be used.</Form.Text>
                                <Form.File type="file" onChange={file.onChange} id="exampleFormControlFile1"
                                           accept="image/*"
                                           label="Example file input"/>
                                {file.url
                                    ?
                                    <>
                                        <p>Image Preview</p>
                                        <img className="imagePreview" alt="input" src={file.url}/></>
                                    : null}
                            </Form.Group>
                            <Button variant="secondary" type="reset">
                                Reset
                            </Button>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </Modal.Body>

            </Modal>
        );
    }


    if (loading) return (<LoadingSpinner/>);
    if (error) return <ErrorMessage error={error}/>
    requireStaff(props, history)
    return (
        <Container>
            <ReturnStaff/>
            <h1>Manage Publisher</h1>
            <p>There are total of {data.publishers.length} publisher.</p>

            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table responsive striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
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
                            {publisher.imageUrl ?
                                <td><img className="smallAvatar" src={publisher.imageUrl} alt={publisher.name}/></td> :
                                <td/>}
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

const connectedPublisherEdit = connect(mapStateToProps, null)(PublisherEdit)

export default connectedPublisherEdit
import {useHistory} from "react-router";
import {useField, useFile} from "../../hooks";
import {Button, Container, Dropdown, Form, Modal, Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {ErrorMessage, LoadingSpinner, ReturnStaff} from "../Components";
import {connect} from "react-redux";
import {requireStaff} from "../../helpers/utils";

const PUBLISHERS = gql`
    query($limit:Int, $skip:Int){
        countPublisher
        publishers(
            limit:$limit,
            skip:$skip){
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
    const limit = useField(null, 10)
    let active = useField(null, 1)
    const [modalShow, setModalShow] = useState(false);
    const [editId, setEditId] = useState(0)
    const history = useHistory()
    const {loading, error, data} = useQuery(PUBLISHERS, {
        variables: {
            limit: Number(limit.value),
            skip: Number(active.value - 1) * 10
        }
    })
    const [editPublisher] = useMutation(EDIT_PUBLISHER)
    const [deletePublisher] = useMutation(DELETE_PUBLISHER)


    const deletePublisherFun = async (id, name) => {
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
                   className='font'
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
                                <Form.Label>Publisher Name (*)</Form.Label>
                                <Form.Control required value={name.value} type={name.type} onChange={name.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Publisher Description (*)</Form.Label>
                                <Form.Control required value={description.value} type={description.type}
                                              onChange={description.onChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Text>To update the picture upload a new file. If you don't upload the new picture,
                                    the old one will be used.</Form.Text>
                                <Form.File type="file" onChange={file.onChange} id="exampleFormControlFile1"
                                           accept="image/*"
                                           label="Publisher Image"/>
                                {file.url
                                    ?
                                    <>
                                        <p>Image Preview</p>
                                        <img className="imagePreview" alt="input" src={file.url}/></>
                                    : null}
                            </Form.Group>
                            <p>(*) means the field is required</p>
                            <div className={"float-right"}>
                                <Button className='ml-3 mb-3' variant="outline-primary" type="submit">
                                    Submit
                                </Button>
                                <Button className='ml-3 mb-3' variant="outline-secondary" type="reset">
                                    Reset
                                </Button>
                            </div>
                        </Form>
                    </Container>
                </Modal.Body>

            </Modal>
        );
    }


    if (loading) return (<LoadingSpinner/>);
    if (error) return <ErrorMessage error={error}/>
    requireStaff(props, history)
    let items = [];
    for (let number = 1; number <= (data.countAuthor / limit.value) + 1; number++) {
        if (number === active.value) {
            items.push(
                <Pagination.Item key={number} active={true}>
                    {number}
                </Pagination.Item>,
            );
        } else {
            items.push(
                <Pagination.Item onClick={active.onClick} key={number} active={false}>
                    {number}
                </Pagination.Item>,
            );
        }
    }
    return (
        <Container>
            <ReturnStaff/>
            <h1>Manage Publisher</h1>
            <p>There are total of {data.countPublisher} publisher.</p>

            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>
            <Dropdown className={"float-left"}>
                Show
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    {limit.value}
                </Dropdown.Toggle>
                entries


                <Dropdown.Menu>
                    <Dropdown.Header>Select the numbers of entries</Dropdown.Header>
                    <Dropdown.Item onClick={limit.onClick}>10</Dropdown.Item>
                    <Dropdown.Item onClick={limit.onClick}>25</Dropdown.Item>
                    <Dropdown.Item onClick={limit.onClick}>50</Dropdown.Item>
                    <Dropdown.Item onClick={limit.onClick}>100</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Pagination className={"float-right"}>
                {items}
            </Pagination>
            <Pagination className={"float-right"}>
                {items}
            </Pagination>
            <br/>
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
                            <td>{(active.value - 1) * 10 + index + 1}</td>
                            {publisher.imageUrl ?
                                <td><img className="smallAvatar" src={publisher.imageUrl} alt={publisher.name}/></td> :
                                <td/>}
                            <td>{publisher.name}</td>
                            <td>{publisher.description}</td>
                            <td><Button variant="outline-warning" onClick={() => {
                                setEditId(publisher.id)
                                setModalShow(true)
                            }}>
                                Edit
                            </Button>
                            </td>
                            <td><Button variant="outline-danger" onClick={() =>
                                deletePublisherFun(publisher.id, publisher.name)
                            }>
                                Delete
                            </Button>
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
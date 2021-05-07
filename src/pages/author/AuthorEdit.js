import {useHistory} from "react-router";
import {useField, useFile} from "../../hooks";
import {Button, Container, Dropdown, Form, Modal, Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {ErrorMessage, LoadingSpinner, ReturnStaff} from "../Components";
import {requireStaff} from "../../helpers/utils";
import {connect} from "react-redux";

const EDIT_AUTHOR = gql`
    mutation EditBook(
        $id:ID!
        $name:String!,
        $biography: String!
        $file:Upload
    ){
        editAuthor(
            id:$id,
            name:$name,
            biography:$biography,
            file:$file
        ){
            id
            name
        }
    }
`

const DELETE_AUTHOR = gql`
    mutation DeleteAuthor($id:ID!){
        deleteAuthor(
            id:$id
        ){
            id
        }
    }
`
const AUTHORS = gql`
    query {
        authors{
            id
            name
            biography
            imageUrl
        }
    }
`

const AuthorEdit = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [editId, setEditId] = useState(0)
    const history = useHistory()
    const [editAuthor] = useMutation(EDIT_AUTHOR)
    const [deleteAuthor] = useMutation(DELETE_AUTHOR)
    const {loading, error, data} = useQuery(AUTHORS)
    // console.log(data)

    const numberOfQuery = useField(null,10)
    let active = useField(null, 1)
    let items = [];
    for (let number = 1; number <= 5; number++) {
        if (number === active.value) {
            items.push(
                <Pagination.Item key={number} active={true}>
                    WIP:{number}
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

    const deleteAuthorFun = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete author: ${name}`)) {
            await deleteAuthor({variables: {id}})
            window.location.reload(false);
        }
    }

    const EditModal = (props) => {
        const name = useField('text', '')
        const biography = useField('text', '')
        const fileHolder = useFile()
        const file = useFile()
        const editData = data.authors.find(author => author.id === editId)


        const handleSubmit = (e) => {
            e.preventDefault()

            editAuthor({
                variables: {
                    id: editId,
                    name: name.value,
                    biography: biography.value,
                    file: file.value
                }
            }).then(result => {
                setModalShow(false)
                window.alert(`Edited Author: ${result.data.editAuthor.name}`)
                window.location.reload(false);
            }).catch(e => {
                window.alert(e)
            })

        }

        const populateData = () => {
            name.setValue(editData.name)
            biography.setValue(editData.biography)
            fileHolder.setValue(editData.imageUrl)
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
                   keyboard={false}
                   className='font'
                   onEnter={() => {
                       populateData()
                   }
                   }>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Author
                    </Modal.Title>
                </Modal.Header>
                {/*<NotificationAlert success={alert.success} failure={alert.failure}/>*/}
                <Modal.Body className="show-grid">
                    <Container>
                        <Form onReset={resetForm} onSubmit={handleSubmit}>
                            <img className="mediumAvatar" src={fileHolder.value} alt={name.value}/>
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label>Author Name (*)</Form.Label>
                                <Form.Control required value={name.value} type={name.type}
                                              onChange={name.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicLastName">
                                <Form.Label>Biography (*)</Form.Label>
                                <Form.Control required value={biography.value} type={biography.type}
                                              onChange={biography.onChange} as="textarea" rows={3}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Text>To update the picture upload a new file. If you don't upload the new picture,
                                    the old one will be used.</Form.Text>
                                <Form.File type="file" onChange={file.onChange} id="exampleFormControlFile1"
                                           accept="image/*"
                                           label="Author Picture"/>
                                {file.url
                                    ? <img className="imagePreview" alt="input" src={file.url}/>
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
    return (
        <Container>
            <ReturnStaff/>
            <h1>Manage Author</h1>
            <p>There are total of {data.authors.length} authors.</p>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>
            <Dropdown className={"float-left"}>
                WIP: Show
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    {numberOfQuery.value}
                </Dropdown.Toggle>
                entries


                <Dropdown.Menu>
                    <Dropdown.Header>Select the numbers of entries</Dropdown.Header>
                    <Dropdown.Item onClick={numberOfQuery.onClick}>10</Dropdown.Item>
                    <Dropdown.Item onClick={numberOfQuery.onClick}>25</Dropdown.Item>
                    <Dropdown.Item onClick={numberOfQuery.onClick}>50</Dropdown.Item>
                    <Dropdown.Item onClick={numberOfQuery.onClick}>100</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Pagination className={"float-right"}>
                {items}
            </Pagination>
            <br/>
            <Table responsive striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Biography</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.authors.map((author,index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            {author.imageUrl ?
                                <td><img className="smallAvatar" src={author.imageUrl} alt={author.name}/></td> : <td/>}
                            <td>{author.name}</td>
                            <td>{author.biography}</td>
                            <td><Button variant="outline-warning" onClick={() => {
                                setEditId(author.id)
                                setModalShow(true)
                            }}>
                                Edit
                            </Button>
                            </td>
                            <td><Button variant="outline-danger" onClick={() =>
                                deleteAuthorFun(author.id, author.name)
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

const connectedAuthorEdit = connect(mapStateToProps, null)(AuthorEdit)

export default connectedAuthorEdit
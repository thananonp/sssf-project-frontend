import {useHistory} from "react-router";
import {useField, useFile} from "../../hooks";
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {LoadingSpinner, ReturnStaff} from "../Components";
import {requireStaff} from "../../helpers/utils";

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

const Author = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [editId, setEditId] = useState(0)
    const history = useHistory()
    const [editAuthor] = useMutation(EDIT_AUTHOR)
    const [deleteAuthor] = useMutation(DELETE_AUTHOR)
    const {loading, error, data} = useQuery(AUTHORS)
    console.log(data)

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

        const resetForm = () => {
            name.reset()
            biography.reset()
            file.reset()
        }

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   size="lg"
                   backdrop="static"
                   keyboard={false}
                   onEnter={() => {
                       const editData = data.authors.find(author => author.id === editId)
                       name.setValue(editData.name)
                       biography.setValue(editData.biography)
                       fileHolder.setValue(editData.imageUrl)
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
                        <Form>
                            <img className="mediumAvatar" src={fileHolder.value} alt={name.value}/>
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label>Author Name</Form.Label>
                                <Form.Control value={name.value} type={name.type}
                                              onChange={name.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicLastName">
                                <Form.Label>Biography</Form.Label>
                                <Form.Control value={biography.value} type={biography.type}
                                              onChange={biography.onChange} as="textarea" rows={3}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.File required type="file" onChange={file.onChange} id="exampleFormControlFile1"
                                           accept="image/*"
                                           label="Example file input"/>
                                <Form.Text>To update the picture upload a new file. If you don't upload the new picture, the old one will be used.</Form.Text>
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
    requireStaff(props,history)
    return (
        <Container>
            <ReturnStaff/>
            <h1>View, Edit and Delete Author</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Biography</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.authors.map(author => {
                    return (
                        <tr>
                            {author.imageUrl ?
                                <td><img className="smallAvatar" src={author.imageUrl} alt={author.name}/></td> : <td/>}
                            <td>{author.name}</td>
                            <td>{author.biography}</td>
                            <td><Link onClick={() => {
                                setEditId(author.id)
                                setModalShow(true)
                            }}>
                                Edit
                            </Link>
                            </td>
                            <td><Link onClick={() =>
                                deleteAuthorFun(author.id, author.name)
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

export default Author
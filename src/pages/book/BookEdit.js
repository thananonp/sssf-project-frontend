import {useHistory, useParams} from "react-router";
import {useField} from "../../hooks";
import {Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

const BookEdit = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const history = useHistory()

    const deleteBook = (id) => {
        alert(`delete ${id}`)
    }

    const EditModal = (props) => {
        const handleSubmit = (e) => {
            e.preventDefault()
            setModalShow(false)
        }

        const author = useField('text')
        const title = useField('text')
        const publisher = useField('text')
        const dateOfPublication = useField('date')

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   size="lg"
                   backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Author
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control value={author.value} type={author.type}
                                              onChange={author.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={title.value} type={title.type} onChange={title.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPublisher">
                                <Form.Label>Publisher</Form.Label>
                                <Form.Control value={publisher.value} type={publisher.type}
                                              onChange={publisher.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDateOfPublication">
                                <Form.Label>Date of Publication</Form.Label>
                                <Form.Control value={dateOfPublication.value} type={dateOfPublication.type}
                                              onChange={dateOfPublication.onChange}/>
                            </Form.Group>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <Container>
            <Link to='/staff/home'><p> ← Back to staff</p></Link>
            <h1>View, Edit and Delete Book</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Publisher</th>
                    <th>Date of Publication</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>2012</td>
                    <td>
                        <Link onClick={() => setModalShow(true)}>
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link onClick={() => deleteBook(1)}>
                            Delete
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>2012</td>
                    <td>
                        <Link onClick={() => setModalShow(true)}>
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link onClick={() => deleteBook(2)}>
                            Delete
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>2012</td>
                    <td>
                        <Link onClick={() => setModalShow(true)}>
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link onClick={() => deleteBook(3)}>
                            Delete
                        </Link>
                    </td>
                </tr>
                </tbody>
            </Table>


        </Container>
    )
}

export default BookEdit
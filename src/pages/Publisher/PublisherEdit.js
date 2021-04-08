import {useHistory, useParams} from "react-router";
import {useField} from "../../hooks";
import {Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

const PublisherEdit = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const history = useHistory()

    const deletePublisher = (id) => {
        alert(`delete ${id}`)
    }

    const EditModal = (props) => {
        const handleSubmit = (e) => {
            e.preventDefault()
            setModalShow(false)
        }

        const resetForm = () => {
            name.reset()
            email.reset()
        }

        const name = useField('text')
        const email = useField('email')

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   size="lg"
                   backdrop="static"
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
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={email.value} type={email.type} onChange={email.onChange}/>
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

    return (
        <Container>
            <Link to='/staff/home'><p> ← Back to staff</p></Link>
            <h1>View, Edit and Delete Publisher</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Publisher Name</th>
                    <th>Email address</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>
                        <Link onClick={() => setModalShow(true)}>
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link onClick={() => deletePublisher(1)}>
                            Delete
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>
                        <Link onClick={() => setModalShow(true)}>
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link onClick={() => deletePublisher(2)}>
                            Delete
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>
                        <Link onClick={() => setModalShow(true)}>
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link onClick={() => deletePublisher(3)}>
                            Delete
                        </Link>
                    </td>
                </tr>
                </tbody>
            </Table>


        </Container>
    )
}

export default PublisherEdit
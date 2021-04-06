import {useHistory, useParams} from "react-router";
import {useField} from "../../hooks";
import {Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

const Author = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const history = useHistory()

    const deleteAuthor = (id) => {
        alert(`delete ${id}`)
    }

    const EditModal = (props) => {
        const handleSubmit = (e) => {
            e.preventDefault()
            alert(`Add author ${firstName.value} ${lastName.value} ${email.value}`)
            setModalShow(false)
        }

        const firstName = useField('text')
        const lastName = useField('text')
        const email = useField('email')

        console.log("?")
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
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control value={firstName.value} type={firstName.type}
                                              onChange={firstName.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control value={lastName.value} type={lastName.type} onChange={lastName.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={email.value} type={email.type} onChange={email.onChange}/>
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
        <div>
            <Link to='/staff/home'><p> ← Back to staff</p></Link>
            <h1>View, Edit and Delete Author</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>
                        <Link onClick={() => setModalShow(true)}>
                        Edit
                    </Link>
                    </td>
                    <td>
                        <Link onClick={() => deleteAuthor(1)}>
                            Delete
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>
                        <Link onClick={() => setModalShow(true)}>
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link onClick={() => deleteAuthor(1)}>
                            Delete
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>
                        <Link onClick={() => setModalShow(true)}>
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link onClick={() => deleteAuthor(1)}>
                            Delete
                        </Link>
                    </td>
                </tr>
                </tbody>
            </Table>


        </div>
    )
}

export default Author
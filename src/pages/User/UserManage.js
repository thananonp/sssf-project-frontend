import {useHistory, useParams} from "react-router";
import {useField} from "../../hooks";
import {Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

const UserManage = (props) => {
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

        const email = useField('email')
        const firstName = useField('text')
        const lastName = useField('text')
        const password = useField('password')


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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type={email.type} placeholder="Enter email" value={email.value} onChange={email.onChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type={firstName.type} placeholder="Enter first name" value={firstName.value} onChange={firstName.onChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicSurname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type={lastName.type} placeholder="Enter last name" value={lastName.value} onChange={lastName.onChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={password.type} placeholder="Password" value={password.value} onChange={password.onChange}/>
                        </Form.Group>
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
            <h1>Manage user</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email address</th>
                    <th>Book Due</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Otto@asdf</td>
                    <td>-</td>
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
                    <td>Thornton@fdas</td>
                    <td>2 days</td>
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
                    <td>the Bird@ofiashf</td>
                    <td>1 day</td>
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


        </div>
    )
}

export default UserManage
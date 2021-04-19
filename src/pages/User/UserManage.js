import {useHistory} from "react-router";
import {useField} from "../../hooks";
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {ReturnStaff} from "../ReturnStaff";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";

const USERS = gql`
    query{
        users{
            id
            email
            firstName
            lastName
        }
    }
`

const EDIT_USER = gql`
    mutation
    EditUser(
        $id:ID!,
        $email:String,
        $firstName:String,
        $lastName:String,
        $password:String
    ){
        editUser(
            id:$id,
            email:$email,
            firstName:$firstName,
            lastName:$lastName,
            password:$password
        ){
            id
            email
        }
    }
`

const DELETE_USER = gql`
    mutation DeleteUser(
        $id:ID!
    ){
        deleteUser(
            id:$id
        ){
            id
            email
        }
    }
`
const UserManage = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const history = useHistory()
    const [editUser] = useMutation(EDIT_USER)
    const [deleteUser] = useMutation(DELETE_USER)
    const {loading, error, data} = useQuery(USERS)
    const [editId, setEditId] = useState('')

    const deleteUserFun = async (id,name) => {
        if (window.confirm(`Are you sure you want to delete user: ${name}`)) {
            try {
                await deleteUser({variables: {id}})
                window.location.reload(false);
            } catch (e) {
                window.alert(e)
            }
        }

        // alert(`delete ${id}`)
        // deleteUser({
        //     variables: {
        //         id
        //     }
        // })
        // window.location.reload(false);
    }

    const EditModal = (props) => {
        const email = useField('email')
        const firstName = useField('text')
        const lastName = useField('text')
        const password = useField('password')

        const handleSubmit = (e) => {
            e.preventDefault()
            editUser({
                variables: {
                    id: editId,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value
                }
            }).then(result => {
                alert(`Edited user: ${result.data.editUser.firstName}`)
                console.log(result)
                window.location.reload(false);
                setModalShow(false)
            }).catch(e => {
                alert(e)
                console.error(e)
            })
            setModalShow(false)
        }

        const resetForm = () => {
            email.reset()
            firstName.reset()
            lastName.reset()
            password.reset()
        }

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   size="lg"
                   backdrop="static"
                   onEnter={() => {
                       const editData = data.users.find(user => user.id === editId)
                       firstName.setValue(editData.firstName)
                       lastName.setValue(editData.lastName)
                       email.setValue(editData.email)
                   }
                   }
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type={email.type} placeholder="Enter email" value={email.value}
                                          onChange={email.onChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control required type={firstName.type} placeholder="Enter first name" value={firstName.value}
                                          onChange={firstName.onChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicSurname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type={lastName.type} placeholder="Enter last name" value={lastName.value}
                                          onChange={lastName.onChange}/>
                        </Form.Group>

                        <Form.Check
                            type='checkbox'
                            id={`default-checkbox`}
                            label={`Change Password`}
                        />

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type={password.type} placeholder="Password" value={password.value}
                                          onChange={password.onChange}/>
                        </Form.Group>
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


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error}</p>;
    return (
        <Container>
            <ReturnStaff/>
            <h1>Manage user</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email address</th>
                    {/*<th>Book Due</th>*/}
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.users.map((user, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td><Link onClick={() => {
                                setEditId(user.id)
                                setModalShow(true)
                            }}>
                                Edit
                            </Link>
                            </td>
                            <td><Link onClick={() =>
                                deleteUserFun(user.id, user.firstName)
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

export default UserManage
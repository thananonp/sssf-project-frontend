import {useHistory} from "react-router";
import {useField} from "../../hooks";
import {Button, Container, Dropdown, Form, Modal, Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {ErrorMessage, LoadingSpinner, ReturnStaff} from "../Components";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {requireStaff} from "../../helpers/utils";
import {connect} from "react-redux";
import {CHANGE_PASSWORD_USER} from "../../helpers/gql";

const USERS = gql`
    query ($limit:Int, $skip:Int){
        countUser
        users(
            limit:$limit,
            skip:$skip){
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
        $lastName:String
    ){
        editUser(
            id:$id,
            email:$email,
            firstName:$firstName,
            lastName:$lastName
        ){
            id
            email
            firstName
            lastName
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
    const limit = useField(null, 10)
    let active = useField(null, 1)
    const [modalShow, setModalShow] = useState(false);
    const [passwordModalShow, setPasswordModalShow] = useState(false);
    const history = useHistory()
    const [changePasswordUser] = useMutation(CHANGE_PASSWORD_USER)
    const [editUser] = useMutation(EDIT_USER)
    const [deleteUser] = useMutation(DELETE_USER)
    const {loading, error, data} = useQuery(USERS, {
        variables: {
            limit: Number(limit.value),
            skip: Number(active.value - 1) * 10
        }
    })
    const [editId, setEditId] = useState('')


    const deleteUserFun = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete user: ${name}`)) {
            try {
                await deleteUser({variables: {id}})
                window.location.reload(false);
            } catch (e) {
                window.alert(e)
            }
        }
    }

    const EditModal = (props) => {
        const email = useField('email')
        const firstName = useField('text')
        const lastName = useField('text')
        const editData = data.users.find(user => user.id === editId)

        const populateData = () => {
            firstName.setValue(editData.firstName)
            lastName.setValue(editData.lastName)
            email.setValue(editData.email)
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            if (email.value && firstName.value && lastName.value) {
                editUser({
                    variables: {
                        id: editId,
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value
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
            } else {
                window.alert("Please fill in all the information")
            }
        }

        const resetForm = () => {
            populateData()
        }

        return (
            <Modal {...props}
                   className='font'
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
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form onReset={resetForm} onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address (*)</Form.Label>
                                <Form.Control required type={email.type} placeholder="Enter email" value={email.value}
                                              onChange={email.onChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label>First Name (*)</Form.Label>
                                <Form.Control required type={firstName.type} placeholder="Enter first name"
                                              value={firstName.value}
                                              onChange={firstName.onChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicSurname">
                                <Form.Label>Last Name (*)</Form.Label>
                                <Form.Control required type={lastName.type} placeholder="Enter last name"
                                              value={lastName.value}
                                              onChange={lastName.onChange}/>
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
    const PasswordModal = (props) => {
        const password = useField('password')

        const handleSubmit = (e) => {
            e.preventDefault()
            changePasswordUser({variables: {id: editId, password: password.value}})
                .then(result => {
                    alert(`Password of user  ${result.data.changePasswordUser.email} edited`)
                    window.location.reload()
                }).catch(e => {
                alert(e)
                console.log(e)
            })
        }

        const resetForm = () => {
            password.reset()
        }

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   size="lg"
                   backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Password of User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form onReset={resetForm} onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password (*)</Form.Label>
                                <Form.Text>The password must be more than 8 characters.</Form.Text>
                                <Form.Control required minLength="8" type={password.type} placeholder="Password"
                                              value={password.value}
                                              onChange={password.onChange}/>
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
    for (let number = 1; number <= (data.countUser / limit.value) + 1; number++) {
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
            <h1>Manage user</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>
            <PasswordModal show={passwordModalShow} onHide={() => setPasswordModalShow(false)}/>

            <p>There are total of {data.countUser} users.</p>
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
            <br/>
            <Table responsive striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email address</th>
                    <th colSpan={3}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.users.map((user, index) => {
                    return (
                        <tr>
                            <td>{(active.value - 1) * 10 + index + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td><Button variant="outline-warning" onClick={() => {
                                setEditId(user.id)
                                setModalShow(true)
                            }}>
                                Edit
                            </Button>
                            </td>
                            <td><Button variant="outline-warning" onClick={() => {
                                setEditId(user.id)
                                setPasswordModalShow(true)
                            }}>
                                Change Password
                            </Button>
                            </td>
                            <td><Button variant="outline-danger" onClick={() =>
                                deleteUserFun(user.id, user.firstName)
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

const connectedUserManage = connect(mapStateToProps, null)(UserManage)

export default connectedUserManage
import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import ReturnStaff from "../ReturnStaff";
import {useField} from "../../hooks";
import {gql} from "@apollo/client/core";
import React, {useEffect} from "react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {logInWithCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";

const STAFF_COMPARE_PASSWORD = gql`
    query StaffComparePassword($id:ID!,$password:String!){
        staffComparePassword(id:$id,password:$password)
    }
`


const EDIT_STAFF = gql`
    mutation editStaff(
        $id: ID!,
        $email: String
        $firstName: String
        $lastName: String
    ){
        editStaff(
            id:  $id,
            email:  $email,
            firstName:  $firstName,
            lastName:  $lastName
        ) {
            id
            email
        }
    }
`

const StaffSetting = (props) => {
    const email = useField('email')
    const firstName = useField('text')
    const lastName = useField('text')
    const oldPassword = useField('password', '')

    useEffect(() => {
        if (props.login.login) {
            email.setValue(props.login.user.user.email)
            firstName.setValue(props.login.user.user.firstName)
            lastName.setValue(props.login.user.user.lastName)
        }
    }, [])

    const [editStaff] = useMutation(EDIT_STAFF)
    let StaffComparePassword, loading, data;
    [StaffComparePassword, {loading, data}] = useLazyQuery(STAFF_COMPARE_PASSWORD, {
        onCompleted: (data) => {
            console.log(data)
            if (data.staffComparePassword) {
                editStaff({
                    variables: {
                        id: props.login.user.user._id,
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                    }
                }).then(result => {
                    alert(`Staff ${result.data.editStaff.email} edited`)
                    // props.loginWithoutCredential()
                    const option = {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        body: `email=${email.value}&password=${oldPassword.value}`
                    }
                    console.log("option", option)
                    console.log("url", process.env.REACT_APP_BACKEND_REST_URL + 'staff/authenticate')
                    fetch(process.env.REACT_APP_BACKEND_REST_URL + 'staff/authenticate', option)
                        .then(response => {
                            console.log("response", response)
                            if (!response.ok) {
                                if (response.status === 404) {
                                    alert('Email not found, please retry')
                                    return false
                                }
                                if (response.status === 401) {
                                    alert('Email and password do not match, please retry')
                                    return false
                                }
                                if (response.status === 400) {
                                    alert('Email and password do not match, please retry')
                                    return false
                                }
                            }
                            return response
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            if (data !== undefined) {
                                props.logInWithCredential(data.token)
                                document.cookie = `token= ${data.token}`;
                                // localStorage.setItem('jwtToken', data.token)
                                history.push('/staff/home')
                            }
                        })
                        .catch(e => {
                            console.error(e)
                            alert(e)
                        })
                }).catch(e => {
                    alert(e)
                    console.log(e)
                })
            } else {
                alert("Password incorrect")
            }
        }
    });


    const history = useHistory()

    const updateInfo = (e) => {
        e.preventDefault()
        StaffComparePassword({variables: {id: props.login.user.user._id, password: oldPassword.value}})

    }

    const resetForm = () => {
        email.reset()
        firstName.reset()
        lastName.reset()
        oldPassword.reset()
    }
    return (
        <Container>
            <ReturnStaff/>
            <h1>Staff Setting</h1>
            <Form onSubmit={updateInfo} onReset={resetForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email.value} onChange={email.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" value={firstName.value}
                                  onChange={firstName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" value={lastName.value}
                                  onChange={lastName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={oldPassword.value}
                                  onChange={oldPassword.onChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="secondary" type="reset">
                    Reset
                </Button>
            </Form>
        </Container>
    )
}

const mapDispatchToProps = {
    logoutWithoutCredential, logInWithCredential
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedStaffSetting = connect(mapStateToProps, mapDispatchToProps)(StaffSetting)
export default connectedStaffSetting
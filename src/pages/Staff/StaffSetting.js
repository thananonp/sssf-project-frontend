import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import {LoadingSpinner, ReturnStaff} from "../Components";
import {useField} from "../../hooks";
import {gql} from "@apollo/client/core";
import React, {useEffect} from "react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {logInWithCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";
import {requireStaff} from "../../helpers/utils";

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
    let [StaffComparePassword, {loading, error}] = useLazyQuery(STAFF_COMPARE_PASSWORD, {
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
                    alert(`Staff ${result.data.editStaff.email} edited\nPlease sign in again.`)
                    props.logoutWithoutCredential(history)
                }).catch(e => {
                    alert(e)
                    console.log(e)
                })
            } else {
                window.alert("Old password does not match!")
            }
        }
    });


    const history = useHistory()

    const updateInfo = (e) => {
        e.preventDefault()
        StaffComparePassword({variables: {id: props.login.user.user._id, password: oldPassword.value}})

    }

    const resetForm = () => {
        email.setValue(props.login.user.user.email)
        firstName.setValue(props.login.user.user.firstName)
        lastName.setValue(props.login.user.user.lastName)
        oldPassword.reset()
    }

    requireStaff(props, history)
    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error :( {error}</p>;
    return (
        <Container>
            <ReturnStaff/>
            <h1>Staff Setting</h1>
            <Form onSubmit={updateInfo} onReset={resetForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" value={email.value} onChange={email.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter first name" value={firstName.value}
                                  onChange={firstName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter last name" value={lastName.value}
                                  onChange={lastName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required minLength="8" type="password" placeholder="Password" value={oldPassword.value}
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
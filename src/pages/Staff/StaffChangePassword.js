import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import {useField} from "../../hooks";
import React from "react";
import {gql} from "@apollo/client/core";
import {useLazyQuery, useMutation} from "@apollo/client";
import {logInWithCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";
import {ReturnStaff} from "../Components";
import {checkIfPasswordIsTheSameAsConfirmPassword, requireStaff} from "../../helpers/utils";

const STAFF_COMPARE_PASSWORD = gql`
    query StaffComparePassword($id:ID!,$password:String!){
        staffComparePassword(id:$id,password:$password)
    }
`

const CHANGE_PASSWORD_STAFF = gql`
    mutation ChangePasswordStaff(
        $id: ID!,
        $password: String!
    ){
        changePasswordStaff(
            id:  $id,
            password:  $password
        ) {
            id
            email
        }
    }
`

const StaffChangePassword = (props) => {
    const history = useHistory()
    const oldPassword = useField('password', '')
    const password = useField('password', '')
    const confirmPassword = useField('password', '')
    const [ChangePasswordStaff] = useMutation(CHANGE_PASSWORD_STAFF)
    let [StaffComparePassword] = useLazyQuery(STAFF_COMPARE_PASSWORD, {
        onCompleted: (data) => {
            if (data.staffComparePassword) {
                ChangePasswordStaff({
                    variables: {
                        id: props.login.user.user._id,
                        password: password.value
                    }
                }).then(result => {
                    window.alert(`Staff ${result.data.changePasswordStaff.email} edited\nPlease sign in again.`)
                    props.logoutWithoutCredential(history)
                }).catch(e => {
                    window.alert(e)
                })
            } else {
                window.alert("Old password does not match!")
            }
        }, onError: (error) => {
            console.log(error)
            window.alert("Check password error" + error)
        }
    });

    const updateInfo = (e) => {
        e.preventDefault()
        if (checkIfPasswordIsTheSameAsConfirmPassword(password.value, confirmPassword.value)) {
            StaffComparePassword({variables: {id: props.login.user.user._id, password: oldPassword.value}})
        }
    }

    const resetForm = () => {
        password.reset()
        oldPassword.reset()
        confirmPassword.reset()
    }

    requireStaff(props, history)
    return (
        <Container>
            <ReturnStaff/>
            <h1>Staff Setting</h1>
            <Form onSubmit={updateInfo} onReset={resetForm}>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control required minLength="8" type="password" placeholder="Password"
                                  value={oldPassword.value}
                                  onChange={oldPassword.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required minLength="8" type="password" placeholder="Password" value={password.value}
                                  onChange={password.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPasswordCheck">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required minLength="8" type="password" placeholder="Password"
                                  value={confirmPassword.value}
                                  onChange={confirmPassword.onChange}/>
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

const connectedUserSetting = connect(mapStateToProps, mapDispatchToProps)(StaffChangePassword)
export default connectedUserSetting
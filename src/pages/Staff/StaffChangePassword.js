import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import {useField} from "../../hooks";
import {Link} from "react-router-dom";
import React from "react";
import {gql} from "@apollo/client/core";
import {useLazyQuery, useMutation} from "@apollo/client";
import {logInWithCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";

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
    let userId
    const [ChangePasswordStaff] = useMutation(CHANGE_PASSWORD_STAFF)
    let StaffComparePassword, loading, data;
    [StaffComparePassword, {loading, data}] = useLazyQuery(STAFF_COMPARE_PASSWORD, {
        onCompleted: (data) => {
            if (data.staffComparePassword) {
                ChangePasswordStaff({
                    variables: {
                        id: props.login.user.user._id,
                        password: password.value
                    }
                }).then(result => {
                    alert(`Staff ${result.data.changePasswordStaff.email} edited\nPlease sign in again.`)
                    props.logoutWithoutCredential()
                    document.cookie = `token=;max-age:1`;
                    // props.loginWithoutCredential()

                }).catch(e => {
                    alert(e)
                    console.log(e)
                })
            }
        }
    });

    const updateInfo = (e) => {
        e.preventDefault()
        if (password.value.length < 8 || confirmPassword.value.length < 8) {
            alert("New Password length must be greater than 8 characters")
            return false

        } else if (password.value !== confirmPassword.value) {
            alert("New Password and Confirm Password does not match!")
            return false
        }
        console.log({id: props.login.user.user._id, password: oldPassword.value})
        StaffComparePassword({variables: {id: props.login.user.user._id, password: oldPassword.value}})


    }

    const resetForm = () => {
        password.reset()
        oldPassword.reset()
        confirmPassword.reset()
    }

    if (props.login.login) {
        return (
            <Container>
                <Link to='/user/staff'><p> ← Back to staff</p></Link>
                <h1>Staff Setting</h1>
                <Form onSubmit={updateInfo} onReset={resetForm}>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={oldPassword.value}
                                      onChange={oldPassword.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password.value}
                                      onChange={password.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordCheck">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={confirmPassword.value}
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
    } else {
        alert("Please log in first!")
        history.push('/')
        return null
    }
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
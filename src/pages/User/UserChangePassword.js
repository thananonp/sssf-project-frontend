import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import {useField} from "../../hooks";
import React from "react";
import {gql} from "@apollo/client/core";
import {useLazyQuery, useMutation} from "@apollo/client";
import {logInWithCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";
import {ReturnUser} from "../Components";
import {CHANGE_PASSWORD_USER} from "../../helpers/gql";
import {requireUser} from "../../helpers/utils";

const USER_COMPARE_PASSWORD = gql`
    query UserComparePassword($id:ID!,$password:String!){
        userComparePassword(id:$id,password:$password)
    }
`


const UserSetting = (props) => {
    const history = useHistory()
    const oldPassword = useField('password', '')
    const password = useField('password', '')
    const confirmPassword = useField('password', '')
    // let userId
    const [ChangePasswordUser] = useMutation(CHANGE_PASSWORD_USER)
    const [UserComparePassword] = useLazyQuery(USER_COMPARE_PASSWORD, {
        onCompleted: (data) => {
            if (data.userComparePassword) {
                ChangePasswordUser({
                    variables: {
                        id: props.login.user.user._id,
                        password: password.value
                    }
                }).then(result => {
                    alert(`User ${result.data.changePasswordUser.email} edited\nPlease sign in again.`)
                    props.logoutWithoutCredential(history)
                }).catch(e => {
                    alert(e)
                    console.log(e)
                })
            } else {
                window.alert("You have enter a wrong password")
            }
        }, onError: (error) => {
            window.alert(error)
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
        UserComparePassword({variables: {id: props.login.user.user._id, password: oldPassword.value}})


    }

    const resetForm = () => {
        password.reset()
        oldPassword.reset()
        confirmPassword.reset()
    }

    requireUser(props, history)
    return (
        <Container>
            <ReturnUser/>
            <h1>User Setting</h1>
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

}
const mapDispatchToProps = {
    logoutWithoutCredential, logInWithCredential
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedUserSetting = connect(mapStateToProps, mapDispatchToProps)(UserSetting)
export default connectedUserSetting
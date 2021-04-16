import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import {useField} from "../../hooks";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {gql} from "@apollo/client/core";
import {useLazyQuery, useMutation} from "@apollo/client";
import {logInWithCredential, logoutWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";

// const USER = gql`
//     query User($id:ID!){
//         user(id:$id){
//             password
//         }
//     }
// `
//    userCheckPassword(id:$id,password:$password)

const USERCOMPAREPASSWORD = gql`
    query UserComparePassword($id:ID!,$password:String!){
        userComparePassword(id:$id,password:$password)
    }
`

const EDIT_USER = gql`
    mutation editUser(
        $id: ID!,
        $email: String
        $firstName: String
        $lastName: String
    ){
        editUser(
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

const UserSetting = (props) => {
    const history = useHistory()
    const email = useField('email')
    const firstName = useField('text')
    const lastName = useField('text')
    const oldPassword = useField('password', '')
    let UserComparePassword, loading, data;
    [UserComparePassword, {loading, data}] = useLazyQuery(USERCOMPAREPASSWORD, {
        onCompleted: (data) => {
            console.log(data)
            if (data.userComparePassword) {
                editUser({
                    variables: {
                        id: props.login.user.user._id,
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                    }
                }).then(result => {
                    alert(`User ${result.data.editUser.email} edited`)
                    // props.loginWithoutCredential()
                    const option = {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        body: `email=${email.value}&password=${oldPassword.value}`
                    }
                    console.log("option", option)
                    console.log("url", process.env.REACT_APP_BACKEND_REST_URL + 'user/authenticate')
                    fetch(process.env.REACT_APP_BACKEND_REST_URL + 'user/authenticate', option)
                        .then(response => {
                            console.log("response", response)
                            if (!response.ok) {
                                if (response.status === 404) {
                                    alert('Email not found, please retry')
                                }
                                if (response.status === 401) {
                                    alert('Email and password do not match, please retry')
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
                                history.push('/user/home')
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


    const [editUser] = useMutation(EDIT_USER)
    useEffect(() => {
        if (props.login.login) {
            email.setValue(props.login.user.user.email)
            firstName.setValue(props.login.user.user.firstName)
            lastName.setValue(props.login.user.user.lastName)
            // userId = props.login.user.user._id

        }
    }, [])


    const updateInfo = async (e) => {
        e.preventDefault()
        UserComparePassword({variables: {id: props.login.user.user._id, password: oldPassword.value}})

    }

    const resetForm = () => {
        email.reset()
        firstName.reset()
        lastName.reset()
        oldPassword.reset()
    }
    if (props.login.login) {
        return (
            <Container>
                <Link to='/user/home'><p> ← Back to user</p></Link>
                <h1>User Setting</h1>
                <Form onSubmit={updateInfo} onReset={resetForm}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email.value}
                                      onChange={email.onChange}/>
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
                    {/*<Form.Group controlId="formBasicPassword">*/}
                    {/*    <Form.Label>Password</Form.Label>*/}
                    {/*    <Form.Control type="password" placeholder="Password" value={password.value}*/}
                    {/*                  onChange={password.onChange}/>*/}
                    {/*</Form.Group>*/}
                    {/*<Form.Group controlId="formBasicPasswordCheck">*/}
                    {/*    <Form.Label>Confirm Password</Form.Label>*/}
                    {/*    <Form.Control type="password" placeholder="Password" value={confirmPassword.value}*/}
                    {/*                  onChange={confirmPassword.onChange}/>*/}
                    {/*</Form.Group>*/}

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

const connectedUserSetting = connect(mapStateToProps, mapDispatchToProps)(UserSetting)
export default connectedUserSetting
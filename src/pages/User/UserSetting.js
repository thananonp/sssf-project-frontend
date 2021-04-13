import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import {useField} from "../../hooks";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {gql} from "@apollo/client/core";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
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
    // const password = useField('password', '')
    // const confirmPassword = useField('password', '')
    // let userId
    const [UserComparePassword, {loading, data}] = useLazyQuery(USERCOMPAREPASSWORD, {
        onCompleted: (data) => {
            console.log(data)
            if (data.userComparePassword) {
                editUser({
                    variables: {
                        id: props.login.user.user._id,
                        firstName: firstName.value,
                        lastName: firstName.value,
                        email: firstName.value,
                    }
                }).then(result => {
                    alert(`User ${result.data.editUser.email} edited`)
                    // props.loginWithoutCredential()
                    history.push('/')
                }).catch(e => {
                    alert(e)
                    console.log(e)
                })
            }
        }
    })
    // const {loading, error, data} = useQuery(USER, {
    //     // variables: {id: props.login.user.user._id, password:props.login.user.user.password}
    //     variables: {id: userId || "111111111111111111111111"}
    // })

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
        // console.log(password.value.length)
        // if (password.value.length < 8 || password.value.length < 8) {
        //     alert("Password length must be greater than 8 characters")
        //     return false
        //
        // } else if (password.value !== confirmPassword.value) {
        //     alert("Password and Confirm Password does not match!")
        //     return false
        // }
        UserComparePassword({variables: {id: props.login.user.user._id, password: oldPassword.value}})
        // .finally(
        //     {
        //         if(data) {
        //             if (data.userComparePassword) {
        //                 console.log("CHANGE PASSWORD")
        //             }
        //         }
        //     }
        // )

        // if (data.userComparePassword) {
        //     alert("yES")
        // } else {
        //     alert("NO")
        // }

        // console.log("dataLAzy", dataLazy)
        // console.log("loadingLazy", loadingLazy)

        // if () {
        //     alert("yES")
        // } else {
        //     alert("NO")
        // }
        // if (password.length)
        //     alert("Info updated")
        // history.push('/user/home')

    }

    const resetForm = () => {
        email.reset()
        firstName.reset()
        lastName.reset()
        // password.reset()
        // confirmPassword.reset()
    }
    //
    // useEffect(()=>{
    //     email.setValue()
    //     firstName.setValue()
    //     lastName.setValue()
    //     password.setValue()
    //     email.setValue()
    // },[])


    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :( {error}</p>;
    // console.log(data)
    // if(data){
    //     if(data.userComparePassword){
    //         console.log("CHANGE PASSWORD")
    //     }
    // }
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
        return (
            null
        )
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
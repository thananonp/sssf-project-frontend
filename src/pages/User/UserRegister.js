import {Button, Container, Form} from "react-bootstrap";
import {useField} from "../../hooks";
import {useHistory} from "react-router";
import {loginWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {checkIfPasswordIsTheSameAsConfirmPassword, staffChecker, userChecker} from "../../helpers/utils";

const ADD_USER = gql`
    mutation AddUser(
        $email:String!,
        $firstName:String!,
        $lastName:String!,
        $password:String!
    ){
        addUser(
            email: $email,
            firstName: $firstName,
            lastName: $lastName,
            password: $password
        ) {
            email
            firstName
        }
    }

`

const UserRegister = (props) => {
    const history = useHistory()
    const email = useField('email')
    const firstName = useField('text')
    const lastName = useField('text')
    const password = useField('password')
    const confirmPassword = useField('password')
    const [addUser] = useMutation(ADD_USER)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (checkIfPasswordIsTheSameAsConfirmPassword(password.value, confirmPassword.value)) {
            addUser({
                variables: {
                    email: email.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    password: password.value
                }
            }).then(result => {
                alert(`User ${result.data.addUser.email} registered.\nPlease log in in the next page`)
                history.push('/')
            }).catch(e => {
                alert(e)
                console.log(e)
            })

        }
    }

    const resetForm = () => {
        email.reset()
        firstName.reset()
        lastName.reset()
        password.reset()
        confirmPassword.reset()
    }

    staffChecker(props, history)
    userChecker(props, history)
    return (
        <Container>
            <h1>Register New User</h1>
            <Form onSubmit={handleSubmit} onReset={resetForm}>
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
                    <Form.Control required type={lastName.type} placeholder="Enter last name" value={lastName.value}
                                  onChange={lastName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password (*)</Form.Label>
                    <Form.Control required minlength="8" type={password.type} placeholder="Password"
                                  value={password.value}
                                  onChange={password.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password (*)</Form.Label>
                    <Form.Control required minlength="8" type={confirmPassword.type} placeholder="Password"
                                  value={confirmPassword.value}
                                  onChange={confirmPassword.onChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please choose a username.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Submit</Button>

                <Button variant="secondary" type="reset">
                    Reset
                </Button>
            </Form>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
const mapDispatchToProps = {
    loginWithoutCredential
}
const connectedUserRegister = connect(mapStateToProps, mapDispatchToProps)(UserRegister)

export default connectedUserRegister
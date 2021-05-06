import {Button, Container, Form} from "react-bootstrap";
import {useField, useNotification} from "../../hooks";
import {useHistory} from "react-router";
import {loginWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {checkIfPasswordIsTheSameAsConfirmPassword, staffChecker, userChecker} from "../../helpers/utils";
import {NotificationAlert, ReturnLanding} from "../Components";

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
    const notification = useNotification()
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
                notification.alertSuccess(`User ${result.data.addUser.email} registered.\nPlease log in in the next page`)
                setTimeout(() => {
                    history.push('/')
                }, 3000)
            }).catch(e => {
                console.log(e)
                notification.alertFailure(e.toString())
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
            <ReturnLanding/>
            <h1 className={"mt-2"}>Register New User</h1>
            <NotificationAlert success={notification.success} failure={notification.failure}
                               successText={notification.successText} failureText={notification.failureText}/>
            <Form onSubmit={handleSubmit} onReset={resetForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address (*)</Form.Label>
                    <Form.Control required type={email.type} placeholder="Enter your email" value={email.value}
                                  onChange={email.onChange}/>
                    <Form.Text>Email address must follow the format of xxx@xxx.</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name (*)</Form.Label>
                    <Form.Control required type={firstName.type} placeholder="Enter your first name"
                                  value={firstName.value}
                                  onChange={firstName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                    <Form.Label>Last Name (*)</Form.Label>
                    <Form.Control required type={lastName.type} placeholder="Enter your last name" value={lastName.value}
                                  onChange={lastName.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password (*)</Form.Label>
                    <Form.Control required minlength="8" type={password.type} placeholder="Enter your password"
                                  value={password.value}
                                  onChange={password.onChange}/>
                    <Form.Text>Password must be at least 8 characters.</Form.Text>

                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password (*)</Form.Label>
                    <Form.Control required minlength="8" type={confirmPassword.type} placeholder="Confirm your password"
                                  value={confirmPassword.value}
                                  onChange={confirmPassword.onChange}/>
                    <Form.Text>Password must be at least 8 characters at must match the password.</Form.Text>

                </Form.Group>
                <p>Already have an account? Click <a href={"login"}>here</a> to go to login page.</p>
                <p>(*) means the field is required</p>
                <div className={"float-right"}>
                    <Button className='ml-3 mb-3' variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button className='ml-3 mb-3' variant="secondary" type="reset">
                        Reset
                    </Button>
                </div>
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
import {Button, Container, Form} from "react-bootstrap";
import {useField} from "../../hooks";
import {useHistory} from "react-router";
import {loginWithoutCredential} from "../../reducers/loginReducer";
import {connect} from "react-redux";
import {checkIfPasswordIsTheSameAsConfirmPassword, requireStaff} from "../../helpers/utils";
import {useMutation} from "@apollo/client";
import {gql} from "@apollo/client/core";
import {ReturnStaff} from "../Components";

const ADD_STAFF = gql`
    mutation AddStaff(
        $email:String!,
        $firstName:String!,
        $lastName:String!,
        $password:String!
    ){
        addStaff(
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

const StaffRegister = (props) => {
    const history = useHistory()
    const email = useField('email')
    const firstName = useField('text')
    const lastName = useField('text')
    const password = useField('password')
    const confirmPassword = useField('password')
    const [addStaff] = useMutation(ADD_STAFF)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (checkIfPasswordIsTheSameAsConfirmPassword(password.value, confirmPassword.value)) {
            addStaff({
                variables: {
                    email: email.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    password: password.value
                }
            }).then(result => {
                alert(`Staff ${result.data.addStaff.email} registered.`)
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

    requireStaff(props, history)
    return (
        <div>
            <Container>
                <ReturnStaff/>
                <h1>Register New Staff</h1>
                <Form onSubmit={handleSubmit} onReset={resetForm}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type={email.type} placeholder="Enter email" value={email.value}
                                      onChange={email.onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type={firstName.type} placeholder="Enter first name"
                                      value={firstName.value}
                                      onChange={firstName.onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicSurname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type={lastName.type} placeholder="Enter last name" value={lastName.value}
                                      onChange={lastName.onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required minlength="8" type={password.type} placeholder="Password"
                                      value={password.value}
                                      onChange={password.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required minlength="8" type={confirmPassword.type} placeholder="Password"
                                      value={confirmPassword.value}
                                      onChange={confirmPassword.onChange}/>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                    <Button variant="secondary" type="reset">
                        Reset
                    </Button>
                </Form>
            </Container>
        </div>
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
const connectedStaffRegister = connect(mapStateToProps, mapDispatchToProps)(StaffRegister)

export default connectedStaffRegister
import {Link} from "react-router-dom";
import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router";
import {logInWithCredential, logoutWithoutCredential} from "../reducers/loginReducer";
import {connect} from "react-redux";
import {useField} from "../hooks";
import {clearToken, setUpToken} from "../helpers/utils";

const NavBar = (props) => {
    const history = useHistory()
    const email = useField('email', "user1@user.com")
    const password = useField('password', "passworduser11")
    const loginUser = (e) => {
        e.preventDefault()
        if (password.value.length < 8) {
            alert("Password length needs to be greater than 8 characters")
            return false
        }
        const option = {
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `email=${email.value}&password=${password.value}`
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
                    // document.cookie = `token= ${data.token}; Max-Age=1200`;
                    // localStorage.setItem('jwtToken', data.token)
                    setUpToken(data.token)
                    history.push('/user/home')
                }
            })
            .catch(e => {
                console.error(e)
                alert(e)
            })
        // history.push('/user/home')
        // props.loginWithoutCredential()
    }
    const logoutUser = (e) => {
        props.logoutWithoutCredential()
        clearToken()
        history.push('/')
    }
    console.log(props.login)
    return (
        <nav>
            <Container fluid>
                <Row>
                    <Col xs lg="2"> <Link to="/"><h1>Home</h1></Link> </Col>
                    <Col className="float-right">
                        {props.login.login
                            ? <Row className="float-right">
                                <p>Logged in, Welcome {props.login.user.user.firstName}</p>
                                <Button onClick={logoutUser}>Logout</Button>
                            </Row>
                            : <Form onSubmit={loginUser}>
                                <Form.Row className="float-right">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label column="sm">Email address</Form.Label>
                                        <Form.Control size="sm" required type={email.type} value={email.value}
                                                      onChange={email.onChange}/>
                                        {/*<Form.Text className="text-muted">*/}
                                        {/*    Currently mocked just click submit*/}
                                        {/*</Form.Text>*/}
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label column="sm">Password</Form.Label>
                                        <Form.Control size="sm" required type={password.type} value={password.value}
                                                      onChange={password.onChange}/>
                                    </Form.Group>
                                    {/*<Form.Group controlId="formBasicCheckbox">*/}
                                    {/*    <Form.Check type="checkbox" label="Check me out" />*/}
                                    {/*</Form.Group>*/}
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Row>
                            </Form>}

                    </Col>


                </Row>
            </Container>

        </nav>
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

const connectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default connectedNavBar
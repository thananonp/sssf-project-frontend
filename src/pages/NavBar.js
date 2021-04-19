import {Link} from "react-router-dom";
import React from "react";
import {Button, Col, Container, Form, Nav, Row} from "react-bootstrap";
import {useHistory} from "react-router";
import {logInWithCredential, logoutWithoutCredential} from "../reducers/loginReducer";
import {connect} from "react-redux";
import {useField} from "../hooks";
import {restLogin} from "../helpers/utils";

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
        restLogin('user/authenticate', option, history, props, '/user/home')

        // history.push('/user/home')
        // props.loginWithoutCredential()
    }
    const logoutUser = (e) => {
        props.logoutWithoutCredential(history)
    }

    const renderNav = () => {
        // console.log("renderNav")
        if (props.login.login) {
            console.log("logged in")
            if (props.login.user.type === 'user') {
                console.log("user")
                return (<>
                    <Nav.Item>
                        <Nav.Link href="/user/home">User Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/search">Search</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/user/setting">Setting</Nav.Link>
                    </Nav.Item>
                </>)
            } else if (props.login.user.type === 'staff') {
                console.log("user")
                return (<>
                    <Nav.Item>
                        <Nav.Link href="/staff/home">Staff Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/search">Search</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/book/borrow">Return/Borrow</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/user/manage">Manage user</Nav.Link>
                    </Nav.Item>
                </>)
            }
        } else {
            return (<Nav.Item>
                <Nav.Link href="/search">Search</Nav.Link>
            </Nav.Item>)
        }
    }
    // console.log(props.login)
    return (
        <Nav
            activeKey="/"
            className="singleRow"
            // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >

            <Container fluid>
                <Row className="singleRow">
                    <Col xs lg="2"> <Link to="/"><h3><span>📖Library</span></h3></Link> </Col>
                    {renderNav()}

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

        </Nav>
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
import {Link} from "react-router-dom";
import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router";
import {loginWithoutCredential, logoutWithoutCredential} from "../reducers/loginReducer";
import {connect} from "react-redux";

const NavBar = (props) => {
    const history = useHistory()
    const loginUser = (e) => {
        e.preventDefault()
        props.loginWithoutCredential()
        history.push('/user/home')
    }
    const logoutUser = (e) => {
        props.logoutWithoutCredential()
        history.push('/')
    }
    return (
        <nav>
            <Container fluid>
                <Row>
                    <Col> <Link to="/"><h1>Home</h1></Link>
                    </Col>
                    <Col>
                        <div className="float-right">
                            {props.login
                                ? <Row>
                                    <p>Logged in, Welcome Lilly</p>
                                    <Button onClick={logoutUser}>Logout</Button>
                                </Row>
                                : <Form onSubmit={loginUser}>
                                    <Row>
                                        <div>Email<input/></div>
                                        <div>Password<input type="password"/></div>
                                        <button type="submit">Login</button>
                                    </Row>
                                </Form>}
                        </div>
                    </Col>


                </Row>
            </Container>

        </nav>
    )
}

const mapDispatchToProps = {
    loginWithoutCredential, logoutWithoutCredential
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default connectedNavBar
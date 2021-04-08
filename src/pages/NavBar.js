import {Link} from "react-router-dom";
import React from "react";
import {Container, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router";
import {loginWithoutCredential} from "../reducers/loginReducer";
import {connect} from "react-redux";

const NavBar = (props) => {
    const history = useHistory()
    const loginStaff = (e) => {
        e.preventDefault()
        props.loginWithoutCredential()
        history.push('/user/home')
    }
    return (
        <nav>
            <Container fluid>
                <Row>
                    <Link to="/"><h1>Home</h1></Link>
                    {props.login
                        ? <p>Logged in</p>
                        : <Form onSubmit={loginStaff}>
                            <Row>
                                <div>Email<input/></div>
                                <div>Password<input type="password"/></div>
                                <button type="submit">Login</button>
                            </Row>
                        </Form>}
                </Row>
            </Container>

        </nav>
    )
}

const mapDispatchToProps = {
    loginWithoutCredential
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default connectedNavBar
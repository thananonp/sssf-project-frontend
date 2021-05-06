import React from "react";
import {Button, Form, Nav, Navbar, Row} from "react-bootstrap";
import {useHistory} from "react-router";
import {logInWithCredential, logoutWithoutCredential} from "../reducers/loginReducer";
import {connect} from "react-redux";
import {useField} from "../hooks";
import {login} from "../helpers/utils";
import {useLazyQuery} from "@apollo/client";
import {USER_LOGIN} from "../helpers/gql";
import {Link} from "react-router-dom";

const NavBar = (props) => {
    const history = useHistory()
    const email = useField('email')
    const password = useField('password')
    let [LoginUser] = useLazyQuery(USER_LOGIN, {
        onCompleted: (data) => {
            console.log(data)
            login(history, props, data)
        }, onError: (error) => {
            window.alert(error)
        }
    })

    const loginUser = (e) => {
        e.preventDefault()
        if (password.value.length < 8) {
            alert("Password length needs to be greater than 8 characters")
            return false
        }
        LoginUser({variables: {email: email.value, password: password.value}})

    }
    const logoutUser = (e) => {
        props.logoutWithoutCredential(history)
    }

    const renderNav = () => {
        // console.log("renderNav")
        if (props.login.login) {
            // console.log("logged in")
            if (props.login.user.type === 'user') {
                // console.log("user")
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
                // console.log("staff")
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
        <Navbar sticky="top" bg="light" expand="lg">
            <Navbar.Brand href="/">📖Library</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                    className="mr-auto"
                >
                    {renderNav()}
                </Nav>
                {props.login.login
                    ? <Row className={'mr-3'}>
                        <p className={'mx-3'}>Welcome {props.login.user.user.firstName}</p>
                        <Button variant={'outline-danger'} onClick={logoutUser}>Logout</Button>
                    </Row>
                    : <Form inline onSubmit={loginUser} >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label column="sm">User Email</Form.Label>
                                <Form.Control size="sm" required type={email.type} value={email.value}
                                              onChange={email.onChange} placeholder="Enter email"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label column="sm">Password</Form.Label>
                                <Form.Control size="sm" required type={password.type} value={password.value}
                                              onChange={password.onChange} placeholder="Enter password"/>
                            </Form.Group>
                            <Button className='float-right ml-3' variant={"outline-primary"} type="submit">
                                Login
                            </Button>
                            <Link to="/user/register"><Button variant="outline-secondary" className='m-2'>Register
                                here</Button></Link>

                        </Form>}
            </Navbar.Collapse>
        </Navbar>

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
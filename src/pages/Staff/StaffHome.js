import {
    Button,
    Card,
    CardDeck,
    Container,
    FormControl,
    InputGroup,
    ListGroup,
    ListGroupItem,
    Row
} from "react-bootstrap";
import {useHistory} from "react-router";
import React, {useState} from "react";
import {newSearchQuery} from "../../reducers/searchQueryReducer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logoutWithoutCredential} from "../../reducers/loginReducer";
import {requireStaff} from "../../helpers/utils";

const UserHome = (props) => {
    const [search, setSearch] = useState('')
    const history = useHistory()

    const logout = () => {
        props.logoutWithoutCredential(history)
    }

    const editStaff = () => {
        history.push('/staff/setting')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const toSearch = () => {
        props.newSearchQuery(search)
        history.push('/search')
    }

    const changePassword = () => {
        history.push('/staff/changepassword')
    }
    const editPreference = () => {
        history.push('/staff/editpreference')
    }
    const registerNewStaff = () => {
        history.push('/staff/register')
    }

    requireStaff(props, history)
    return (
        <Container>
            <h1 className={'mt-3'}>Staff</h1>
            {props.login.login ? <h2>Welcome {props.login.user.user.firstName}</h2> : null}
            <Row className='float-right mb-3'>
                <Button className='ml-3 mt-3' variant='outline-primary' onClick={registerNewStaff}>Staff
                    Register</Button>
                <Button className='ml-3 mt-3' variant='outline-primary' onClick={editPreference}>Edit
                    Preference</Button>
                <Button className='ml-3 mt-3' variant='outline-primary' onClick={changePassword}>Change
                    Password</Button>
                <Button className='ml-3 mt-3' variant='outline-primary' onClick={editStaff}>Setting</Button>
                <Button className='mx-3 mt-3' variant='outline-danger' onClick={logout}>Logout</Button>
            </Row>
            <InputGroup className="my-3">
                <FormControl
                    onChange={handleSearch}
                    placeholder="Search books, publishers and writers..."
                    aria-label="Search library"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button onClick={toSearch} variant="outline-secondary">Search</Button>
                </InputGroup.Append>
            </InputGroup>


            <CardDeck className='mb-3'>
                <Card>
                    <Card.Img className='imageBanner' variant="top"
                              src='https://images.unsplash.com/photo-1589998059171-988d887df646?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80'/>
                    <Card.Body>
                        <Card.Title>Books</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <Link to="/book/add"><ListGroupItem>Add</ListGroupItem></Link>
                        <Link to="/book/edit"><ListGroupItem>Manage</ListGroupItem></Link>
                    </ListGroup>
                </Card>


                <Card>
                    <Card.Img className='imageBanner' variant="top"
                              src="https://images.unsplash.com/photo-1508780709619-79562169bc64?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>Authors</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <Link to="/author/add"><ListGroupItem>Add</ListGroupItem></Link>
                        <Link to="/author/edit"><ListGroupItem>Manage</ListGroupItem></Link>
                    </ListGroup>
                </Card>


                <Card>
                    <Card.Img className='imageBanner' variant="top"
                              src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80'/>
                    <Card.Body>
                        <Card.Title>Publisher</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <Link to="/publisher/add"><ListGroupItem>Add</ListGroupItem></Link>
                        <Link to="/publisher/edit"><ListGroupItem>Manage</ListGroupItem></Link>
                    </ListGroup>
                </Card>
            </CardDeck>
            <CardDeck className='mb-3'>
                <Card>
                    <Card.Img className='imageBanner' variant="top"
                              src='https://images.unsplash.com/photo-1618141411216-96de9f2bd309?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'/>
                    <Card.Body>
                        <Card.Title>Category</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <Link to="/category/add"><ListGroupItem>Add</ListGroupItem></Link>
                        <Link to="/category/edit"><ListGroupItem>Manage</ListGroupItem></Link>
                    </ListGroup>
                </Card>


                <Card>
                    <Card.Img className='imageBanner' variant="top"
                              src='https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'/>
                    <Card.Body>
                        <Card.Title>User</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <Link to="/book/borrow"><ListGroupItem>Borrow</ListGroupItem></Link>
                        <Link to="/user/manage"><ListGroupItem>Manage</ListGroupItem></Link>
                    </ListGroup>
                </Card>


                <Card>
                    <Card.Img className='imageBanner' variant="top"
                              src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80'/>
                    <Card.Body>
                        <Card.Title>Staff</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <Link to="/publisher/add"><ListGroupItem>Add</ListGroupItem></Link>
                        <Link to="/publisher/edit"><ListGroupItem>Manage</ListGroupItem></Link>
                    </ListGroup>
                </Card>

            </CardDeck>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
const mapDispatchToProps =
    {
        newSearchQuery, logoutWithoutCredential
    }
const connectedUserHome = connect(mapStateToProps, mapDispatchToProps)(UserHome)

export default connectedUserHome
import {Button, Card, Container, FormControl, InputGroup, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import {useHistory} from "react-router";
import {useState} from "react";
import {newSearchQuery} from "../reducers/searchQueryReducer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const UserHome = (props) => {
    const [search, setSearch] = useState('')
    const history = useHistory()
    const logout = () => {
        history.push('/')
    }

    const editUser = () => {
        history.push('/user/setting')

    }

    const handleSearch = (e) => {
        // alert("Searching")
        // console.log(e.target.value)
        setSearch(e.target.value)

    }

    const toSearch = () => {
        alert(`search query ${search}`)
        props.newSearchQuery(search)
        history.push('/search')
    }
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    return (
        <div>
            <div>
                <h1>Staff</h1>
                <h2>Welcome Lilly</h2>
                <Button onClick={editUser}>Setting</Button>
                <Button onClick={logout}>Logout</Button>
            </div>

            <InputGroup className="mb-3">
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
            <Container>
                <Row>
                <Card style={{width: '18rem'}}>
                    <Card.Img variant="top" src='https://images.unsplash.com/photo-1589998059171-988d887df646?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80' />
                    <Card.Body>
                        <Card.Title>Books</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <Link to="/book/add"><ListGroupItem>Add</ListGroupItem></Link>
                        <Link to="/book/edit"><ListGroupItem>View, Edit and Delete</ListGroupItem></Link>
                    </ListGroup>
                </Card>
                <Card style={{width: '18rem'}}>
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1508780709619-79562169bc64?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                    <Card.Body>
                        <Card.Title>Authors</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <Link to="/author/add"><ListGroupItem>Add</ListGroupItem></Link>
                        <Link to="/author/edit"><ListGroupItem>View, Edit and Delete</ListGroupItem></Link>
                    </ListGroup>
                </Card>
                <Card style={{width: '18rem'}}>
                    <Card.Img variant="top" src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80' />
                    <Card.Body>
                        <Card.Title>Publisher</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <Link to="/publisher/add"><ListGroupItem>Add</ListGroupItem></Link>
                        <Link to="/publisher/edit"><ListGroupItem>View, Edit and Delete</ListGroupItem></Link>
                    </ListGroup>
                </Card>
                </Row>
            </Container>
        </div>
    )
}
const mapDispatchToProps = {
    newSearchQuery
}
const connectedUserHome = connect(null, mapDispatchToProps)(UserHome)

export default connectedUserHome
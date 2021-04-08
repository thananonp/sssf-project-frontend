import {connect} from "react-redux";
import {newSearchQuery, searchScope} from "../reducers/searchQueryReducer";
import {Button, Container, Form, FormControl, InputGroup, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

const Search = (props) => {
    const [search, setSearch] = useState('')
    const [scope, setScope] = useState('')
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const toSearch = () => {
        props.newSearchQuery(search)
        setSearch('')
    }

    const setScopeSearch = (e) => {
        props.searchScope(e.target.value)
    }

    return (
        <div>
            <Container fluid>
                <h1>Search</h1>
                <h5>Current search term: {props.searchQuery.query}</h5>
                <h5>Current search scope: {props.searchQuery.scope}</h5>
                <InputGroup className="mb-3">
                    <FormControl
                        onChange={handleSearch}
                        value={search}
                        placeholder="Search books, publishers and writers..."
                        aria-label="Search library"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button onClick={toSearch} variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustomSizeSm">

                        <Form.Control as="select" onChange={setScopeSearch}>
                            <option value='all'>Search everything</option>
                            <option value='title'>Title only</option>
                            <option value='author'>Author only</option>
                            <option value='publisher'>Publisher only</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <p>Found 2 search results</p>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td><Link to="/book/1">Twinkle Little Star</Link></td>
                        <td><Link to="/author/1">John Lennon</Link></td>
                        <td><Link to="/publisher/1">Mock1</Link></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><Link to="/book/2">Yski booki</Link></td>
                        <td><Link to="/author/2">Number one</Link></td>
                        <td><Link to="/publisher/2">Mock2</Link></td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
const mapDispatchToProps = {
    newSearchQuery, searchScope
}

const mapStateToProps = (state) => {
    return {
        searchQuery: state.searchQuery
    }
}

const connectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search)
export default connectedSearch
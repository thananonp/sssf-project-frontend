import {connect} from "react-redux";
import {newSearchQuery} from "../reducers/searchQueryReducer";
import {Button, Form, FormControl, InputGroup, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

const Search = (props) => {
    const [search, setSearch] = useState('')
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const toSearch = () => {
        props.newSearchQuery(search)
        setSearch('')
    }

    return (
        <div>
            <h1>Search</h1>
            <h3>Current search term: {props.searchQuery}</h3>
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
            <Form.Group>
                <Form.Control as="select">
                    <option>Search everything</option>
                    <option>Title only</option>
                    <option>Author only</option>
                    <option>Publisher only</option>
                </Form.Control>
            </Form.Group>
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

        </div>
    )
}
const mapDispatchToProps = {
    newSearchQuery
}

const mapStateToProps = (state) => {
    return {
        searchQuery: state.searchQuery
    }
}

const connectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search)
export default connectedSearch
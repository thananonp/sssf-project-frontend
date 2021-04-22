import {connect} from "react-redux";
import {newSearchQuery, searchScope} from "../reducers/searchQueryReducer";
import {Button, Container, Form, FormControl, InputGroup, Table} from "react-bootstrap";
import {useState} from "react";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import {LoadingSpinner} from "./ReturnStaff";

const SEARCHBOOKS = gql`
    query SearchBooks($query:String, $scope:String){
        searchBooks(
            query:$query,
            scope:$scope
        ){
            id
            title
            category{
                id
                title
            }
            author{
                id
                name
            }
            publisher{
                id
                name
            }
            dateOfPublication
            pageCount
            description
            borrowedBy{
                id
                firstName
            }
        }
    }
`

const Search = (props) => {
    const [search, setSearch] = useState('')
    const timeElapsed = Date.now();
    const {loading, error, data} = useQuery(SEARCHBOOKS, {
        variables: {
            query: props.searchQuery.query ? props.searchQuery.query : '',
            scope: props.searchQuery.scope
        }
    })

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

    console.log(data)
    if (loading) return (<LoadingSpinner/>);
    if (error) return <p>Error :( {error}</p>;
    return (
        <div>
            <Container>
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
                            {/*<option value='all'>Search everything</option>*/}
                            <option value='title'>Title only</option>
                            <option value='author'>Author only</option>
                            <option value='publisher'>Publisher only</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <p>Found {data.searchBooks.length} search results</p>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Date of Publication</th>
                        <th>Page Count</th>
                        <th>Availability</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.searchBooks.map((book, index) => {
                        // console.log(book)
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td><Link to={`/book/${book.id}`}>{book.title}</Link></td>
                                {book.category.title !== null ?
                                    <td><Link to={`/category/${book.category.id}`}>{book.category.title}</Link></td> :
                                    <td>No category defined</td>}
                                {book.author !== null ?
                                    <td><Link to={`/author/${book.author.id}`}>{book.author.name}</Link></td> :
                                    <td>No author defined</td>}
                                {book.publisher.name !== null ?
                                    <td><Link to={`/publisher/${book.publisher.id}`}>{book.publisher.name}</Link></td> :
                                    <td>No publisher defined</td>}
                                <td>{book.dateOfPublication}</td>
                                <td>{book.pageCount}</td>
                                {book.borrowedBy ? <td>No</td> : <td>Yes</td>}
                            </tr>
                        )
                    })}
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
import {connect} from "react-redux";
import {newSearchQuery, searchScope} from "../reducers/searchQueryReducer";
import {Button, Container, Dropdown, Form, FormControl, InputGroup, Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import {ErrorMessage, LoadingSpinner} from "./Components";
import {useField} from "../hooks";

const SEARCHBOOKS = gql`
    query SearchBooks($query:String, $scope:String, $limit:Int, $skip:Int){
        countBookSearch(
            query:$query,
            scope:$scope,
        )
        searchBooks(
            query:$query,
            scope:$scope,
            limit:$limit,
            skip:$skip
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
    const limit = useField(null, 10)
    let active = useField(null, 1)
    const [search, setSearch] = useState('')
    const {loading, error, data} = useQuery(SEARCHBOOKS, {
        variables: {
            query: props.searchQuery.query ? props.searchQuery.query : '',
            scope: props.searchQuery.scope,
            limit: Number(limit.value),
            skip: Number(active.value-1)*10
        }
    })


    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const toSearch = () => {
        props.newSearchQuery(search)
        setSearch('')
        active.setValue(1)
    }

    const setScopeSearch = (e) => {
        props.searchScope(e.target.value)
    }

    if (loading) return (<LoadingSpinner/>);
    if (error) return <ErrorMessage error={error}/>

    let items = [];
    for (let number = 1; number <= (data.countBookSearch/limit.value)+1; number++) {
        if (number === active.value) {
            items.push(
                <Pagination.Item key={number} active={true}>
                    {number}
                </Pagination.Item>,
            );
        } else {
            items.push(
                <Pagination.Item onClick={active.onClick} key={number} active={false}>
                    {number}
                </Pagination.Item>,
            );
        }
    }
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

                <p>Found {data.countBookSearch} search results</p>
                <Dropdown className={"float-left"}>
                    Show
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                        {limit.value}
                    </Dropdown.Toggle>
                    entries


                    <Dropdown.Menu>
                        <Dropdown.Header>Select the numbers of entries</Dropdown.Header>
                        <Dropdown.Item onClick={limit.onClick}>10</Dropdown.Item>
                        <Dropdown.Item onClick={limit.onClick}>25</Dropdown.Item>
                        <Dropdown.Item onClick={limit.onClick}>50</Dropdown.Item>
                        <Dropdown.Item onClick={limit.onClick}>100</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Pagination className={"float-right"}>
                    {items}
                </Pagination>
                <br/>

                <Table responsive striped bordered hover>
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
                                <td>{(active.value-1) * 10 + index + 1}</td>
                                <td><Link to={`/book/${book.id}`}>{book.title}</Link></td>
                                {book.category !== null ?
                                    <td><Link to={`/category/${book.category.id}`}>{book.category.title}</Link></td> :
                                    <td>No category defined</td>}
                                {book.author !== null ?
                                    <td><Link to={`/author/${book.author.id}`}>{book.author.name}</Link></td> :
                                    <td>No author defined</td>}
                                {book.publisher !== null ?
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
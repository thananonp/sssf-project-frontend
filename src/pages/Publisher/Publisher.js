import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {LoadingSpinner} from "../ReturnStaff";
import {Container, ListGroup} from "react-bootstrap";

const PUBLISHER = gql`
    query Publisher($id:ID!){
        publisher(id: $id) {
            id
            name
            description
        }
        books (publisher : $id){
    id
    title
    author{
        id
        name
    }
  }
    }
`

const Publisher = (props) => {
    const id = useParams().id
    const {loading, error, data} = useQuery(PUBLISHER, {variables: {id}})
    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error :( {error}</p>;
    return (
        <Container>
            <h1>Publisher: {data.publisher.name}</h1>
            <p>{data.publisher.description}</p>
            <h5>List of books by this Publisher</h5>
            <ListGroup>
                {data.books.length ? data.books.map((book, index) => {
                    return (
                        <ListGroup.Item>{book.title + ' by ' + book.author.name}</ListGroup.Item>
                    )
                }) : <ListGroup.Item>No book in this category yet.</ListGroup.Item>}
            </ListGroup>
        </Container>
    )
}

export default Publisher
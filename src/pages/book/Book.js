import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {Container, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LoadingSpinner} from "../Components";

const BOOK = gql`
    query Book($id: ID!){
        book(id: $id) {
            id
            title
            category {
                id
                title
            }
            author {
                id
                name
            }
            publisher {
                id
                name
            }
            dateOfPublication
            pageCount
            description
            borrowedBy {
                id
                firstName
            }
            imageUrl
        }
    }
`

const Book = () => {
    const id = useParams().id
    const {loading, error, data} = useQuery(BOOK, {variables: {id}})
    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error :( {error}</p>;
    console.log("data", data)
    return (
        <Container>
            <img className="profileImage" src={data.book.imageUrl}/>
            <h1>{data.book.title}</h1>
            <br/>
            <p>{data.book.description}</p>
            <ListGroup>
                <ListGroup.Item>Category<span
                    className="float-right"><Link to={`/category/${data.book.category.id}`}> {data.book.category.title} </Link></span>
                </ListGroup.Item>
                <ListGroup.Item>Written by<span
                    className="float-right"><Link to={`/author/${data.book.author.id}`}> {data.book.author.name} </Link></span>
                </ListGroup.Item>
                <ListGroup.Item>Published by<span
                    className="float-right"><Link to={`/author/${data.book.publisher.id}`}> {data.book.publisher.name} </Link></span>
                </ListGroup.Item>
                <ListGroup.Item>Date of Publication <span
                    className="float-right">{data.book.dateOfPublication}</span>
                </ListGroup.Item>
                <ListGroup.Item>Page count <span className="float-right">{data.book.pageCount}</span></ListGroup.Item>
                <ListGroup.Item>Availability <span
                    className="float-right">{data.book.borrowedBy ? <td>No</td> : <td>Yes</td>}</span>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default Book
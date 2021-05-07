import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {Container, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ErrorMessage, LoadingSpinner} from "../Components";
import React from "react";

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


    if (loading) return (<LoadingSpinner/>);
    if (error) return <ErrorMessage error={error}/>
    return (
        <Container>
            <img alt="Profile" className="profileImage" src={data.book.imageUrl}/>
            <h1 className='mt-3'>{data.book.title}</h1>
            <br/>
            <p>{data.book.description}</p>
            <ListGroup className='mb-3'>
                <ListGroup.Item>Category<span
                    className="float-right">
                    {data.book.category
                        ? <Link to={`/category/${data.book.category.id}`}> {data.book.category.title} </Link>
                        : "Deleted category"
                    }
                    </span>
                </ListGroup.Item>
                <ListGroup.Item>Written by<span
                    className="float-right">
                    {data.book.author
                        ? <Link to={`/author/${data.book.author.id}`}> {data.book.author.name} </Link>
                        : "Deleted author"
                    }
                </span>
                </ListGroup.Item>
                <ListGroup.Item>Published by<span
                    className="float-right">
                    {data.book.publisher
                        ? <Link to={`/publisher/${data.book.publisher.id}`}> {data.book.publisher.name} </Link>
                        : "Deleted publisher"
                    }
                </span>
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
import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {ErrorMessage, LoadingSpinner} from "../Components";
import {Container, ListGroup} from "react-bootstrap";
import React from "react";

const PUBLISHER = gql`
    query Publisher($id:ID!){
        publisher(id: $id) {
            id
            name
            description
            imageUrl
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

    if (loading) return (<LoadingSpinner/>);
    if (error) return <ErrorMessage error={error}/>
    return (
        <Container>
            <img alt="Profile" className="profileImage" src={data.publisher.imageUrl}/>
            <h1 className='mt-3'>Publisher: {data.publisher.name}</h1>
            <p>{data.publisher.description}</p>
            <h5>List of books by this Publisher</h5>
            <ListGroup className='mb-3'>
                {data.books.length ? data.books.map((book, index) => {
                    if (book.author) {
                        return <ListGroup.Item><a href={`/book/${book.id}`}>{book.title}</a> by <a href={`/author/${book.author.id}`}>{book.author.name}</a></ListGroup.Item>
                    } else {
                        return (
                            <ListGroup.Item>{book.title + ' by deleted author'}</ListGroup.Item>
                        )
                    }
                }) : <ListGroup.Item>No book in this category yet.</ListGroup.Item>}
            </ListGroup>
        </Container>
    )
}

export default Publisher
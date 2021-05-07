import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {ErrorMessage, LoadingSpinner} from "../Components";
import {Container, ListGroup} from "react-bootstrap";
import React from "react";

const AUTHOR = gql`
    query Author($id:ID!){
        author(id: $id) {
            id
            name
            biography
            imageUrl
        }
        
        books (author : $id){
            id
            title
            publisher{
                id
                name
            }
        }
    }
`

const Author = () => {
    const id = useParams().id
    const {loading, error, data} = useQuery(AUTHOR, {variables: {id}})

    if (loading) return (<LoadingSpinner/>);
    if (error) return <ErrorMessage error={error}/>
    return (
        <Container>
            <img alt="Profile" className="profileImage" src={data.author.imageUrl}/>
            <h1 className='mt-3'>Author: {data.author.name}</h1>
            <h5>List of books in by this author</h5>
            <ListGroup className='mb-3'>
                {data.books.length ? data.books.map((book, index) => {
                    if(book.publisher){
                        return (
                            <ListGroup.Item><a href={`/book/${book.id}`}>{book.title}</a> published by <a href={`/publisher/${book.publisher.id}`}>{book.publisher.name}</a></ListGroup.Item>
                        )
                    }else {
                        return (
                            <ListGroup.Item>{book.title + ' published by deleted publisher'}</ListGroup.Item>
                        )
                    }
                }) : <ListGroup.Item>No book by this author yet.</ListGroup.Item>}
            </ListGroup>
        </Container>
    )
}

export default Author
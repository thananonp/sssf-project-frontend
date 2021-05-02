import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {ErrorMessage, LoadingSpinner} from "../Components";
import {Container, ListGroup} from "react-bootstrap";
import React from "react";

const CATEGORY = gql`
    query Category($id:ID!){
        category(id: $id) {
            id
            title
            imageUrl
        }
        books (category : $id){
            id
            title
            category{
                title
            }
            author{
                name
            }
        }
    }
`

const Category = (props) => {
    const id = useParams().id
    const {loading, error, data} = useQuery(CATEGORY, {variables: {id}})

    if (loading) return (<LoadingSpinner/>);
    if (error) return <ErrorMessage error={error}/>
    return (
        <Container>
            <img alt="Profile" className="profileImage" src={data.category.imageUrl}/>
            <h1>Category: {data.category.title}</h1>
            <h5>List of books in this category</h5>
            <ListGroup>
                {data.books.length ? data.books.map((book, index) => {
                    if (book.author) {
                        return <ListGroup.Item>{book.title + ' by ' + book.author.name}</ListGroup.Item>

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

export default Category
import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {LoadingSpinner} from "../Components";
import {Container, ListGroup} from "react-bootstrap";

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

    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error :( {error}</p>;
    console.log(data)
    return (
        <Container>
            <img className="profileImage" src={data.category.imageUrl}/>
            <h1>Category: {data.category.title}</h1>
            <h5>List of books in this category</h5>
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

export default Category
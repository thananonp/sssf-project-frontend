import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {LoadingSpinner} from "../ReturnStaff";
import {Container} from "react-bootstrap";

const AUTHOR = gql`
    query Author($id:ID!){
        author(id: $id) {
            id
            name
            biography
        }
    }
`

const Author = () => {
    const id = useParams().id
    const {loading, error, data} = useQuery(AUTHOR, {variables: {id}})
    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error :( {error}</p>;
    return (
        <Container>
            <h1>{data.author.name}</h1>
            <br/>
            <p>{data.author.biography}</p>
        </Container>
    )
}

export default Author
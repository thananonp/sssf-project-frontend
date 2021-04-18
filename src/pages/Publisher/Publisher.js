import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {LoadingSpinner} from "../ReturnStaff";
import {Container} from "react-bootstrap";

const PUBLISHER = gql`
    query Publisher($id:ID!){
        publisher(id: $id) {
            id
            name
            description
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
            <h1>{data.publisher.name}</h1>
            <br/>
            <p>{data.publisher.description}</p>
        </Container>
    )
}

export default Publisher
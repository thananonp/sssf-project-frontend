import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {LoadingSpinner} from "../ReturnStaff";
import {Container} from "react-bootstrap";

const CATEGORY = gql`
    query Category($id:ID!){
        category(id: $id) {
            id
            title
        }
    }
`

const Category = (props) => {
    const id = useParams().id
    const {loading, error, data} = useQuery(CATEGORY, {variables: {id}})

    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error :( {error}</p>;
    return (
        <Container>
            <h1>{data.category.title}</h1>
        </Container>
    )
}

export default Category
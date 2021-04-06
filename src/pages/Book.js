import {useParams} from "react-router";

const Book = (props) => {
    const id = useParams().id
    return(
        <div>
            <h1>Book {id}</h1>
            <p>Lorem ipsum dolor sit amet</p>
        </div>
    )
}

export default Book
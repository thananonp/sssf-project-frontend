import {useParams} from "react-router";

const Author = (props) => {
    const id = useParams().id
    return(
        <div>
            <h1>Author {id}</h1>
            <p>Lorem ipsum dolor sit amet</p>
        </div>
    )
}

export default Author
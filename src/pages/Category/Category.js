import {useParams} from "react-router";

const Category = (props) => {
    const id = useParams().id
    return (
        <div>
            <h1>Category {id}</h1>
            <p>Lorem ipsum dolor sit amet</p>
        </div>
    )
}

export default Category
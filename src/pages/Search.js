import {connect} from "react-redux";
import {newSearchQuery} from "../reducers/searchQueryReducer";

const Search = (props) => {

    return (
        <div>
            <h1>Search... </h1>
            <p>{props.searchQuery}</p>
        </div>
    )
}
const mapDispatchToProps = {
    newSearchQuery
}

const mapStateToProps = (state) => {
    return {
        searchQuery: state.searchQuery
    }
}

const connectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search)
export default connectedSearch
import searchQueryReducer from "../reducers/searchQueryReducer";
import searchResultReducer from "../reducers/searchResultReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware, combineReducers, createStore} from "redux";

const reducer = combineReducers({
    searchQuery: searchQueryReducer,
    searchResult: searchResultReducer
})

const store = createStore(reducer,composeWithDevTools(
    applyMiddleware(thunk)
))
export default store
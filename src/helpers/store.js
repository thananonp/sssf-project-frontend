import searchQueryReducer from "../reducers/searchQueryReducer";
import searchResultReducer from "../reducers/searchResultReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "../reducers/loginReducer";

const reducer = combineReducers({
    searchQuery: searchQueryReducer,
    searchResult: searchResultReducer,
    login: loginReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))
export default store
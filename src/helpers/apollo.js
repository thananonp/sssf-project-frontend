import {ApolloClient, InMemoryCache} from '@apollo/client';
import {createUploadLink} from "apollo-upload-client";
import {setContext} from "@apollo/client/link/context";
import {getToken} from "./utils";

const link = createUploadLink({
    // credentials: 'include'
    uri: process.env.REACT_APP_BACKEND_GRAPHQL_URL,
    // uri:"https://thananonp-test.jelastic.metropolia.fi/graphql"
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = getToken()
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    // uri: process.env.REACT_APP_BACKEND_GRAPHQL_URL,
    link: authLink.concat(link),
    cache: new InMemoryCache(),
});


export default client
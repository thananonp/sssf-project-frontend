import {ApolloClient, InMemoryCache} from '@apollo/client';

console.log(process.env.REACT_APP_BACKEND_GRAPHQL_URL)
const client = new ApolloClient({
    uri: process.env.REACT_APP_BACKEND_GRAPHQL_URL,
    cache: new InMemoryCache()
});

export default client
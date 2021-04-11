import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import {Provider} from 'react-redux'
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './helpers/store'

import 'bootstrap/dist/css/bootstrap.min.css';
import client from "./helpers/apollo";
import {ApolloProvider, gql} from '@apollo/client';

client
.query({
    query: gql`
        query{
            staffs{
                id
                firstName
            }
        }
        `
})
.then(result => console.log("CLIENT",result)).catch(e => console.error(e));

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter> </ApolloProvider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

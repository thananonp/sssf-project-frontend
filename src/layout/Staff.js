import React, {Component} from "react";
import {Route, Switch, useRouteMatch} from "react-router";
import {Link, useParams} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export function Staffs() {
    let {path, url} = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${url}/register`}>Register</Link>
                </li>
                <li>
                    <Link to={`${url}/login`}>Login</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route path={`${path}/:topicId`}>
                    <Topic/>
                </Route>
            </Switch>
        </div>
    )
}

export function Topic() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let {topicId} = useParams();
    if(topicId === "register"){
        return (
            <div>
                <Register/>
            </div>
        );
    }if(topicId === "login"){
        return (
            <div>
                <Login/>
            </div>
        );
    }


}
import React, {Component} from "react";
import {Route, Switch, useRouteMatch} from "react-router";
import {Link, useParams} from "react-router-dom";

// export default class Staff extends Component {
//     render() {
//         return (
//             Staffs()
//         )
//     }
// }


export function Staffs() {
    let {path, url} = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${url}/props-v-state`}>Props v. State</Link>
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

    return (
        <div>
            <h3>{topicId}</h3>
        </div>
    );
}
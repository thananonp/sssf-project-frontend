import logo from './logo.svg';
import './App.css';
import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import StaffLogin from "./pages/StaffLogin";
import Landing from "./pages/Landing";
import UserHome from "./pages/UserHome";
import Search from "./pages/Search";
import Book from "./pages/Book";
import Author from "./pages/Author";
import Publisher from "./pages/Publisher";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/staff">Staff</Link>
                        </li>
                        <li>
                            <Link to="/user">Users</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/book/:id">
                        <Book/>
                    </Route>

                    <Route path="/author/:id">
                        <Author/>
                    </Route>

                    <Route path="/publisher/:id">
                        <Publisher/>
                    </Route>

                    <Route path="/staff">
                        <StaffLogin/>
                    </Route>

                    <Route path="/user/home">
                        <UserHome/>
                    </Route>

                    <Route path="/user">
                        <UserLogin/>
                    </Route>
                    <Route path="/search">
                        <Search/>
                    </Route>


                    <Route path="/">
                        <Landing/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

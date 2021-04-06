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
import UserSetting from "./pages/UserSetting";
import StaffHome from "./pages/StaffHome";
import BookAdd from "./pages/BookAdd";
import AuthorAdd from "./pages/AuthorAdd";
import PublisherAdd from "./pages/PublisherAdd";
import AuthorEdit from "./pages/AuthorEdit";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>

                    {/*<ul>*/}
                    {/*    <li>*/}
                    {/*        <Link to="/">Home</Link>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <Link to="/staff">Staff</Link>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <Link to="/user">Users</Link>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </nav>

                <Switch>
                    <Route path="/book/add">
                        <BookAdd/>
                    </Route>

                    <Route path="/book/:id">
                        <Book/>
                    </Route>

                    <Route path="/author/add">
                        <AuthorAdd/>
                    </Route>

                    <Route path="/author/edit">
                        <AuthorEdit/>
                    </Route>

                    <Route path="/author/:id">
                        <Author/>
                    </Route>

                    <Route path="/publisher/add">
                        <PublisherAdd/>
                    </Route>

                    <Route path="/publisher/:id">
                        <Publisher/>
                    </Route>

                    <Route path="/staff/home">
                        <StaffHome/>
                    </Route>

                    <Route path="/staff/setting">
                        <UserSetting/>
                    </Route>

                    <Route path="/staff">
                        <StaffLogin/>
                    </Route>

                    <Route path="/user/home">
                        <UserHome/>
                    </Route>
                    <Route path="/user/setting">
                        <UserSetting/>
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

import logo from './logo.svg';
import './App.css';
import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import UserLogin from "./pages/User/UserLogin";
import StaffLogin from "./pages/Staff/StaffLogin";
import Landing from "./pages/Landing";
import UserHome from "./pages/User/UserHome";
import Search from "./pages/Search";
import Book from "./pages/book/Book";
import Author from "./pages/author/Author";
import Publisher from "./pages/Publisher/Publisher";
import UserSetting from "./pages/User/UserSetting";
import StaffHome from "./pages/Staff/StaffHome";
import BookAdd from "./pages/book/BookAdd";
import AuthorAdd from "./pages/author/AuthorAdd";
import PublisherAdd from "./pages/Publisher/PublisherAdd";
import AuthorEdit from "./pages/author/AuthorEdit";
import BookEdit from "./pages/book/BookEdit";
import PublisherEdit from "./pages/Publisher/PublisherEdit";
import StaffSetting from "./pages/Staff/StaffSetting";
import UserManage from "./pages/User/UserManage";
import StaffRegister from "./pages/Staff/StaffRegister";
import UserRegister from "./pages/User/UserRegister";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/"><h1>Home</h1></Link>

                </nav>

                <Switch>
                    <Route path="/book/add">
                        <BookAdd/>
                    </Route>
                    <Route path="/book/edit">
                        <BookEdit/>
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

                    <Route path="/publisher/edit">
                        <PublisherEdit/>
                    </Route>

                    <Route path="/publisher/add">
                        <PublisherAdd/>
                    </Route>

                    <Route path="/publisher/:id">
                        <Publisher/>
                    </Route>

                    <Route path="/staff/register">
                        <StaffRegister/>
                    </Route>

                    <Route path="/staff/home">
                        <StaffHome/>
                    </Route>

                    <Route path="/staff/setting">
                        <StaffSetting/>
                    </Route>

                    <Route path="/staff">
                        <StaffLogin/>
                    </Route>

                    <Route path="/user/register">
                        <UserRegister/>
                    </Route>
                    <Route path="/user/manage">
                        <UserManage/>
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

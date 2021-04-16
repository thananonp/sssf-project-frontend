import './App.css';
import React from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
import NavBar from "./pages/NavBar";
import Category from "./pages/Category/Category";
import CategoryEdit from "./pages/Category/CategoryEdit";
import CategoryAdd from "./pages/Category/CategoryAdd";
import {logInWithCredential, loginWithoutCredential, logoutWithoutCredential} from "./reducers/loginReducer";
import {connect} from "react-redux";
import UserChangePassword from "./pages/User/UserChangePassword";
import StaffChangePassword from "./pages/Staff/StaffChangePassword";

function App(props) {
    function getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const jwtCookie = getCookie("token")
    if (jwtCookie) {
        props.logInWithCredential(jwtCookie)

    }


    return (
        <Router>
            <div>
                <NavBar/>

                <Switch>
                    {/*Book*/}
                    <Route path="/book/add">
                        <BookAdd/>
                    </Route>

                    <Route path="/book/edit">
                        <BookEdit/>
                    </Route>

                    <Route path="/book/:id">
                        <Book/>
                    </Route>

                    {/*Author*/}
                    <Route path="/author/add">
                        <AuthorAdd/>
                    </Route>

                    <Route path="/author/edit">
                        <AuthorEdit/>
                    </Route>

                    <Route path="/author/:id">
                        <Author/>
                    </Route>

                    {/*Category*/}
                    <Route path="/category/edit">
                        <CategoryEdit/>
                    </Route>

                    <Route path="/category/add">
                        <CategoryAdd/>
                    </Route>

                    <Route path="/category/:id">
                        <Category/>
                    </Route>
                    {/*Publisher*/}
                    <Route path="/publisher/edit">
                        <PublisherEdit/>
                    </Route>

                    <Route path="/publisher/add">
                        <PublisherAdd/>
                    </Route>

                    <Route path="/publisher/:id">
                        <Publisher/>
                    </Route>

                    {/*Staff*/}
                    <Route path="/staff/changepassword">
                        <StaffChangePassword/>
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

                    {/*User*/}
                    <Route path="/user/changepassword">
                        <UserChangePassword/>
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

                    {/*Common*/}
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


const mapDispatchToProps = {
    logInWithCredential, loginWithoutCredential, logoutWithoutCredential
}
const connectedApp = connect(null, mapDispatchToProps)(App)

export default connectedApp

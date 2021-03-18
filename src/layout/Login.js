import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {url} from "../url.json"
import {Redirect} from "react-router";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    checkIfComplete = () => {
        if (this.state.complete) {
            return <Redirect to="/admin/dashboard"/>;
        }
    }

    handleEmail(event) {
        this.setState({email: event.target.value})
    }

    handlePassword(event) {
        this.setState({password: event.target.value})
    }

    handleLoginSubmit() {
        // var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // console.log("Email", this.state.emailLogin);
        // console.log("Password", this.state.passwordLogin);
        // re.test(this.state.emailLogin) === false
        //     ? this.setState({
        //         emailErrorLogin: (
        //             <small className="text-danger">
        //                 Email is required and format should be <i>john@doe.com</i>.
        //             </small>
        //         ),
        //     })
        //     : this.setState({emailErrorLogin: null});
        // this.state.passwordLogin.length < 6
        //     ? this.setState({
        //         passwordErrorLogin: (
        //             <small className="text-danger">
        //                 You must enter a password of at least 6 characters.
        //             </small>
        //         ),
        //     })
        //     : this.setState({passwordErrorLogin: null});
        //

        if (
            // re.test(this.state.emailLogin) !== false &&
            this.state.password.length >= 6
        ) {
            let urlA = url + "staff/authenticate"
            let requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                }),
                // body: {
                //     "email": this.state.email,
                //     "password": this.state.password,
                // }
            };
            fetch(urlA, requestOptions)
                .then((response) => response.json())
                .then((response) => {
                    if (response.error !== undefined) {
                        throw response.error
                    } else {
                        sessionStorage.setItem("token", response.token);
                        this.setState({complete: true});
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }

    render() {
        return (
            <form>
                {this.checkIfComplete()}
                {/*<form action="http://localhost:3000/staff/authenticate" method="POST">*/}
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" text="thananonpongsuwan@gmail.com"
                           onChange={event => this.handleEmail(event)}
                           className="form-control" placeholder="Enter email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={event => this.handlePassword(event)}
                           className="form-control" placeholder="Enter password"/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                {/*<button type="submit" className="btn btn-primary btn-block">Submit</button>*/}
                <Button onClick={() => this.handleLoginSubmit()} className="btn btn-primary btn-block">Submit</Button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}


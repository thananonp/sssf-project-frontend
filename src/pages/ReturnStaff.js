import {Link} from "react-router-dom";
import React from "react";
import {Alert, Spinner} from "react-bootstrap";

export const ReturnStaff = () => {
    return (
        <div>
            <Link to='/staff/home'><p> ← Back to staff</p></Link>
        </div>
    )
}

export const ReturnUser = () => {
    return (
        <div>
            <Link to='/user/home'><p> ← Back to user</p></Link>
        </div>
    )
}

export const LoadingSpinner = () => {
    return (
        <div>
            <Spinner className={"centered"} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>)
}

export const NotificationAlert = ({success, failure, successText, failureText}) => {
    return (<div>
        <Alert show={success} variant="success">
            {successText}
        </Alert>
        <Alert show={failure} variant="danger">
            {failureText}
        </Alert>
    </div>)
}

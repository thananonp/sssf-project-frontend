import {Link} from "react-router-dom";
import React from "react";

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

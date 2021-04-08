import {Link} from "react-router-dom";
import React from "react";

const ReturnStaff = () => {
    return(
        <div>
            <Link to='/staff/home'><p> ← Back to staff</p></Link>
        </div>
    )
}

export default ReturnStaff
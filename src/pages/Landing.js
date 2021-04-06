import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const Landing = () => {
    return (
        <div>
            <h1>Welcome to library system</h1>
            <Link to="/staff"><Button>Staff login</Button></Link>
            <Link to="/user"><Button>User login</Button></Link>

        </div>
    )
}

export default Landing
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const Landing = () => {
    return (
        <div>
            <p>Welcome to library system</p>
            <Link to="/staff"><Button>Staff login</Button></Link>
            <Link to="/user"><Button>User login</Button></Link>

        </div>
    )
}

export default Landing
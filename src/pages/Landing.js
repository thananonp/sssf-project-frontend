import {Link} from "react-router-dom";
import {Button, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useField} from "../hooks";
import {newSearchQuery} from "../reducers/searchQueryReducer";
import {useHistory} from "react-router";
import {connect} from "react-redux";

const Landing = (props) => {
    const search = useField('text')
    const history = useHistory()

    const toSearch = () => {
        alert(`search query ${search.value}`)
        props.newSearchQuery(search.value)
        history.push('/search')
    }
    return (
        <div>

            <Container>
                <h1>Welcome to library system</h1>
                <InputGroup className="mb-3">
                    <FormControl
                        onChange={search.onChange}
                        value={search.value}
                        placeholder="Search books, publishers and writers..."
                        aria-label="Search library"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button onClick={toSearch} variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Row>
                    <Link to="/staff"><Button>Staff login</Button></Link>
                    <Link to="/user"><Button>User login</Button></Link>
                    <Link to="/staff/register"><Button>Staff Register</Button></Link>
                    <Link to="/user/register"><Button>User register</Button></Link>
                </Row>
                <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"/>

            </Container>

        </div>
    )
}

const mapDispatchToProps = {
    newSearchQuery
}
const connectedLanding = connect(null, mapDispatchToProps)(Landing)

export default connectedLanding

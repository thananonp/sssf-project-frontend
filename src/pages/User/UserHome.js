import {Button, FormControl, InputGroup, Table} from "react-bootstrap";
import {useHistory} from "react-router";
import {useState} from "react";
import {newSearchQuery} from "../../reducers/searchQueryReducer";
import {connect} from "react-redux";

const UserHome = (props) => {
    const [search, setSearch] = useState('')
    const history = useHistory()
    const logout = () => {
        history.push('/')
    }

    const editUser = () => {
        history.push('/user/setting')

    }

    const handleSearch = (e) => {
        // alert("Searching")
        // console.log(e.target.value)
        setSearch(e.target.value)

    }

    const toSearch = () => {
        alert(`search query ${search}`)
        props.newSearchQuery(search)
        history.push('/search')
    }
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    return (
        <div>
            <div>
                <h1>Welcome John</h1>
                <Button onClick={editUser}>Setting</Button>
                <Button onClick={logout}>Logout</Button>
            </div>

            <h3>Currently Borrowed Book</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Due Date</th>
                    <th>Fine</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Twinkle Little Star</td>
                    <td>John Lennon</td>
                    <td>{date.toDateString()}</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Yski booki</td>
                    <td>Number one</td>
                    <td>{date.toDateString()}</td>
                    <td>$ 12</td>
                </tr>
                </tbody>
            </Table>

            <InputGroup className="mb-3">
                <FormControl
                    onChange={handleSearch}
                    placeholder="Search books, publishers and writers..."
                    aria-label="Search library"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button onClick={toSearch} variant="outline-secondary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}
const mapDispatchToProps = {
    newSearchQuery
}
const connectedUserHome = connect(null, mapDispatchToProps)(UserHome)

export default connectedUserHome
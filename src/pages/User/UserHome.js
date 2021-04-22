import {Button, Col, Container, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import {useHistory} from "react-router";
import {useState} from "react";
import {newSearchQuery} from "../../reducers/searchQueryReducer";
import {logoutWithoutCredential} from "../../reducers/loginReducer"
import {connect} from "react-redux";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {requireUser} from "../../helpers/utils";
import {Link} from "react-router-dom";
import {LoadingSpinner} from "../ReturnStaff";

const USER = gql`
    query User($id:ID!){
        user(id:$id){
            currentlyBorrowed{
                id
                title
                author{
                    id
                    name
                }
                dateOfBorrow
            }

        }
    }
`

const UserHome = (props) => {
    const [search, setSearch] = useState('')
    const history = useHistory()
    const {loading, error, data} = useQuery(USER, {variables: {id: props.login.login? props.login.user.user._id: null}})
    const logout = () => {
        props.logoutWithoutCredential(history)
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
        // alert(`search query ${search}`)
        props.newSearchQuery(search)
        history.push('/search')
    }
    const changePassword = () => {
        history.push('/user/changepassword')
    }

    console.log("data", data)
    requireUser(props,history)
    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error :( {error}</p>;
    return (
        <Container>
            <Row>
                <Col><h2>Welcome {props.login.user.user.firstName}</h2>
                </Col>
                <Col>
                    <div className="float-right">
                        <Button onClick={changePassword}>Change Password</Button>
                        <Button onClick={editUser}>Setting</Button>
                        <Button onClick={logout}>Logout</Button>
                    </div>
                </Col>
            </Row>
            <br/>
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

            <h3>Currently Borrowed Book</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Due Date</th>
                    <th>Fine</th>
                </tr>
                </thead>
                <tbody>
                {data.user.currentlyBorrowed
                    ? <tr>
                        <td><Link to={`/book/${data.user.currentlyBorrowed.id}`}>{data.user.currentlyBorrowed.title}</Link></td>
                        <td><Link to={`/author/${data.user.currentlyBorrowed.author.id}`}>{data.user.currentlyBorrowed.author.name}</Link></td>
                        <td>{new Date(Number(data.user.currentlyBorrowed.dateOfBorrow)).toDateString()}</td>
                        <td>-</td>
                    </tr>
                    :
                    <td colSpan={4}>No borrowed book</td>
                }

                </tbody>
            </Table>


        </Container>
    )
}



const mapDispatchToProps = {
    newSearchQuery, logoutWithoutCredential
}
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
const connectedUserHome = connect(mapStateToProps, mapDispatchToProps)(UserHome)

export default connectedUserHome

// requireStaff(props, history)
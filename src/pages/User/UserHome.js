import {Button, Col, Container, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import {useHistory} from "react-router";
import {useState} from "react";
import {newSearchQuery} from "../../reducers/searchQueryReducer";
import {logoutWithoutCredential} from "../../reducers/loginReducer"
import {connect} from "react-redux";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {clearToken} from "../../helpers/utils";

const USER = gql`
    query User($id:ID!){
        user(id:$id){
            currentlyBorrowed{
                id
                title
                author{
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
    const {loading, error, data} = useQuery(USER, {variables: {id: props.login.user.user._id}})
    const logout = () => {
        props.logoutWithoutCredential()
        clearToken()
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
        // alert(`search query ${search}`)
        props.newSearchQuery(search)
        history.push('/search')
    }
    const changePassword = () => {
        history.push('/user/changepassword')
    }

    console.log("data", data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error}</p>;
    if (!props.login.login) {
        alert("Please log in first!")
        history.push('/')
        return null
    }
    return (
        <Container>
            <Row>
                <Col><h2>Welcome {props.login.user.user.firstName}{props.login.user.user._id}</h2>
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
                        <td>{data.user.currentlyBorrowed.title}</td>
                        <td>{data.user.currentlyBorrowed.author.name}</td>
                        <td>{data.user.currentlyBorrowed.dateOfBorrow}</td>
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
import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {Button, Container, Form, ListGroup} from "react-bootstrap";
import {useField} from "../../hooks";
import {LoadingSpinner, ReturnStaff} from "../Components";

const BOOK_USERS = gql`
    query {
        notBorrowedBooks : books(borrowed: false) {
            id
            title
            category {
                id
                title
            }
            author {
                id
                name
            }
            publisher {
                id
                name
            }
            dateOfPublication
            pageCount
            description
            borrowedBy {
                id
                firstName
            }
        }
        borrowedBooks : books (borrowed: true){
            id
            title
            category {
                id
                title
            }
            author {
                id
                name
            }
            publisher {
                id
                name
            }
            dateOfPublication
            pageCount
            description
            borrowedBy {
                id
                firstName
            }
        }
        borrowedUsers : users(borrowed: true){
            id
            email
            firstName
            lastName
            password
        }
        notBorrowedUsers : users(borrowed:false){
            id
            email
            firstName
            lastName
            password
        }
    }
`

const BORROW = gql`
    mutation UpdateBookBorrow($id:ID!, $borrowedBy: ID!){
        updateBookBorrow(
            id: $id,
            borrowedBy: $borrowedBy
        )
    }
`

const RETURN = gql`
    mutation ClearBookBorrow($id:ID!){
        clearBookBorrow(
            id: $id
        )
    }
`

const BookBorrow = () => {
    const id = useParams().id
    const bookBorrow = useField('text')
    const userBorrow = useField('text')
    const bookReturn = useField('text')
    const {loading, error, data} = useQuery(BOOK_USERS)
    const [UpdateBookBorrow] = useMutation(BORROW)
    const [ClearBookBorrow] = useMutation(RETURN)

    const handleSubmitBorrow = (e) => {
        e.preventDefault()
        UpdateBookBorrow({
            variables: {
                id: bookBorrow.value,
                borrowedBy: userBorrow.value
            }
        }).then(r => {
            console.log(r)
            window.location.reload(false);
        })
    }
    const resetFormBorrow = () => {
        bookBorrow.reset()
        userBorrow.reset()
    }
    const handleSubmitReturn = (e) => {
        e.preventDefault()
        ClearBookBorrow({
            variables: {
                id: bookReturn.value
            }
        }).then(r => {
            console.log(r)
            window.location.reload(false);
        })
    }
    const resetFormReturn = () => {
        bookReturn.reset()
    }

    // useEffect(() => {
    //
    // }, [])
    if (loading) return (<LoadingSpinner/>);
    if (error) return <p>Error :( {error}</p>;
    // console.log("data", data)
    return (
        <Container>
            <ReturnStaff/>
            <ListGroup>
                <ListGroup.Item>
                    <h3>Borrow</h3>
                    <Form onSubmit={handleSubmitBorrow} onReset={resetFormBorrow}>
                        <Form.Group controlId="formSelectbook">
                            <Form.Label>User</Form.Label>

                            <Form.Control as="select" onChange={bookBorrow.onChange}>
                                <option>Select book</option>
                                {data.notBorrowedBooks.map((book, index) => {
                                    return (
                                        <option key={index}
                                                value={book.id}>{book.title + ' by ' + book.author.name}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicuser">
                            <Form.Label>Book</Form.Label>
                            <Form.Control as="select" onChange={userBorrow.onChange}>
                                <option>Select user</option>
                                {data.notBorrowedUsers.map((user, index) => {
                                    return (
                                        <option value={user.id}
                                                key={index}>{user.email + ' -  ' + user.firstName + ' ' + user.lastName}</option>

                                    )
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="secondary" type="reset">
                            Reset
                        </Button>
                    </Form>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>Return</h3>
                    <Form onSubmit={handleSubmitReturn} onReset={resetFormReturn}>
                        <Form.Group controlId="formSelectbook">
                            <Form.Label>Return Book</Form.Label>

                            <Form.Control as="select" onChange={bookReturn.onChange}>
                                <option>Select book</option>
                                {data.borrowedBooks.map((book, index) => {
                                    return (
                                        <option key={index}
                                                value={book.id}>{book.title + ' by ' + book.author.name}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="secondary" type="reset">
                            Reset
                        </Button>
                    </Form></ListGroup.Item>
            </ListGroup>

        </Container>
    )
}

export default BookBorrow
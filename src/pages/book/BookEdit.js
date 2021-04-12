import {useHistory, useParams} from "react-router";
import {useField} from "../../hooks";
import {Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {gql, useMutation, useQuery} from "@apollo/client";

const getBooks = gql`
    query{
        books{
            id
            title
            category{
                id
                title
            }
            author{
                id
                name
            }
            publisher{
                id
                name
            }
            dateOfPublication
            pageCount
            description
            borrowedBy{
                id
                firstName
            }
        }
        categories {
            id
            title
        }
        authors{
            id
            name
            biography
        }
        publishers {
            id
            name
        }
    }
`

const EDITBOOK = gql`
    mutation EditBook(
        $id: ID!
        $title: String,
        $category: ID!,
        $author: ID!,
        $publisher: ID!,
        $dateOfPublication: String,
        $pageCount: Int,
        $description: String){
        editBook(
            id:$id,
            title:$title,
            category:$category,
            author:$author,
            publisher:$publisher,
            dateOfPublication:$dateOfPublication,
            pageCount:$pageCount,
            description:$description,
        ) {
            id
            title
            category{
                id
                title
            }
            author{
                id
                name
            }
            publisher{
                id
                name
            }
            dateOfPublication
            pageCount
            description
            borrowedBy{
                id
                firstName
            }
        }
    }
`

const DELETEBOOK = gql`
    mutation DeleteBook($id: ID!){
        deleteBook(
            id:$id
        ) {
            id
            title
        }
    }

`

const BookEdit = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [editId, setEditId] = useState(0)
    const history = useHistory()
    const {loading, error, data} = useQuery(getBooks)
    const [editBook] = useMutation(EDITBOOK)
    const [deleteBook] = useMutation(DELETEBOOK)


    const deleteBookFun = (id) => {
        deleteBook({
            variables: {
                id
            }
        })
        window.location.reload(false);
    }

    const EditModal = (props) => {
        const handleSubmit = (e) => {
            e.preventDefault()
            editBook({
                variables: {
                    id: editId,
                    title: title.value,
                    category: category.value,
                    author: author.value,
                    publisher: publisher.value,
                    dateOfPublication: dateOfPublication.value,
                    pageCount: Number(pageCount.value),
                    description: description.value
                }
            }).then(result => {
                console.log(result)
                setModalShow(false)
                alert(`Edited Book: ${result.data.editBook.title}`)
            }).catch(e => {
                alert(e)
                console.error(e)
            })
        }


        const title = useField('text')
        const category = useField('text')
        const author = useField('text')
        const publisher = useField('text')
        const dateOfPublication = useField('date')
        const pageCount = useField('number')
        const description = useField('text')

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   dialogClassName="modal-90w"
                   onEnter={() => {
                       const editData = data.books.find(book => book.id === editId)
                       title.setValue(editData.title)
                       category.setValue(editData.category)
                       author.setValue(editData.author)
                       publisher.setValue(editData.publisher)
                       dateOfPublication.setValue(editData.dateOfPublication)
                       pageCount.setValue(editData.pageCount)
                       description.setValue(editData.description)
                   }}
                   backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Author
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={title.value} type={title.type} onChange={title.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formSelectCategory">
                                <Form.Label>Category</Form.Label>

                                <Form.Control as="select" onChange={category.onChange}>
                                    <option>Select category</option>
                                    {data.categories.map(categoryMap => {
                                        if (category.value.id === categoryMap.id) {
                                            return (<option value={categoryMap.id}
                                                            selected>{categoryMap.title}</option>)

                                        } else {
                                            return (
                                                <option value={categoryMap.id}>{categoryMap.title}</option>

                                            )
                                        }
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control as="select" onChange={author.onChange}>
                                    <option>Select author</option>
                                    {data.authors.map(authorMap => {
                                        if (author.value.id === authorMap.id) {
                                            return (<option value={authorMap.id}
                                                            selected>{authorMap.name}</option>)
                                        } else {
                                            return (
                                                <option value={authorMap.id}>{authorMap.name}</option>
                                            )
                                        }
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicPublisher">
                                <Form.Label>Publisher</Form.Label>
                                <Form.Control as="select" onChange={publisher.onChange}>
                                    <option>Select publisher</option>
                                    {data.publishers.map(publisherMap => {
                                        if (publisher.value.id === publisherMap.id) {
                                            return (<option value={publisherMap.id}
                                                            selected>{publisherMap.name}</option>)
                                        } else {
                                            return (
                                                <option value={publisherMap.id}>{publisherMap.name}</option>
                                            )
                                        }
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Date of Publication</Form.Label>
                                <Form.Control value={dateOfPublication.value} type={dateOfPublication.type}
                                              onChange={dateOfPublication.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Page Count</Form.Label>
                                <Form.Control value={pageCount.value} type="number"
                                              onChange={pageCount.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={description.value} onChange={description.onChange}
                                              as="textarea"
                                              rows={3}/>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error}</p>;
    return (
        <Container>
            <Link to='/staff/home'><p> ← Back to staff</p></Link>
            <h1>View, Edit and Delete Book</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Date of Publication</th>
                    <th>Page Count</th>
                    <th>Borrowed by</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.books.map(book => {
                    return (
                        <tr>
                            <td>{book.author.name}</td>
                            <td>{book.title}</td>
                            <td>{book.category.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.publisher.name}</td>
                            <td>{book.dateOfPublication}</td>
                            <td>{book.pageCount}</td>
                            {book.borrowedBy ? <td>{book.borrowedBy.firstName}</td> : <td></td>}
                            <td><Link onClick={() => {
                                setEditId(book.id)
                                setModalShow(true)
                            }}>Edit</Link></td>
                            <td><Link onClick={() => {
                                deleteBookFun(book.id)
                            }}>Delete</Link></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>


        </Container>
    )
}

export default BookEdit
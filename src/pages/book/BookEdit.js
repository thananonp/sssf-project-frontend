import {useHistory} from "react-router";
import {useField, useFile} from "../../hooks";
import {Button, Container, Dropdown, Form, Modal, Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {ErrorMessage, LoadingSpinner, ReturnStaff} from "../Components";
import {getToday, requireStaff} from "../../helpers/utils";
import {connect} from "react-redux";

const getBooks = gql`
    query($limit:Int, $skip:Int){
        countBook
        books(
            limit:$limit,
            skip:$skip){
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
            imageUrl
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
        $title: String!
        $category: ID!
        $author: ID!
        $publisher: ID!
        $dateOfPublication: String!
        $pageCount: Int!
        $description: String!
        $file: Upload
    ){
        editBook(
            id:$id,
            title:$title,
            category:$category,
            author:$author,
            publisher:$publisher,
            dateOfPublication:$dateOfPublication,
            pageCount:$pageCount,
            description:$description,
            file:$file
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
    const limit = useField(null, 10)
    let active = useField(null, 1)
    const [modalShow, setModalShow] = useState(false);
    const [editId, setEditId] = useState(0)
    const history = useHistory()
    const {loading, error, data} = useQuery(getBooks, {
        variables: {
            limit: Number(limit.value),
            skip: Number(active.value - 1) * 10
        }
    })
    const [editBook] = useMutation(EDITBOOK)
    const [deleteBook] = useMutation(DELETEBOOK)


    const deleteBookFun = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete book: ${title}`)) {
            try {
                await deleteBook({variables: {id}})
                window.location.reload(false);
            } catch (e) {
                window.alert(e)
            }
        }
    }

    const EditModal = (props) => {
        const title = useField('text')
        const category = useField('text', '')
        const author = useField('text', '')
        const publisher = useField('text', '')
        const dateOfPublication = useField('date')
        const pageCount = useField('number')
        const description = useField('text')
        const fileHolder = useFile()
        const file = useFile()
        const editData = data.books.find(book => book.id === editId)

        const populateData = () => {
            title.setValue(editData.title)
            if (editData.category) {
                category.setValue(editData.category.id);
            }
            if (editData.author) {
                author.setValue(editData.author.id);
            }
            if (editData.publisher) {
                publisher.setValue(editData.publisher.id);
            }
            dateOfPublication.setValue(editData.dateOfPublication)
            pageCount.setValue(editData.pageCount)
            description.setValue(editData.description)
            fileHolder.setValue(editData.imageUrl)
        }

        const resetForm = () => {
            populateData()
            file.reset()
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            console.log({
                id: editId,
                title: title.value,
                category: category.value,
                author: author.value,
                publisher: publisher.value,
                dateOfPublication: dateOfPublication.value,
                pageCount: Number(pageCount.value),
                description: description.value,
                file: file.value
            })
            if (category.value && author.value && publisher.value) {
                editBook({
                    variables: {
                        id: editId,
                        title: title.value,
                        category: category.value,
                        author: author.value,
                        publisher: publisher.value,
                        dateOfPublication: dateOfPublication.value,
                        pageCount: Number(pageCount.value),
                        description: description.value,
                        file: file.value
                    }
                }).then(result => {
                    setModalShow(false)
                    // console.log(result)
                    window.alert(`Edited Book: ${result.data.editBook.title}`)
                    window.location.reload(false);
                }).catch(e => {
                    window.alert(e)
                })
            } else {
                window.alert("Please fill in all the information")
            }
        }

        return (
            <Modal {...props}
                   className='font'
                   aria-labelledby="contained-modal-title-vcenter"
                   dialogClassName="modal-90w"
                   onEnter={() => {
                       populateData()
                   }}
                   backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Author
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form onReset={resetForm} onSubmit={handleSubmit}>
                        <img className="mediumAvatar" src={fileHolder.value} alt={title.value}/>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Title (*)</Form.Label>
                            <Form.Control required value={title.value} type={title.type} onChange={title.onChange}/>
                        </Form.Group>
                        <Form.Group controlId="formSelectCategory">
                            <Form.Label>Category (*)</Form.Label>
                            <Form.Control required as="select" value={category.value} onChange={category.onChange}>
                                <option>Select category</option>
                                console.log(category.value)
                                {data.categories.map(categoryMap => {
                                    return (<option value={categoryMap.id}>{categoryMap.title}</option>)
                                })}
                            </Form.Control>
                            <Form.Text>Default: {editData ? editData.category ? editData.category.title : null : null}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicAuthor">
                            <Form.Label>Author (*)</Form.Label>
                            <Form.Control required as="select" value={author.value} onChange={author.onChange}>
                                <option>Select author</option>
                                {data.authors.map(authorMap => {
                                    return (<option value={authorMap.id}>{authorMap.name}</option>)
                                })}
                            </Form.Control>
                            <Form.Text>Default: {editData ? editData.author ? editData.author.name : null : null}</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPublisher">
                            <Form.Label>Publisher (*)</Form.Label>
                            <Form.Control required value={publisher.value} as="select" onChange={publisher.onChange}>
                                <option>Select publisher</option>
                                {data.publishers.map(publisherMap => {
                                    return (<option value={publisherMap.id}>{publisherMap.name}</option>)
                                })}
                            </Form.Control>
                            <Form.Text>Default: {editData ? editData.publisher ? editData.publisher.name : null : null}</Form.Text>

                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Date of Publication (*)</Form.Label>
                            <Form.Control required max={getToday()} value={dateOfPublication.value}
                                          type={dateOfPublication.type}
                                          onChange={dateOfPublication.onChange}/>
                            <Form.Text>The date must be before today.</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Page Count (*)</Form.Label>
                            <Form.Control required min="1" value={pageCount.value} type="number"
                                          onChange={pageCount.onChange}/>
                            <Form.Text>Minimum page number is 1</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description (*)</Form.Label>
                            <Form.Control required value={description.value} onChange={description.onChange}
                                          as="textarea"
                                          rows={3}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Text>To update the picture upload a new file. If you don't upload the new picture,
                                the old one will be used.</Form.Text>
                            <Form.File type="file" onChange={file.onChange} id="exampleFormControlFile1"
                                       accept="image/*"
                                       label="Book cover"/>
                            {file.url
                                ?
                                <>
                                    <p>Image Preview</p>
                                    <img className="imagePreview" alt="input" src={file.url}/></>
                                : null}
                        </Form.Group>
                        <p>(*) means the field is required</p>
                        <div className={"float-right"}>
                            <Button className='ml-3 mb-3' variant="outline-primary" type="submit">
                                Submit
                            </Button>
                            <Button className='ml-3 mb-3' variant="outline-secondary" type="reset">
                                Reset
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    if (loading) return (<LoadingSpinner/>);
    if (error) return <ErrorMessage error={error}/>
    requireStaff(props, history)
    let items = [];
    for (let number = 1; number <= (data.countBook / limit.value) + 1; number++) {
        if (number === active.value) {
            items.push(
                <Pagination.Item key={number} active={true}>
                    {number}
                </Pagination.Item>,
            );
        } else {
            items.push(
                <Pagination.Item onClick={active.onClick} key={number} active={false}>
                    {number}
                </Pagination.Item>,
            );
        }
    }
    return (
        <Container>
            <ReturnStaff/>
            <h1>Manage Book</h1>
            <p>There are total of {data.countBook} books.</p>
            <Dropdown className={"float-left"}>
                Show
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    {limit.value}
                </Dropdown.Toggle>
                entries


                <Dropdown.Menu>
                    <Dropdown.Header>Select the numbers of entries</Dropdown.Header>
                    <Dropdown.Item onClick={limit.onClick}>10</Dropdown.Item>
                    <Dropdown.Item onClick={limit.onClick}>25</Dropdown.Item>
                    <Dropdown.Item onClick={limit.onClick}>50</Dropdown.Item>
                    <Dropdown.Item onClick={limit.onClick}>100</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Pagination className={"float-right"}>
                {items}
            </Pagination>
            <br/>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table responsive striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
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
                {data.books.map((book, index) => {
                    // console.log(book)
                    return (
                        <tr>
                            <td>{(active.value-1) * 10 + index + 1}</td>
                            {book.imageUrl ?
                                <td><img className="smallAvatar" src={book.imageUrl} alt={book.name}/></td> : <td/>}
                            <td>{book.title}</td>
                            {book.category !== null ? <td>{book.category.title}</td> :
                                <td>Deleted Category</td>}
                            {book.author !== null ? <td>{book.author.name}</td> : <td>Deleted Author</td>}
                            {book.publisher !== null ? <td>{book.publisher.name}</td> :
                                <td>Deleted Publisher</td>}
                            <td>{book.dateOfPublication}</td>
                            <td>{book.pageCount}</td>
                            {book.borrowedBy ? <td>{book.borrowedBy.firstName}</td> : <td>-</td>}
                            <td><Button variant="outline-warning" onClick={() => {
                                setEditId(book.id)
                                setModalShow(true)
                            }}>Edit</Button></td>
                            <td><Button variant="outline-danger" onClick={() => {
                                deleteBookFun(book.id, book.title)
                            }}>Delete</Button></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

            <br/>


        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedBookEdit = connect(mapStateToProps, null)(BookEdit)

export default connectedBookEdit
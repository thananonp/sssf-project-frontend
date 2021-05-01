import {useField, useFile, useNotification} from "../../hooks";
import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {gql, useMutation, useQuery} from "@apollo/client";
import {LoadingSpinner, NotificationAlert, ReturnStaff} from "../Components";
import {backToTop, getToday, requireStaff} from "../../helpers/utils";
import {connect} from "react-redux";

const ADD_BOOK = gql`
    mutation AddBook(
        $title: String!
        $category: ID!
        $author: ID!
        $publisher: ID!
        $dateOfPublication: String!
        $pageCount: Int!
        $description: String!
        $file: Upload!
    ){
        addBook(
            title:$title,
            category:$category,
            author:$author,
            publisher:$publisher,
            dateOfPublication:$dateOfPublication,
            pageCount:$pageCount,
            description:$description,
            file:$file
        ){
            id
            title
        }}`

const categoriesAuthorsPublishers = gql`
    query data {
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

const BookAdd = (props) => {
    const title = useField('text')
    const category = useField('text')
    const author = useField('text')
    const publisher = useField('text')
    const dateOfPublication = useField('date')
    const pageCount = useField('number')
    const description = useField('text')
    const {loading, error, data} = useQuery(categoriesAuthorsPublishers)
    const [addBook] = useMutation(ADD_BOOK)
    const notification = useNotification()
    const file = useFile()
    const history = useHistory()

    const handleSubmit = (e) => {
        backToTop()
        e.preventDefault()
        if (author.value && category.value && publisher.value) {
            addBook({
                variables: {
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
                // console.log(result)
                // alert(`Added Book: ${result.data.addBook.title}`)
                // resetForm()
                notification.alertSuccess(`Added Book: ${result.data.addBook.title}`)
                resetForm()
            }).catch(e => {
                notification.alertFailure(String(e))
                console.error(e)
            })
        } else {
            backToTop()
            notification.alertFailure("Please select category, author and publisher.")
        }
        // history.push('/staff/home')
    }
    const resetForm = () => {
        title.reset()
        author.reset()
        publisher.reset()
        category.reset()
        dateOfPublication.reset()
        pageCount.reset()
        description.reset()
        file.reset()
    }

    if (loading) return (<LoadingSpinner/>);
    if (error) return <p>Error :( {error}</p>;
    requireStaff(props, history)
    return (
        <Container>
            <ReturnStaff/>

            <h1>Add new book</h1>
            <NotificationAlert success={notification.success} failure={notification.failure}
                               successText={notification.successText} failureText={notification.failureText}/>

            <Form onSubmit={handleSubmit} onReset={resetForm}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required value={title.value} type={title.type} onChange={title.onChange}/>
                </Form.Group>
                <Form.Group required controlId="formSelectCategory">
                    <Form.Label>Category</Form.Label>

                    <Form.Control as="select" onChange={category.onChange}>
                        <option>Select category</option>
                        {data.categories.map(category => {
                            return (
                                <option value={category.id}>{category.title}</option>

                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control as="select" onChange={author.onChange}>
                        <option>Select author</option>
                        {data.authors.map(author => {
                            return (
                                <option value={author.id}>{author.name}</option>

                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPublisher">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control as="select" onChange={publisher.onChange}>
                        <option>Select publisher</option>
                        {data.publishers.map(publisher => {
                            return (
                                <option value={publisher.id}>{publisher.name}</option>

                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Date of Publication</Form.Label>
                    <Form.Control required max={getToday()} value={dateOfPublication.value}
                                  type={dateOfPublication.type}
                                  onChange={dateOfPublication.onChange}/>
                    <Form.Text>The date must be before today.</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Page Count</Form.Label>
                    <Form.Control required min="1" value={pageCount.value} type="number"
                                  onChange={pageCount.onChange}/>
                    <Form.Text>Minimum page number is 1</Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required value={description.value} onChange={description.onChange} as="textarea"
                                  rows={3}/>
                </Form.Group>
                <Form.Group>
                    <Form.File required type="file" onChange={file.onChange} id="exampleFormControlFile1"
                               accept="image/*"
                               label="Example file input"/>
                    {file.url
                        ? <img className="imagePreview" alt="input" src={file.url}/>
                        : null}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="secondary" type="reset">
                    Reset
                </Button>
            </Form>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedBookAdd = connect(mapStateToProps, null)(BookAdd)

export default connectedBookAdd
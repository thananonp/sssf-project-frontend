import {useField} from "../../hooks";
import {useHistory} from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReturnStaff from "../ReturnStaff";
import {useMutation, useQuery, gql} from "@apollo/client";

const ADD_BOOK = gql`
    mutation addBook(
        $title: String,
        $category: ID!,
        $author: ID!,
        $publisher: ID!,
        $dateOfPublication: String,
        $pageCount: Int,
        $description: String
    ){
        addBook(
            title:$title,
            category:$category,
            author:$author,
            publisher:$publisher,
            dateOfPublication:$dateOfPublication,
            pageCount:$pageCount,
            description:$description,
        ){id
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

        }}`

const FORBOOKQUERY = gql`
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

const BookAdd = () => {
    const title = useField('text')
    const category = useField('text')
    const author = useField('text')
    const publisher = useField('text')
    const dateOfPublication = useField('date')
    const pageCount = useField('number')
    const description = useField('text')
    const {loading, error, data} = useQuery(FORBOOKQUERY)
    const [addBook] = useMutation(ADD_BOOK)

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            "title": title.value,
            "category": category.value,
            "author": author.value,
            "publisher": publisher.value,
            "dateOfPublication": dateOfPublication.value,
            "pageCount": pageCount.value,
            "description": description.value
        })

        addBook( {
                "title": title.value,
                "category": category.value,
                "author": author.value,
                "publisher": publisher.value,
                "dateOfPublication": dateOfPublication.value,
                "pageCount": pageCount.value,
                "description": description.value

        }).then(result => {
            console.log(result)
        }).catch(e => {
            console.error(e)
        })
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
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error}</p>;
    return (
        <Container>
            <ReturnStaff/>

            <h1>Add new book</h1>
            <Form onSubmit={handleSubmit} onReset={resetForm}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title.value} type={title.type} onChange={title.onChange}/>
                </Form.Group>
                <Form.Group controlId="formSelectCategory">
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
                    <Form.Control as="select" onChange={author.onChange}>
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
                    <Form.Control value={dateOfPublication.value} type={dateOfPublication.type}
                                  onChange={dateOfPublication.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Page Count</Form.Label>
                    <Form.Control value={pageCount.value} type={pageCount.type}
                                  onChange={pageCount.onChange}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={description.value} onChange={description.onChange} as="textarea" rows={3}/>
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

export default BookAdd
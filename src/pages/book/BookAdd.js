import {useField} from "../../hooks";
import {useHistory} from "react-router";
import {Button, Form} from "react-bootstrap";

const BookAdd = () => {
    const author = useField('text')
    const title = useField('text')
    const publisher = useField('text')
    const dateOfPublication = useField('date')

    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Add author ${author.value} ${title.value} ${publisher.value}${dateOfPublication.value}`)
        history.push('/staff/home')
    }
    return (
        <div>
            <h1>Add new book</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title.value} type={title.type} onChange={title.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control value={author.value} type={author.type} onChange={author.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPublisher">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control value={publisher.value} type={publisher.type} onChange={publisher.onChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Date of Publication</Form.Label>
                    <Form.Control value={dateOfPublication.value} type={dateOfPublication.type} onChange={dateOfPublication.onChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default BookAdd
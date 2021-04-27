import {useHistory} from "react-router";
import {useField, useFile} from "../../hooks";
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {connect} from "react-redux";
import {LoadingSpinner, ReturnStaff} from "../ReturnStaff";
import {requireStaff} from "../../helpers/utils";

const CATEGORIES = gql`
    query{
        categories{
            id
            title
            imageUrl
        }
    }
`

const EDIT_CATEGORY = gql`
    mutation EditCategory(
        $id:ID!,
        $title:String!
        $file:Upload
    ){editCategory(
        id:$id,
        title: $title
        file:$file
    ){
        id
        title
    }
    }
`

const DELETE_CATEGORY = gql`
    mutation DeleteCategory($id:ID!){
        deleteCategory(
            id:$id
        ){
            id
        }
    }
`

const CategoryEdit = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [editId, setEditId] = useState(0)

    const history = useHistory()
    const {loading, error, data} = useQuery(CATEGORIES)
    const [editCategory] = useMutation(EDIT_CATEGORY)
    const [deleteCategory] = useMutation(DELETE_CATEGORY)
    console.log(data)

    const deletePublisherFun = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete category: ${name}`)) {
            try {
                await deleteCategory({variables: {id}})
                window.location.reload(false);
            } catch (e) {
                window.alert(e)
            }
        }
        //
        // alert(`delete ${id}`)
        // deleteCategory({variables: {id}}).then(result => {
        //     console.log(result)
        //     window.location.reload(false);
        //     setModalShow(false)
        // }).catch(e => {
        //     alert(e)
        //     console.error(e)
        // })
    }

    const EditModal = (props) => {
        const title = useField('text')
        const fileHolder = useFile()
        const file = useFile()

        const handleSubmit = (e) => {
            e.preventDefault()
            editCategory({
                variables: {
                    id: editId,
                    title: title.value,
                    file:file.value
                }
            }).then(result => {
                alert(`Edited Category: ${result.data.editCategory.title}`)
                console.log(result)
                window.location.reload(false);
                setModalShow(false)
            }).catch(e => {
                alert(e)
                console.error(e)
            })
        }

        const resetForm = () => {
            title.reset()
            file.reset()
        }

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   size="lg"
                   backdrop="static"
                   onEnter={() => {
                       const editData = data.categories.find(category => category.id === editId)
                       title.setValue(editData.title)
                   }
                   }
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <img className="mediumAvatar" src={fileHolder.value} alt={title.value}/>
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label>Category title</Form.Label>
                                <Form.Control value={title.value} type={title.type} onChange={title.onChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.File required type="file" onChange={file.onChange} id="exampleFormControlFile1"
                                           accept="image/*"
                                           label="Example file input"/>
                                <Form.Text>To update the picture upload a new file. If you don't upload the new picture, the old one will be used.</Form.Text>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={resetForm}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }


    requireStaff(props, history)
    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error :( {error}</p>;
    return (
        <Container>
            <ReturnStaff/>
            <h1>View, Edit and Delete Category</h1>
            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Category Name</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.categories.map((category, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            {category.imageUrl ?
                                <td><img className="smallAvatar" src={category.imageUrl} alt={category.name}/></td> : <td/>}
                            <td>{category.title}</td>
                            <td><Link onClick={() => {
                                setEditId(category.id)
                                setModalShow(true)
                            }}>
                                Edit
                            </Link>
                            </td>
                            <td><Link onClick={() =>
                                deletePublisherFun(category.id, category.title)
                            }>
                                Delete
                            </Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>


        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedCategoryEdit = connect(mapStateToProps, null)(CategoryEdit)

export default connectedCategoryEdit

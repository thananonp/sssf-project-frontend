import {useHistory} from "react-router";
import {useField, useFile} from "../../hooks";
import {Button, Container, Dropdown, Form, Modal, Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {connect} from "react-redux";
import {ErrorMessage, LoadingSpinner, ReturnStaff} from "../Components";
import {requireStaff} from "../../helpers/utils";

const CATEGORIES = gql`
    query($limit:Int, $skip:Int){
        countCategory
        categories(
            limit:$limit,
            skip:$skip){
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
    const limit = useField(null, 10)
    let active = useField(null, 1)
    const [modalShow, setModalShow] = useState(false);
    const [editId, setEditId] = useState(0)
    const history = useHistory()
    const {loading, error, data} = useQuery(CATEGORIES, {
        variables: {
            limit: Number(limit.value),
            skip: Number(active.value - 1) * 10
        }
    })
    const [editCategory] = useMutation(EDIT_CATEGORY)
    const [deleteCategory] = useMutation(DELETE_CATEGORY)

    const deletePublisherFun = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete category: ${name}`)) {
            try {
                await deleteCategory({variables: {id}})
                window.location.reload(false);
            } catch (e) {
                window.alert(e)
            }
        }
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
                    file: file.value
                }
            }).then(result => {
                setModalShow(false)
                alert(`Edited Category: ${result.data.editCategory.title}`)
                console.log(result)
                window.location.reload(false);
            }).catch(e => {
                alert(e)
                console.error(e)
            })
        }

        const resetForm = () => {
            const editData = data.categories.find(category => category.id === editId)
            title.setValue(editData.title)
            file.reset()
        }

        return (
            <Modal {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   size="lg"
                   backdrop="static"
                   className='font'
                   onEnter={() => {
                       const editData = data.categories.find(category => category.id === editId)
                       title.setValue(editData.title)
                       fileHolder.setValue(editData.imageUrl)
                   }
                   }
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form onReset={resetForm} onSubmit={handleSubmit}>
                        <img className="imageBanner" src={fileHolder.value} alt={title.value}/>
                        <Form.Group controlId="formBasicFirstName">
                            <Form.Label>Category title (*)</Form.Label>
                            <Form.Control required value={title.value} type={title.type} onChange={title.onChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.File type="file" onChange={file.onChange} id="exampleFormControlFile1"
                                       accept="image/*"
                                       label="Category Image"/>
                            <Form.Text>To update the picture upload a new file. If you don't upload the new picture,
                                the old one will be used.</Form.Text>
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
    for (let number = 1; number <= (data.countCategory / limit.value) + 1; number++) {
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
            <h1>Manage Category</h1>
            <p>There are total of {data.countCategory} categories.</p>

            <EditModal show={modalShow} onHide={() => setModalShow(false)}/>
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
            <Table responsive  striped bordered hover>
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
                            <td>{(active.value - 1) * 10 + index + 1}</td>
                            {category.imageUrl ?
                                <td><img className="smallAvatar" src={category.imageUrl} alt={category.name}/></td> :
                                <td/>}
                            <td>{category.title}</td>
                            <td><Button variant="outline-warning" onClick={() => {
                                setEditId(category.id)
                                setModalShow(true)
                            }}>
                                Edit
                            </Button>
                            </td>
                            <td>
                                <Button variant="outline-danger" onClick={() =>
                                    deletePublisherFun(category.id, category.title)
                                }>Delete</Button>
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

import {Link} from "react-router-dom";
import {Button, Card, CardDeck, Carousel, Container, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import {useField} from "../hooks";
import {newSearchQuery} from "../reducers/searchQueryReducer";
import {useHistory} from "react-router";
import {connect} from "react-redux";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {LoadingSpinner, NotificationAlert} from "./Components";

const GET_STATS = gql`
    query {
        countUser
        countStaff
        countBook
        countAuthor
        countPublisher
        countCategory
    }
`

const Landing = (props) => {
    const search = useField('text')
    const history = useHistory()
    const {data, loading, error} = useQuery(GET_STATS)

    const toSearch = () => {
        props.newSearchQuery(search.value)
        history.push('/search')
    }

    const showCard = () => {
        if (props.login.login) {
            if (props.login.user.type === "user") {
                return (
                    <CardDeck>
                        <Card>
                            <Card.Header as="h5">Opening times</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Mon - Fri<span className="float-right">8 - 18</span></ListGroup.Item>
                                <ListGroup.Item>Sat<span className="float-right">10 -  18</span></ListGroup.Item>
                                <ListGroup.Item>Sun<span className="float-right">Closed</span></ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <Card>
                            <Card.Header as="h5">Welcome {props.login.user.user.firstName}</Card.Header>
                            <Card.Body>
                                <Card.Title>Click here to go to your user page.
                                    <br/>
                                    <Link to="/user/home"><Button variant='outline-primary' className='my-3'>User page</Button></Link>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                )
            } else if (props.login.user.type === "staff") {
                return (
                    <CardDeck>
                        <Card>
                            <Card.Header as="h5">Opening times</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Mon - Fri<span className="float-right">8 - 18</span></ListGroup.Item>
                                <ListGroup.Item>Sat<span className="float-right">10 -  18</span></ListGroup.Item>
                                <ListGroup.Item>Sun<span className="float-right">Closed</span></ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <Card>
                            <Card.Header as="h5">Welcome {props.login.user.user.firstName}</Card.Header>
                            <Card.Body>
                                <Card.Title>Click here to go to your staff page.
                                    <br/>
                                    <Link to="/staff/home"><Button variant='outline-primary' className='my-3'>Staff page</Button></Link>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                )
            }
        } else {
            return (
                <CardDeck>
                    <Card>
                        <Card.Header as="h5">Opening times</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Mon - Fri<span className="float-right">8 - 18</span></ListGroup.Item>
                            <ListGroup.Item>Sat<span className="float-right">10 -  18</span></ListGroup.Item>
                            <ListGroup.Item>Sun<span className="float-right">Closed</span></ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Card>
                        <Card.Header as="h5">New user</Card.Header>
                        <Card.Body>
                            <Card.Title>Are you new to the library website</Card.Title>
                            <div>Already has an account
                                <span><Link to="/user/login"><Button variant={"outline-primary"} className='m-2'>Login</Button></Link></span>
                            </div>
                            <div>
                                No account?
                                <Link to="/user/register"><Button variant={"outline-primary"}  className='m-2'>Register here</Button></Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header as="h5">Staff</Card.Header>
                        <Card.Body>
                            <Card.Title>Free candy for staff here</Card.Title>
                            <Link to="/staff"><Button variant={"outline-primary"}>Staff login</Button></Link></Card.Body>
                    </Card>
                </CardDeck>
            )
        }
    };

    const showStatistic = () => {
        if (data) {
            return (<ListGroup variant="flush">
                <ListGroup.Item>User<span className="float-right">{data.countUser}</span> </ListGroup.Item>
                <ListGroup.Item>Staff<span className="float-right">{data.countStaff}</span></ListGroup.Item>
                <ListGroup.Item>Book<span className="float-right">{data.countBook}</span></ListGroup.Item>
                <ListGroup.Item>Author<span className="float-right">{data.countAuthor}</span> </ListGroup.Item>
                <ListGroup.Item>Publisher<span className="float-right">{data.countPublisher}</span></ListGroup.Item>
                <ListGroup.Item>Category<span className="float-right">{data.countCategory}</span></ListGroup.Item>
            </ListGroup>)
        } else {
            return (
                <ListGroup variant="flush">
                    <ListGroup.Item>Cannot fetch data</ListGroup.Item>
                </ListGroup>)
        }
    };

    // console.log(loading)
    // console.log(data)
    // console.log(error)
    if (loading) return <LoadingSpinner/>;
    // if (error) window.alert("Backend failed")
    return (
        <Container>
            <h1 className={'mt-3'}>Welcome to library system</h1>
            <NotificationAlert failure={!!error} success={false}
                               failureText={"Backend connection failed. Maybe the server is down?"}/>
            <InputGroup className="mb-3">
                <FormControl
                    onChange={search.onChange}
                    value={search.value}
                    placeholder="Search books, publishers and writers..."
                    aria-label="Search library"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button onClick={toSearch} variant="outline-secondary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
            <br/>


            {showCard()}

            <br/>
            <Card>
                <Card.Header as="h5">Our library statistic</Card.Header>
                {showStatistic()}
            </Card>
            <br/>
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img
                        className="carouselImage"
                        src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Best library in town</h3>
                        <p>Come visit us Monday - Saturday</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="carouselImage"
                        src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Coworking space available</h3>
                        <p>Quiet place with a good service</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="carouselImage"
                        src="https://images.unsplash.com/photo-1618819348246-aa783b55685b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Cafe is available in the garden</h3>
                        <p>Coffee and bread is up for buying</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <br/>
        </Container>

    )
}

const mapDispatchToProps = {
    newSearchQuery
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedLanding = connect(mapStateToProps, mapDispatchToProps)(Landing)

export default connectedLanding

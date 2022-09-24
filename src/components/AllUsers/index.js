import React, { Component } from "react";
import { Button, Form, InputGroup, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllUsers, createUser, editUser } from './../../redux/user/action';
import { BiSkipNext, BiSkipPrevious, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import loading from '../../Rolling.gif';

class AllUsers extends Component {
    state = {
        loading: false,
        page: 1,
        per_page: "3",
        flag: false,
        openAddModal: false,
        openUpdateModal: false,
        f_name: "",
        l_name: "",
        email: "",
        user_id: "",
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.props.getAllUsers(this.state.page, this.state.per_page).then((response) => {
            if (response.payload.data.length > 0) {
                this.setState({ loading: false })

            }
        });
    }

    firstPage = () => {

        this.setState({ page: 1 });

        this.props.getAllUsers(1, this.state.per_page).then((response) => {
        })
    }
    prevPage = () => {
        if (this.state.page === 1) {
            this.firstPage();
        }
        else {

            this.setState({ page: this.state.page - 1 });

            this.props.getAllUsers(this.state.page - 1, this.state.per_page).then((response) => {
                // console.log(response)
            })
        }
    }

    nextPage = () => {
        const { user } = this.props;
        console.log(user.total_pages, this.state.page);
        if (this.state.page === user.total_pages) {
            this.setState({ warning: "Last Page" });
        }
        else {
            console.log(user.total_pages, this.state.page);

            this.setState({ page: this.state.page + 1 });

            this.props.getAllUsers(this.state.page + 1, this.state.per_page).then((response) => {
                // console.log(response)
            })
        }
    }
    lastPage = () => {
        const { user } = this.props;

        this.setState({ page: user.total_pages });

        this.props.getAllUsers(user.total_pages, this.state.per_page).then((response) => {

        })
    }
    onFilter = (e) => {
        const { user } = this.props;
        this.setState({ filterText: e })
        const filteredItems = user.data.filter(

            item => item.email && item.email.toLowerCase().match(e.toLowerCase()),
        );
        this.setState({ flag: true, filteredItems: filteredItems })
    }

    openAddModal = () => {
        this.setState({ openAddModal: !this.state.openAddModal });
    };
    openUpdateModal = (item_id) => {
        console.log(item_id)
        const { user } = this.props;
        const item = user.data.find((item) => {
            return item.id === item_id
        })
        console.log(item);
        this.setState({ user_id: item.id, f_name: item.first_name, l_name: item.last_name, email: item.email })
        this.setState({ openUpdateModal: !this.state.openUpdateModal });

    };

    handleInputFirst = (e) => {
        this.setState({ f_name: e.target.value })
    }
    handleInputLast = (e) => {
        this.setState({ l_name: e.target.value })
    }
    handleInputEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handleSubmit = () => {
        this.props.createUser(this.state.f_name, this.state.l_name, this.state.email);
    }
    editUser = () => {
        this.props.editUser(this.state.user_id, this.state.f_name, this.state.l_name, this.state.email)
    }
    render() {

        const { user } = this.props;

        return (
            <React.Fragment>
                {this.state.loading ? (
                    <>
                        <img src={loading} alt="loading" />
                    </>
                ) :
                    (
                        <div className="container my-5" >
                            <div className="d-flex flex-row justify-content-between">
                                <div>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            id="search"
                                            type="search"
                                            placeholder="Filter By Email"
                                            aria-label="Search Input"
                                            value={this.state.filterText}
                                            onChange={(e) => this.onFilter(e.target.value)}
                                        />
                                    </InputGroup>
                                </div>

                                <div>
                                    <Button variant="primary" onClick={() => this.openAddModal()}>
                                        Add User
                                    </Button>
                                </div>

                            </div>

                            <Modal show={this.state.openAddModal} onHide={() => this.openAddModal()}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={() => this.handleSubmit()}>
                                        <InputGroup className="mb-3">
                                            <Form.Group className="mb-3" controlId="formBasicFirst">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" required onChange={(e) => this.handleInputFirst(e)} placeholder="Enter first name" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicLast">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" required onChange={(e) => this.handleInputLast(e)} placeholder="Enter last name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" required onChange={(e) => this.handleInputEmail(e)} placeholder="Enter email" />
                                            </Form.Group>
                                        </InputGroup>
                                        <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                    </Form>
                                </Modal.Body>

                            </Modal>



                            <Table striped bordered hover variant="dark">
                                <thead className="text-center">
                                    <tr>
                                        <th>Id</th>
                                        <th>Avatar</th>
                                        <th>Email</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">

                                    {user && user.data && user.data.length > 0 && !this.state.flag ? user.data.map((item, index) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td ><img src={item.avatar} alt="avatar" style={{ height: '10vw', borderRadius: '50%', width: '10vw' }} /></td>
                                            <td>{item.email}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.last_name}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-primary" onClick={() => this.openUpdateModal(item.id)}>Edit</button>
                                                    {/* <button type="button" className="btn btn-danger" onClick={() => this.deleteUser(item.id)}>Delete</button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : this.state.filteredItems && this.state.filteredItems.length > 0 && this.state.filteredItems.map((item, index) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td ><img src={item.avatar} alt="avatar" style={{ height: '10vw', borderRadius: '50%', width: '10vw' }} /></td>
                                            <td>{item.email}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.last_name}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-primary" onClick={() => this.openUpdateModal(item.id)}>Edit</button>
                                                    {/* <button type="button" className="btn btn-danger" onClick={() => this.deleteUser(item.id)}>Delete</button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                            <Modal show={this.state.openUpdateModal} onHide={() => this.openUpdateModal()}>

                                <Modal.Header closeButton>
                                    <Modal.Title>Update User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={() => this.editUser()}>
                                        <InputGroup className="mb-3">
                                            <Form.Group className="mb-3" controlId="formBasicFirst">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" value={this.state.f_name} required onChange={(e) => this.handleInputFirst(e)} placeholder="Enter first name" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicLast">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" required value={this.state.l_name} onChange={(e) => this.handleInputLast(e)} placeholder="Enter last name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" required value={this.state.email} onChange={(e) => this.handleInputEmail(e)} placeholder="Enter email" />
                                            </Form.Group>
                                        </InputGroup>
                                        <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                    </Form>
                                </Modal.Body>

                            </Modal>
                            <div className="d-flex flex-row justify-content-end align-items-center my-3">
                                <div className="me-3">
                                    {this.state.page === 1 ?
                                        <button className="btn btn-primary" disabled >
                                            <BiSkipPrevious />
                                        </button>
                                        :
                                        <button className="btn btn-primary" onClick={() => this.firstPage()}>
                                            <BiSkipPrevious />
                                        </button>
                                    }
                                </div>
                                <div className="me-3">
                                    {this.state.page === 1 ?
                                        <button className="btn btn-primary" disabled>
                                            <BiChevronLeft />
                                        </button>
                                        :
                                        <button className="btn btn-primary" onClick={() => this.prevPage()}>
                                            <BiChevronLeft />
                                        </button>
                                    }
                                </div>
                                <div className="me-3">
                                    <span>{user.page}</span>
                                </div>
                                <div className="me-3">
                                    {this.state.page === user.total_pages ?
                                        <button className="btn btn-primary" disabled>
                                            <BiChevronRight />
                                        </button>
                                        :
                                        <button className="btn btn-primary" onClick={() => this.nextPage()}>
                                            <BiChevronRight />
                                        </button>
                                    }
                                </div>
                                {this.state.page === user.total_pages ?
                                    <button className="btn btn-primary" disabled >
                                        <BiSkipNext />
                                    </button>
                                    :
                                    <button className="btn btn-primary" onClick={() => this.lastPage()}>
                                        <BiSkipNext />
                                    </button>
                                }
                            </div>
                        </div >
                    )}

            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user
});

export default connect(mapStateToProps, {
    getAllUsers, createUser, editUser
})(AllUsers);


import React, { Component } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";

class Login extends Component {
    state = {
        email: "",
    }
    render() {
        return (
            <React.Fragment>
                <div className="d-flex flex-column h-100 align-items-center justify-content-center " style={{ paddingTop: '15rem', paddingBottom: '15rem' }}>
                    <div>

                        <Form>
                            <InputGroup hasValidation className=""  >

                                <FormControl
                                    type="tel"
                                    placeholder="Enter Your Email Address"
                                    isValid={this.state.email && this.state.email.match(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/)}
                                    isInvalid={this.state.email && !this.state.email.match(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/)}
                                    value={this.state.email}
                                    required
                                    minLength="10"
                                    maxLength="10"
                                    name="email"
                                    onChange={(e) => this.handleInputEmail(e)}
                                />
                            </InputGroup>
                            <Form.Control.Feedback type="invalid" >Enter Valid Email</Form.Control.Feedback>
                        </Form>
                    </div>
                </div >
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(Login);

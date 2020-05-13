import React, { Component } from "react";
import axios from "axios";
import { SystemVars } from "../Common/Constants";
import { Table, Form, Modal, Button, Container, Row, Col } from "react-bootstrap";
import "../App.css";

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
          validated: false, 
          setValidated: false,
          isMounted: false,
          first: "",
          last: "",
          date_register:"",
          address: "",
          phone: "",
          email: "",
          validationState: null,
          snackMessage: "",
        };
    
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        // check count validation is 0
        var validate_count = 2;   // form validation of 4 fields (category_id, name, quantity and price)
        var field_arr = ["first","last","email","phone"];
        field_arr.forEach(function(item,index) {
          var obj = document.getElementById(item);
          if (obj.checkValidity()) {
            --validate_count
          }
        })
        if (validate_count===0) {
          this.setState({ validated: false }, this.insertData(e)) ;
        } else {
          this.setState({ validated:true });
        }
    }
    
    insertData = e => {
        console.log("inserted");
        var HOST = SystemVars.HOST;
        var newData = {
            first:this.state.first,
            last: this.state.last,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone
        };
        axios
            .post(HOST + `/address`, newData)
            .then(
                response => {
                    this.setState({ snackMessage: "Address Added Successfully!" });
                    this.handleSnackbar();
                    this.loadproducts();
                }
            )
            .catch(err => {
                console.log(err);
                this.setState({ snackMessage: "Address failed to save" });
                this.handleSnackbar();
            }
        );
    };

    handleFirst = e => {
        this.setState({ first: e.target.value });
    };
    handleLast = e => {
    this.setState({ last: e.target.value });
    };
    handleEmail = e => {
    this.setState({ email: e.target.value });
    };
    handleAddress = e => {
    this.setState({ address: e.target.value });
    };
    handlePhone =  e => {
    this.setState({ phone: e.target.value }); 
    };
    handleSnackbar = () => {
    var bar = document.getElementById("snackbar");
    bar.className = "show";
    setTimeout(function() {
        bar.className = bar.className.replace("show", "");
    }, 3000);
    };

    render() {
        const { snackMessage, validated } = this.state;

        return (     
            <div>
                <Container fluid>
                    <Row>
                        <h1>Add Data Module&nbsp;<small>created to illustrate new page</small></h1>
                        <h3>Please Enter Information below</h3>
                    </Row>
                    <Row>
                    <Form noValidate validated={this.state.validated}>
                        <Form.Row>
                          <Form.Group as={Col} md="6" controlId="first">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"  placeholder="First Name" onChange={this.handleFirst} required/>
                          </Form.Group>
                          <Form.Group as={Col} md="6" controlId="last">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            required 
                            placeholder="Enter Last Name" 
                            onChange={this.handleName}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter your Last Name.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"  placeholder="Enter Email Address" required onChange={this.handleEmail} />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter Email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="phone">
                                <Form.Label>Telephone</Form.Label>
                                <Form.Control type="text"  placeholder="Enter Telephone" required onChange={this.handleEmail} />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter Phone Number.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="address">
                                <Form.Label>Complete Address</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter your complete Address.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" onClick={this.handleSubmit}>Add</Button>

                    </Form> 
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Add

import React, { Component } from "react";
import axios from "axios";
import { SystemVars } from "../Common/Constants";
import * as Icon from 'react-bootstrap-icons';
import { Table, Form, Modal, Button, Container, Row, Col } from "react-bootstrap";
import Detail from "./Detail";
import "../App.css";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
          addresses: [],
          validated: false, 
          setValidated: false,
          isMounted: false,
          first: "",
          last: "",
          date_register:"",
          address: "",
          phone: "",
          email: "",
          limit: 10,
          validationState: null,
          snackMessage: "",
          action: "",
          editData: []
        };

        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleAddress = this.handleAddress.bind(this);

    }

    componentDidMount() {
        this.loaddata({limit: this.state.limit});
    } 

    loaddata(data) {
        var HOST = SystemVars.HOST;
        var url = HOST + '/address';
        axios.get(url, {
            params: data
          })
          .then(response => {
            this.setState({ addresses: response.data });
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        // check count validation is 0
        var validate_count = 4;   // form validation of 4 fields 
        var field_arr = ["first","last","email","phone"];
        field_arr.forEach(function(item,index) {
            var obj = document.getElementById(item);
            if (obj.checkValidity()) {
            --validate_count
            }
        })
        if (validate_count===0) {
            this.setState({ validated: false }, this.handleNew(e)) ;
        } else {
            this.setState({validated:true});
        }
    }

    handleEditData = editData => {
        console.log("editData");
        console.log(editData);
        this.setState({
          action: "edit", 
          editData: editData,
          selectedFile: editData.selectedFile
        },this.updateData(editData));
      }

      updateData = (editData) => {
        var HOST = SystemVars.HOST;
        axios 
          .put(HOST + `/address/`, editData)
          .then(response => {
            this.setState({ snackMessage: "Address Updated Successfully!" });
            this.handleSnackbar();
            return true;
          })
          .catch(err => {
            console.log(err);
            this.setState({ snackMessage: "Address Update Failed!" });
            this.handleSnackbar();
            return false;
          }
        );
      }

      handleNew = e => {
        e.preventDefault();
        this.setState({action: "add"},this.handleInsert(e));
      }

      handleInsert = e => {
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
    }

    handleEditData= editData => {
      this.setState({
        action: "edit", 
        editData: editData
      });
      this.updateData(editData);
    };
    
    handleDeleteItem = DeleteItem => {
      this.setState({action: "delete"});
      var params = { 
        id: DeleteItem.id,
        action: "delete"
      };
      this.deleteItem(params.id);
    }

    handleDeleteItem = DeleteItem => {
      this.setState({action: "delete"});
      var params = { 
        id: DeleteItem.id,
        action: "delete"
      };
      this.deleteItem(params.id);
    }

    handleFirst = e => {
      this.setState({ first: e.target.value });
    }
    handleLast = e => {
    this.setState({ last: e.target.value });
    }
    handleEmail = e => {
    this.setState({ email: e.target.value });
    }
    handleAddress = e => {
    this.setState({ address: e.target.value });
    }
    handlePhone =  e => {
    this.setState({ phone: e.target.value }); 
    }
    handleSnackbar = () => {
    var bar = document.getElementById("snackbar");
    bar.className = "show";
    setTimeout(function() {
        bar.className = bar.className.replace("show", "");
    }, 3000);
    }

    render() {
        const {  snackMessage, validated, addresses } = this.state;
        var renderList = () => {
            if (addresses.dataExists === 'false' ) {
              console.log("No Data");
              return <p>No available Address List, Please click Add New Item</p>;      
            } else {
              return addresses.map(address => (
                <React.Fragment key={ address.id}> 
                  <Detail {...address} onDeleteItem={this.handleDeleteItem} onEditData={this.handleEditData} />
                </React.Fragment>
              ));
            }
          };
        return (     
        <div>
          <Container fluid>
            <Row>
                <Col>
                  <a className="btn btn-success pull-right"
                    onClick={() => this.setState({ formModal: true })}>
                    <Icon.Plus />Add New Item
                  </a>
                </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderList()}</tbody>
            </Table>
            </Container>

            <Modal show={this.state.formModal} size="lg">
            <Modal.Header>
                <Modal.Title>Add Addreses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                    </Row>
                    <Form noValidate validated={this.state.validated}>
                        <Form.Row>
                          <Form.Group as={Col} md="6" controlId="first">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"  placeholder="Forst Name" onChange={this.handleFirst} required/>
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
                    </Form> 
                </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={() => this.setState({ formModal: false })}>
                    Close
                </Button>
                <Button onClick={this.handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>

            <div id="snackbar">{snackMessage}</div>
        </div>
        )
    }
}

export default List

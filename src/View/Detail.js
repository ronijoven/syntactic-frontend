import React, { Component } from "react";
import * as Icon from 'react-bootstrap-icons';
import { Form, Image, Modal, Button, Container, Row, Col } from "react-bootstrap";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: 0,
      selectedId: 0,
      name: "",
      newName: "",
      id: 0,
      date_created: "",
      newAddress: "",
      address: 0,
      formModal: false,
      deleteModal: false,
      source: null
    };

    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  componentDidMount() {
    this.setState({ id: this.props.id });
    this.setState({ date_created: this.props.date_created });
    this.setState({ first: this.props.first });
    this.setState({ newFirst: this.props.first });
    this.setState({ last: this.props.last });
    this.setState({ newLast: this.props.newLast });
    this.setState({ address: this.props.address });
    this.setState({ newAddress: this.props.address });
    this.setState({ phone: this.props.phone });
    this.setState({ newPhone: this.props.phone });
    this.setState({ email: this.props.email });
    this.setState({ newEmail: this.props.email });
  }

  handleClickEdit = (id) => {
    console.log(id);
    this.setState({
        formModal: true,
        selectedId: id.id
    });
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
  handleActive = e => {
    this.setState({ newActive: e.target.value });
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
      this.setState({ validated: false }, this.handleEdit(e)) ;
    } else {
      this.setState({ validated:true });
    }
  }
  
  handleEdit = e => {
    e.preventDefault();
    this.setState({ formModal: false });
    var editData = {
      id: this.state.id,
      first: this.state.newFirst,
      last: this.state.newName,
      address: this.state.newAaddress,
      phone: this.state.newPhone,
      email: this.state.img_filename
    };

    this.props.onEditData(editData);
    this.setState({ first: this.state.newFirst });
    this.setState({ active: this.state.newActive });

  };
  handleDelete = e => {
    e.preventDefault();
    this.setState({ deleteModal: false });
    var deleteCategory = {
      id: this.state.id,
      img_filename: this.state.img_filename
    };
    this.props.onDeleteCategory(deleteCategory);
  };
  
  setId = (theId) => {
    this.setState({ selectedId: theId });
  }

  render() {
    const {
      id,
      date_created,
      first,
      newFirst,
      last,
      newLast,
      phone,
      newPhone,
      address,
      email,
      newEmail,
      selectedRow
    } = this.state;
    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{date_created}</td>
            <td className="name">{first}&nbsp;{last}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
              <span className="react-icon"><Icon.Pencil onClick={() => this.handleClickEdit({id})} /></span>
              <span className="react-icon"><Icon.Trash onClick={() => this.setState({ deleteModal: true })}/></span>
            </td>
            <Modal show={this.state.deleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure to Delete?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({ deleteModal: false })}>
                    Cancel
                    </Button>
                    <Button id={id} variant="primary" onClick={this.handleDelete}>
                    Continue
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.formModal} size="lg">
              <Modal.Header>
                <Modal.Title>Edit Addresses</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                <Form noValidate validated={this.state.validated}>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="first">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" value={first} placeholder="First Name" onChange={this.handleFirst} required/>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="last">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" value={last} placeholder="Enter Last Name"  onChange={this.handleLast} />
                      <Form.Control.Feedback type="invalid">
                          Please Enter your Last Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                      <Form.Group as={Col} controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control value={email} type="email"  placeholder="Enter Email Address" required onChange={this.handleEmail} />
                          <Form.Control.Feedback type="invalid">
                              Please Enter Email.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="phone">
                          <Form.Label>Telephone</Form.Label>
                          <Form.Control type="text" value={phone}  placeholder="Enter Telephone" required onChange={this.handlePhone} />
                          <Form.Control.Feedback type="invalid">
                              Please Enter Phone Number.
                          </Form.Control.Feedback>
                      </Form.Group>
                  </Form.Row>
                  <Form.Row>
                      <Form.Group as={Col} md="12" controlId="address">
                          <Form.Label>Complete Address</Form.Label>
                          <Form.Control as="textarea" rows="3" value={address}/>
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
                <Button onClick={this.handleSubmit}>Update</Button>
              </Modal.Footer>
          </Modal>
        </tr>
    );
  }
}

export default Detail;

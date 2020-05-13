import React, { Component} from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../logo.svg';

// The Header creates links that can be used to navigate
// between routes.

class Header extends Component {

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
          <Navbar.Brand href="/">
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo"/>
          </Navbar.Brand> 
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/add">Add</NavLink>
              <NavLink to="/view">View/Manage</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;

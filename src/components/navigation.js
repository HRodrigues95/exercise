import React from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import { Nav, Navbar, Dropdown } from "react-bootstrap";

import LoginBtn from "./login"
import LogoutBtn from "./logout"

import {Login, Logout, updateToken, hasToken} from "../helper"

function SessionBtns(props) {
  if (props.state.isOn) {
    return (
      <Nav className="justify-content-end">
        <LogoutBtn onLogout={props.onLogout}/>
      </Nav>
    );
  }
  else {
    return (
      <Nav className="justify-content-end">
        <LoginBtn onLogin={props.onLogin} />
      </Nav>
    );
  }
}

function UserBtns(props) {
  if (props.state.isOn) {
    return (
      <Nav className="justify-content-end">
        <Dropdown>
          <Dropdown.Toggle variant="secundary">
            User
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/me"> Profile </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    );
  }
  else return "";
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn : false
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    updateToken()
    const val = hasToken();
    this.setState({
      isOn: val,
    });
  }

  handleLogin() {
    Login();
  }

  handleLogout() {
    Logout();
  }

  render() {
    return (
      <Navbar bg="light" expand="md">
        <Nav className="mr-auto">
          <Nav.Link
            as={RouterNavLink}
            to="/"
            exact
            activeClassName="router-link-exact-active"
          >
            Home
          </Nav.Link> 
        </Nav>
        <Nav className="justify-content-end">
          <UserBtns state={this.state} />
          <SessionBtns state={this.state} onLogin={this.handleLogin} onLogout={this.handleLogout}/>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
import React from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import queryString from 'query-string';

import LoginBtn from "./login"
import LogoutBtn from "./logout"

function LoginoutBtn(props) {
  console.log(props);
  return (
    <Nav className="justify-content-end">
      {
        props.isLog ? <LogoutBtn onLogout={props.onLogout} /> : <LoginBtn onLogin={props.onLogin} />
      }
    </Nav>
  );
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false, 
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (window.location.hash !== "" && window.location.hash !== null){
      localStorage.setItem("token", JSON.stringify(queryString.parse(window.location.hash)))
      this.setState({
        isLoggedIn: true,
      });
    }
    else if (localStorage.getItem("token")) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  handleLogin() {
    const CLIENTID     = "60ffd175460c4454a85c361500ace5a3";
    const REDIRECT_URI = "http://localhost:3000/"

    const url = 'https://accounts.spotify.com/authorize?' +
      "client_id=" + CLIENTID +
      "&response_type=token" +
      "&redirect_uri=" + encodeURI(REDIRECT_URI);
    
    window.location = url;
  }

  handleLogout() {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false,
    });
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
          <Nav.Link
            as={RouterNavLink}
            to="/songs"
            exact
            activeClassName="router-link-exact-active"
          >
            Songs
          </Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          {
            this.state.isLoggedIn ? 
              <Nav.Link
                as={RouterNavLink}
                to="/me"
                exact activeClassName="router-link-exact-active"
              >
                Profile
              </Nav.Link>
              : ""
          }
          
          <LoginoutBtn isLog={this.state.isLoggedIn} onLogin={this.handleLogin} onLogout={this.handleLogout}/>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
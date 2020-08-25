import React from 'react';
import { Container, ListGroup } from 'react-bootstrap'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: null,
    }
  }

  async getUserData(token) {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Authoriaztion" : "Bearer "+token
      }
    });
    console.log(res);
  }

  componentDidMount() {
    const tok = localStorage.getItem("token");
    if (tok) {
      const token = JSON.parse(tok).access_token
      this.getUserData(token);
    }
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Profile
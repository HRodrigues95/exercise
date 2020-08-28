import React from 'react';
import { Container } from 'react-bootstrap'
import { updateToken } from '../helper';

class Redirect extends React.Component {
  componentDidMount() {
    updateToken();
    window.location = "http://localhost:3000/";
  }

  render() {
    return (
      <Container>
        Empty
      </Container>
    );
  }
}

export default Redirect;
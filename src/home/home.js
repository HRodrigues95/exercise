import React from 'react';

import { Jumbotron } from "react-bootstrap";

class Home extends React.Component { 
  render() {
    return (
      <Jumbotron>
        <h1>Exercise</h1>
        <p>A simple React WebApp to learn how to best use this tool</p>
      </Jumbotron>
    );
  }
}

export default Home;
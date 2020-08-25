import React from 'react';
import {Container, ListGroup} from 'react-bootstrap'

function SongList(props) {
  const sl = [];
  for (let p = 0; p < props.list.length; p++) {
    sl.push(<Song info={props.list[p]}/>);
  }
  return (
    <ListGroup>
      {sl}
    </ListGroup>
  ); 
}

class Song extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ListGroup.Item>
        Example
      </ListGroup.Item>
    );
  }
}

class Songs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songlist: [],
      token   : null,
    }
  }

  render() {
    return (
      <Container>
        <SongList list={this.state.songlist}/>   
      </Container>
    );
  }
}

export default Songs;
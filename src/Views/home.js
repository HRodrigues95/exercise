import React from 'react';

import { Jumbotron,Form,Container,Button, ListGroup, Row} from "react-bootstrap";
import { hasToken, searchSong, searchSongNav } from '../helper';

import Song from './song';

class Songs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text : '',
      songlist: [],
      next: "",
      curr: "",
      prev: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGetNext = this.handleGetNext.bind(this);
    this.handleGetPrev = this.handleGetPrev.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const sl = await searchSong(this.state.text);
    if (sl !== null) {
      this.setState({
        songlist: sl.items,
        next: sl.next,
        prev: "",
        total: sl.total,
      });
    }
  }
  
  handleChange(event) { 
    this.setState({
      text : event.target.value,
    });
  }

  async handleGetNext() {
    this.setState({
      songlist: [],
    });
    const tracks = await searchSongNav(this.state.next)
    if (tracks !== null) {
      this.setState({
        songlist: tracks.items,
        next: tracks.next,
        prev: tracks.previous,
        total: tracks.total,
      });
    }
  }

  async handleGetPrev() {
    this.setState({
      songlist: [],
    });
    const tracks = await searchSongNav(this.state.prev)
    if (tracks !== null) {
      this.setState({
        songlist: tracks.items,
        next: tracks.next,
        prev: tracks.previous,
        total: tracks.total,
      });
    }
  }

  SongList() {
    const sl = [];
    for (let p = 0; p < this.state.songlist.length; p++) {
      sl.push(<Song info={this.state.songlist[p]}/>);
    }
    return (
      <ListGroup>
        {sl}
      </ListGroup>
    );
  }

  render() {
    let navBtns = [];

    if (this.state.prev !== "") {
      navBtns.push(<Button variant="primary" onClick={this.handleGetPrev}>Previous</Button>);
    }

    if (this.state.next !== "") {
      navBtns.push(<Button variant="primary" onClick={this.handleGetNext}>Next</Button>);
    }
    
    return (
      <Container>
        <Row>
          <h1>Search that song you want:</h1>
          <Form inline onSubmit={this.handleSubmit}>
            <Form.Control type="text" onChange={this.handleChange} placeholder="Song name"></Form.Control>
            <Button variant="primary" type="submit">Search</Button>
          </Form>
        </Row>
        <Row>
          {navBtns}
        </Row>
        {this.SongList()}
      </Container>
    );
  }
}

function Home() {
  if (hasToken()) {
    return (
      <Songs />
    );
  }
  else {
    return (
      <Jumbotron>
        <h1>Exercise</h1>
        <p>A simple React WebApp to learn how to best use this tool</p>
      </Jumbotron>
    );
  }
}

export default Home;
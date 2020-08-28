import React from 'react';
import { Container, Row, Col, ListGroup, Nav, Button, Modal, Form, Badge } from 'react-bootstrap'

import Artist from './artist';
import Album from './album';
import { getSongInfo, getUserplaylist, addSongtoPlaylist } from '../helper';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      small: false,
      hideA: props.hideArtist,
      hideB: props.hideButton,
      song: null,
      show: false,
      playlists: [],
      selplayls: [],
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  async componentDidMount() {
    if (this.props.match !== undefined && this.props.match.params !== undefined) {
      const objct = await getSongInfo(this.props.match.params.id);
      this.setState({
        small: false ,
        song: objct,
        
      });
    }
    else {
      this.setState({
        small : true,
        song: this.props.info,
      });
      console.log(this.props.info);
    }
  }

  componentDidUpdate() {
    if (this.props.info !== undefined && this.props.info.id !== this.state.song.id) {
      this.setState({
        song: this.props.info,
      });
    }
  }

  async handleShow() {
    const pl = await getUserplaylist();
    this.setState({
      show: true,
      playlists: pl,
    });
  }

  handleClose() {
    this.setState({
      show: false,
      playlists: [],
    });
  }

  handleCheck(id) {
    const cplayl = this.state.selplayls;
    const index = cplayl.indexOf(id);
    if (index !== -1) {
      cplayl.splice(index, 1);
    }
    else {
      cplayl.push(id);
    }
    this.setState({
      selplayls:cplayl
    });
  }

  async handleAdd() {
    const cplayl = this.state.selplayls;
    const song = this.state.song;
    await addSongtoPlaylist(cplayl,song.uri)
    this.setState({
      show:false
    });
  }

  ListArtist() {
    const sl = [];
    for (let p = 0; p < this.state.song.artists.length; p++) {
      sl.push(<Artist info={this.state.song.artists[p]}/>);
    }
    return (
      <Container>
        {sl}
      </Container>
    );
  }

  ListPlaylists() {
    const pl = [];
    for (let p = 0; p < this.state.playlists.length; p++) {
      const plist = this.state.playlists[p];
      pl.push(
        <Form.Check eventKey={plist.id} type="checkbox" label={plist.name}
          onChange={() => this.handleCheck(plist.id)} />
      );
    }
    return (
      <Form>
        {pl}
      </Form>
    );
  }

  createModal() {
    let selected = [];
    const slplay = this.state.selplayls;
    for (let i = 0; i < slplay.length; i++) {
      selected.push(
        <Col>
          <Badge variant="secundary">
            {slplay}
          </Badge>
        </Col>
      );
    }


    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add  song to a Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.ListPlaylists()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  SmallInfo() {
    let colArtists = null;
    let BtnModal = null;
    if (!this.state.hideA) {
      colArtists = (
        <Col>
          {this.ListArtist()}
        </Col>
      );
    }

    if (!this.state.hideB) {
      BtnModal = (
        <Col>
          <Button variant="primary" onClick={this.handleShow} > Add</Button>
          {this.createModal()}
        </Col>
      );
    }

    return (
      <ListGroup.Item>
        <Row>
          <Col md={3}>
            <Nav.Link href={`/song/${this.state.song.id}`} >
              {this.state.song.name}
            </Nav.Link>
          </Col>
          {colArtists}
          {BtnModal}
        </Row>
      </ListGroup.Item>
    );
  }
  
  LargeInfo() {
    return (
      <Container >
        <Row className="justify-content-md-center">
          <h1>{this.state.song.name}</h1>
          <Button variant="primary" onClick={this.handleShow} > Add</Button> 
          {this.createModal()}
        </Row>
        <Row>
          <Col>
            {this.ListArtist()}
          </Col>
          <Col>
            <Album info={this.state.song.album} />
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    let res = null;
    if (this.state.small && this.state.song !== null)
    {
      res = this.SmallInfo();
    }
    else if (this.state.song !== null) {
      res = this.LargeInfo();
    }

    return res;
  }
}

export default Song;
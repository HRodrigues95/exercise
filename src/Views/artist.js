import React from 'react';
import { Container, Row, ListGroup, Nav, Col, Image, Button, Card, ButtonGroup, Breadcrumb } from 'react-bootstrap'

import { getArtistInfo, getArtistAlbums } from '../helper'
import Album from './album';

class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      small : false,
      artist: null,
      albums: [],
      next: "",
      prev: "",
      currentAlbum : null,
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  async componentDidMount() {
    if (this.props.match !== undefined && this.props.match.params !== undefined) {
      const info = await getArtistInfo(this.props.match.params.id);
      const albm = await getArtistAlbums(this.props.match.params.id);
      if (info !== null && albm !== null) {
        const nxt = albm.next;
        this.setState({
          small : false,
          artist: info,
          albums: albm.items,
          next  : nxt,
        });
      }
    }
    else if (this.props.info !== undefined) {
      this.setState({
        small : true,
        artist: this.props.info
      });
    }
  }

  getArtistImg(pos) {
    if (this.state.artist !== null && this.state.artist.images !== undefined) {
      const url = this.state.artist.images[pos].url;
      console.log(url);
      return url;
    }
    return "";
  }

  async handleNext() {
    this.setState({
      albums: [],
    });
    const obj = await getArtistAlbums(this.state.artist.id, this.state.next)
    if (obj !== null) {
      this.setState({
        albums: obj.items,
        next: obj.next,
        prev: obj.previous,
      });
    }
  }

  async handlePrev() {
    this.setState({
      albums: [],
    });
    const obj = await getArtistAlbums(this.state.artist.id, this.state.prev)
    if (obj !== null) {
      this.setState({
        albums: obj.items,
        next: obj.next,
        prev: obj.previous,
      });
    }
  }
  
  async handleChangeAlbum(album) {
    const selected = this.state.currentAlbum;
    if (selected === null || selected.id !== album.id) {
      this.setState({
        currentAlbum: album,
      });
    }
    else { 
      this.setState({
        currentAlbum: null,
      });
    }
  }

  getNavigationBtns() {
    let sl = [];

    if(this.state.prev !== "")
      sl.push(<Button variant="primary" onClick={this.handlePrev}>Previous</Button>);

    if (this.state.next !== "")
      sl.push(<Button variant="primary" onClick={this.handleNext}>Next</Button>);
    
    return sl;
  }

  genreList() {
    let gl = [];
    for (const gnr in this.state.artist.genres) {
      gl.push(
        <ListGroup.Item>
          {this.state.artist.genres[gnr]}
        </ListGroup.Item>
      );
    }
    return(
      <ListGroup>
        {gl}
      </ListGroup>
    );
  }

  BtnsForAlbums() {
    let bl = [];
    for (let i = 0; i < this.state.albums.length; i++) {
      const album = this.state.albums[i];
      const variant = i%2===0 ? "light" : "dark" 
      bl.push(
        <Button onClick={() => this.handleChangeAlbum(album)} variant={variant}>
          {album.name}
        </Button>
      );
    }
    return (
      <ButtonGroup vertical className="justify-content-center">
        {bl}
      </ButtonGroup>
    );
  }

  CurrentAlbum() {
    let alb = null;
    if (this.state.currentAlbum !== null) {
      alb = (<Album info={this.state.currentAlbum} ></Album>);
    }
    return alb;
  }


  SmallInfo() {
    return (
      <Card>
        <Card.Header>
          Artist:
        </Card.Header>
        <Card.Img variant="top" src={this.getArtistImg(0)} />
        <Card.Body>
          <Nav.Link href={`/artist/${this.state.artist.id}`} >
            {this.state.artist.name}
          </Nav.Link>
        </Card.Body>
      </Card>
    );
  }

  LargeInfo() {
    return (
      <Container>
        <Row>
          <Col>
            <Image className="w-30" src={this.getArtistImg(0)} roundedCircle ></Image>
          </Col>
          <Col>
            <h1>
              {this.state.artist.name}
            </h1>
            <h3>
              Genres:{this.genreList()}
            </h3>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="3">
            <Breadcrumb>
              <h2>Albums:</h2>
              {this.BtnsForAlbums()}
              {this.getNavigationBtns()}
            </Breadcrumb>
          </Col>
          <Col>
            {this.CurrentAlbum()}
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    let res = null;
    if (this.state.small && this.state.artist !== null)
    {
      res = this.SmallInfo();
    }
    else if (this.state.artist !== null) {
      res = this.LargeInfo();
    }

    return res;
  }
}

export default Artist;
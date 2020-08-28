import React from 'react';
import { getAlbumSongs } from '../helper';

import { Container, ListGroup, Badge, Card} from 'react-bootstrap'


import Song from './song';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      small : false,
      album: null,
      songl: []
    };
  }

  async componentDidMount() {
    if (this.props.info !== undefined) {
      const songlist = await getAlbumSongs(this.props.info.id)
      this.setState({
        small: true,
        album: this.props.info,
        songl: songlist.items,
      });
    }
  }

  async componentDidUpdate() {
    if (this.props.info.id !== this.state.album.id) {
      const sl = await getAlbumSongs(this.props.info.id)
      this.setState({
        album: this.props.info,
        songl: sl.items,
      });
    }
  }

  songList() {
    let sl = [];
    for (let i = 0; i < this.state.songl.length; i++) {
      sl.push(<Song info={this.state.songl[i]} hideArtist />);
    }
    return(
      <ListGroup variant="flush">
        {sl}
      </ListGroup>
    );
  }

  SmallInfo() {
    return (
      <Card className="text-center">
        <Card.Header>
          <h3>{this.state.album.name}</h3>
        </Card.Header>
        <Card.Img variant="top" src={this.state.album.images[1].url} />
        <Card.Body>
          Release Date: <Badge variant="primary">{this.state.album.release_date}</Badge>
        </Card.Body>
        {this.songList()}
      </Card>
    );
  }

  LargeInfo() {
    return (
      <Container>
        Empty
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

export default Album;
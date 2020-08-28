import React from 'react';
import { Container, Card, ListGroup, Image, Row, Col} from 'react-bootstrap'
import { getPlaylist, getPlaylistSongs } from '../helper';
import Song from './song';

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      small: false,
      playl: null,
      songl: [],
    };
  }

  async componentDidMount() {
    if (this.props.info !== undefined)
    {
      const sl = await getPlaylistSongs(this.props.info.tracks.href)
      this.setState({
        small: true,
        playl: this.props.info,
        songl: sl.items,
      });
    }
    else if (this.props.match !== undefined && this.props.match.params !== undefined) {
      const plist = await getPlaylist(this.props.match.params.id);
      const sl = await getPlaylistSongs(this.props.info.tracks.href)
      if (plist !== null) {
        this.setState({
          small: false,
          playl: plist,
          songl: sl.items,
        });
      }
    }
  }

  async componentDidUpdate() {
    if (this.props.info.id !== this.state.playl.id) {
      const sl = await getPlaylistSongs(this.props.info.tracks.href)
      this.setState({
        playl: this.props.info,
        songl: sl.items,
      });
    }
  }

  songList() {
    let sl = [];
    for (let i = 0; i < this.state.songl.length; i++) {
      sl.push(<Song info={this.state.songl[i].track} hideButton/>);
    }
    return(
      <ListGroup variant="flush">
        {sl}
      </ListGroup>
    );
  }

  SmallInfo() {
    let cImg = null;
    if (this.state.playl.images !== undefined && this.state.playl.images.length > 0) {
      cImg = <Image className="w-25" src={this.state.playl.images[0].url} fluid roundedCircle/>;
    }
    return (
      <Card>
        <Card.Header className="align-items-center">
          <Row lg={2}>
            <Col>
              {cImg}
            </Col>
            <Col className="text-left">
              <h2>{this.state.playl.name}</h2>
            </Col>
          </Row>
        </Card.Header>
        {this.songList()}
      </Card>
    );
  }

  LargeInfo() {
    return (
      <Container>

      </Container>
    );
  }

  render() {
    let res = null;
    if (this.state.small) {
      res = this.SmallInfo();
    }
    else {
      res = this.LargeInfo();
    }
    return res;
  }
}

export default Playlist;
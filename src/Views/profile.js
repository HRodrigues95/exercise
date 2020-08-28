import React from 'react';
import { Container, Row, Col, Image, Badge, Button, Form, ButtonGroup, Breadcrumb, Alert} from 'react-bootstrap'
import { getUserInfo, getUserplaylist, createPlaylist } from '../helper';
import Playlist from './playlist';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: null,
      userplay: [],
      currentPlist: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async componentDidMount() {
    const ud = await getUserInfo();
    const up = await getUserplaylist();
    this.setState({
      userData: ud,
      userplay: up,
      form: false,
      plname: "",
      success: false,
    });
  }

  handleCreate() {
    this.setState({
      form: true,
    });
  }

  handleCancel() {
    this.setState({
      form: false,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const sl = await createPlaylist(this.state.userData.id, this.state.plname);
    if (sl) {
      this.setState({
        userplay: [],
      });
      const up = await getUserplaylist();
      this.setState({
        userplay: up,
        form: false,
        plname: "",
        success: true,
      });
    }
  }

  handleChange(event) {
    this.setState({
      plname : event.target.value,
    });
  }

  handleChangePlaylist(playlist) {
    const selected = this.state.currentPlist;
    if (selected === null || selected.id !== playlist.id) {
      this.setState({
        currentPlist: playlist,
      });
    }
    else { 
      this.setState({
        currentPlist: null,
      });
    }
  }

  GroupPlaylists() {
    let pl = [];
    for (let i = 0; i < this.state.userplay.length; i++) {
      const playlist = this.state.userplay[i];
      pl.push(
        <Button onClick={() => this.handleChangePlaylist(playlist)} variant="info">
          {playlist.name}
        </Button>
      );
    }
    return (
      <ButtonGroup vertical className="justify-content-center">
        {pl}
      </ButtonGroup>
    );
  }

  FormToCreate() {
    return (
      <Row className="justify-content-md-center">
        <Form inline onSubmit={this.handleSubmit}>
          <Form.Control type="text" onChange={this.handleChange} placeholder="Playlist name"></Form.Control>
          <Button variant="primary" type="submit">Done</Button>
          <Button variant="danger" onClick={this.handleCancel}>Cancel</Button>
        </Form>
      </Row>
    );
  }

  UserInformation() {
    let user = null;
    if (this.state.userData !== null) {
      user = (
        <Container>
          <Row>
            <Col>
              <Image src={this.state.userData.images[0].url} roundedCircle></Image>
            </Col>
            <Col>
              <h1>{this.state.userData.display_name}</h1>
              <h2>{this.state.userData.email}</h2>
              <Badge variant="primary">{this.state.userData.product}</Badge>
            </Col>
          </Row>
        </Container>
      );
    }
    return user;
  }

  ShowSuccess() {
    let res = null;
    if (this.state.success) {
      res = (
        <Alert variant="success" dismissible onClose={() => { this.setState({ success: false }); }} >
          <Alert.Heading>Success!</Alert.Heading>
          <p>
            Playlist was created with success!
          </p>
        </Alert>
      );
    }
    return res;
  }

  render() {
    let form = null;
    let playlist = null;
    if (this.state.form){
      form = this.FormToCreate();
    }

    if (this.state.currentPlist !== null) {
      playlist = <Playlist info={this.state.currentPlist} ></Playlist>;
    }

    return (
      <Container fluid>
        {this.UserInformation()}
        <Container>
          <Row fluid className="justify-content-md-center">
            {form}
            {this.ShowSuccess()}
          </Row>
          <Row>
            <Col md={2}>
              <Breadcrumb>
                <h2>Playlists:</h2><Button onClick={this.handleCreate}>Create</Button>  
                {this.GroupPlaylists()}
              </Breadcrumb>
            </Col>
            <Col >
              {playlist}
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Profile
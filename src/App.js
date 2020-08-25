import React from 'react';
import logo from './logo.svg';

import { Route, Switch } from "react-router-dom";
import { Container     } from "react-bootstrap";
import './App.css';

//Components
import Navigation from "./components";

//Views
import Home from "./home";
import Songs from "./song";
import Profile from "./profile";

function App() {
  return (
    <div id="app" className="d-flex flex-column h-100">
      <Navigation />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/songs" component={Songs}></Route>
          <Route path="/me" component={Profile}></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;

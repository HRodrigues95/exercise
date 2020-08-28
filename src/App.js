import React from 'react';

import { Route, Switch } from "react-router-dom";
import { Container     } from "react-bootstrap";
import './App.css';

//Components
import Navigation from "./components";

//Views
import { Home, Profile,Song, Artist, Redirect } from "./Views";

function App() {
  return (
    <div id="app" className="d-flex flex-column h-100">
      <Navigation />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/song/:id" component={Song}></Route>
          <Route exact path="/artist/:id" component={Artist}></Route>
          <Route path="/me" component={Profile}></Route>
          <Route path="/login" component={Redirect}></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;

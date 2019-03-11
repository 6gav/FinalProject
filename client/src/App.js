import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js';
import Grid from './components/Grid.js';
import {Switch, Route,Router} from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props)
    this.p = this;
  }
  onPositionClick = (event) => {
    let message = "You clicked on cell ["+event.x+", "+event.y+"]"
    this.setState({
      clickPos:event,
      message:message,
      msgId: this.state.msgId+1,
    })
    
  }

  render() {
    const Ap = () => (
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Game' component={Grid} onPositionClick={this.onPositionClick}/>
        </Switch>
    );
    return (
        <Route>
          <Ap/>
        </Route>
    );
  }
}

export default App;

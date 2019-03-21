import React, { Component } from 'react';
import './App.css';
import About from './components/pages/About'
import Header from './components/layouts/Header'
import Home from './components/pages/Home.js';
import Grid from './components/layouts/Grid.js';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { Registration } from './components/pages/Registration';
import Debugger from "./components/layouts/Debugger"
import Interface from './components/layouts/Interface';

const version = "v0.0.2."
class App extends Component {
  state={
    gridSize:20,
    gridSpacing:20
  }
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
  hasAuthuser = () => {
    return false
  }
  onDebugValuesChange = (data)=>{
    this.setState({gridSize:data.gridSize,gridSpacing:data.gridSpacing})
    console.log(data)
  }

  GameSpace = <div><Grid  gridSize={this.state.gridSize} gridSpacing={this.state.gridSpacing} onPositionClick={this.onPositionClick}></Grid><Interface></Interface></div>
  render() {
    return (
      
      <Router>
        <div className = "App">
          <div className="Container">
            <Header hasAuthuser={this.hasAuthuser}/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/game' render={() =>this.GameSpace} />
              <Route exact path='/about' render={()=><About props={{version:version}}/>} />
              <Route exact path='/signin' render={()=><Registration props={{version:version}}/>}/>
            </Switch>
            <Debugger onDebugValuesChange={this.onDebugValuesChange}></Debugger>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

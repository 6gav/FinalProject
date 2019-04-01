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


const uuidv1 = require('uuid/v1');
const version = "v0.0.4."

const PromptOneChoice=(message,event=null)=>{
  let msg = {
    question:message,
    choices:[{Action:{text:"Continue",event:event}}],
    answer:null
    }
  return msg;
}
const PromptMultipleChoice = (caption,messages,events=null)=>{
  let choices = [];
  messages.map((message) =>{
    choices.push({Action:{text:message}})
  })
  if(events){
    events.map((event) =>{
      choices.push({Action:{event:event}})
    })
  }
  return {
    question:caption,
    choices:choices,
    answer:null
    }
}

class App extends Component {
  state={
    gridSize:30,
    gridSpacing:24,
    showDebug:true,
    messages:[],//array of message objects. objects have an id, along with data containing the string of the message.
    choice:PromptOneChoice("Cee",this.onClosePrompt),
  }
  
  
  constructor(props){
    super(props)
    this.p = this;
    this.state.choice.choices[0].event = this.onClosePrompt
  }
  onClosePrompt = (event) =>{
    //event.preventDefault()
    this.setState({choice:null})
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
  AddMessage = (message) =>{
    message.id = uuidv1()
    this.state.messages.push(message);

    //force update
    this.setState(this.state);
    

  }

  onDebugValuesChange = (data)=>{
    console.log(data)
    //this.setState({gridSize:data.gridSize,gridSpacing:data.gridSpacing})
    let gridSize = data.gridSize
    let gridSpacing = data.gridSpacing

    gridSize = gridSize<15?15:gridSize
    gridSize = gridSize>70?70:gridSize
    gridSpacing = gridSpacing<5?5:gridSpacing
    gridSpacing = gridSpacing>30?30:gridSpacing
    
    this.state.gridSize = gridSize
    this.state.gridSpacing = gridSpacing
    this.setState(this.state)
    console.log(this.state)
  }
  OnChoice = (target) =>{
    console.log("You hit one of the choices")
  }
  render() {
    const SinglePlayerGame= (<div className="GameSpace">
      <Grid choice={this.state.choice} OnChoice={this.OnChoice} gridSize={this.state.gridSize} gridSpacing={this.state.gridSpacing} onPositionClick={this.onPositionClick}></Grid></div>);
    const MultiPlayerGame = (<div className="GameSpace">
      <Grid choice={this.state.choice} OnChoice={this.OnChoice} gridSize={this.state.gridSize} gridSpacing={this.state.gridSpacing} onPositionClick={this.onPositionClick}></Grid>
      <Interface onDebugValuesChange={this.onDebugValuesChange} messages={this.state.messages} AddMessage={this.AddMessage}></Interface></div>);
    
    return (
      
      <Router>
        <div className = "App">
          <div className="Container">
            <Header hasAuthuser={this.hasAuthuser}/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/simulation_s' render={() =>SinglePlayerGame} />
              <Route exact path='/simulation_m' render={() =>MultiPlayerGame} />
              <Route exact path='/about' render={()=><About props={{version:version}}/>} />
              <Route exact path='/signin' render={()=><Registration props={{version:version}}/>}/>
            </Switch>
            {/*
            */}
            <Debugger gridSize={this.state.gridSize} gridSpacing={this.state.gridSpacing} AddMessage={this.AddMessage} onDebugValuesChange={this.onDebugValuesChange}></Debugger>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

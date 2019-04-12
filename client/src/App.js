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
//TODO: revise code.
//TODO: Cell Personalize objects
//cowboy hat leather chaps
const uuidv1 = require('uuid/v1');
const version = "v0.1.3."


const PromptOneChoice=(message,event=null)=>{
  let msg = {
    callback:event,
    question:message,
    choices:[{Action:{text:"Continue"}}],
    answer:null
    }
  return msg;
}
const PromptMultipleChoice = (caption,messages,event)=>{
  let choices = [];
  messages.map((message) =>{
    choices.push({Action:{text:message}})
  })
  /*
  console.log("hiyaaa")
  console.log(caption)
  console.log(messages)
  console.log(event)
 */
  if(event){
    for (let i = 0; i < choices.length; i++) {
      choices[i].Action.event = event
    }
    console.log(choices.length)
  }
  return {
    callback:event,
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
    user:null,
    messages:[],//array of message objects. objects have an id, along with data containing the string of the message.
    choice:null,//,PromptOneChoice("Press the button to begin.",this.onClosePrompt),
  }
  
  
  constructor(props){
    super(props)
    this.p = this;
    this.state.choice = PromptMultipleChoice("What's your favorite color","Red,Blue,Green,Yellow,beige,darkmagenta,tomato,white,wheat,limegreen,peachpuff,salmon".split(','),this.onClosePrompt)
    //this.state.choice.choices[0].event = this.onClosePrompt
  }
  OnChoice = (target) =>{
    console.log("You hit one of the choices")
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
  MakeChoice = (choice) => {
    choice.callback = this.onClosePrompt
    this.setState({choice:choice})
  }
  onDebugValuesChange = (data)=>{
    console.log(data)
    //this.setState({gridSize:data.gridSize,gridSpacing:data.gridSpacing})
    let gridSize = data.gridSize
    let gridSpacing = data.gridSpacing

    gridSize = gridSize<12?12:gridSize
    gridSize = gridSize>70?70:gridSize
    gridSpacing = gridSpacing<5?5:gridSpacing
    gridSpacing = gridSpacing>100?100:gridSpacing
    
    this.state.gridSize = gridSize
    this.state.gridSpacing = gridSpacing
    this.setState(this.state)
    console.log(this.state)
  }
  
  render() {
    const SinglePlayerGame= (<div className="GameSpace">
          <Grid onClosePrompt={this.onClosePrompt}choice={this.state.choice} OnChoice={this.OnChoice} gridSize={this.state.gridSize} gridSpacing={this.state.gridSpacing} onPositionClick={this.onPositionClick}></Grid></div>);
        const MultiPlayerGame = (<div className="GameSpace">
        <Grid choice={this.state.choice} OnChoice={this.OnChoice} gridSize={this.state.gridSize} gridSpacing={this.state.gridSpacing} onPositionClick={this.onPositionClick}></Grid>
          <Interface onDebugValuesChange={this.onDebugValuesChange} messages={this.state.messages} AddMessage={this.AddMessage}></Interface></div>);
          const CustomizeCell = (<div>
            <Grid choice={this.state.choice} OnChoice={this.OnChoice} gridSize={30} gridSpacing={40} onPositionClick={this.onPositionClick}></Grid>
            </div>
            )
    


    let MakeChoice = this.MakeChoice
    return (
      
      <Router>
        <div className = "App">
          <div className="Container">
            <Header hasAuthuser={this.hasAuthuser}/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/simulation_s' render={() =>SinglePlayerGame} />
              <Route exact path='/simulation_m' render={() =>MultiPlayerGame}  />
              <Route exact path='/simulation_editor' render={()=>CustomizeCell}/>
              <Route exact path='/about' render={()=><About props={{version:version}}/>} />
              <Route exact path='/signin' render={()=><Registration props={{version:version}}/>}/>
            </Switch>
            {/*
          */}
            <Debugger MakeChoice={MakeChoice} PromptMultipleChoice={PromptMultipleChoice} PromptOneChoice={PromptOneChoice} gridSize={this.state.gridSize} gridSpacing={this.state.gridSpacing} AddMessage={this.AddMessage} onDebugValuesChange={this.onDebugValuesChange}></Debugger>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

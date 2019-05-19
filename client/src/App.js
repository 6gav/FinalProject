import React, { Component } from 'react';
import './App.css';
import About from './components/pages/About'
import Header from './components/layouts/Header';
import Home from './components/pages/Home.js';
import Grid from './components/layouts/Grid.js';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { Registration } from './components/pages/Registration';
import Debugger from "./components/layouts/Debugger";
import Interface from './components/layouts/Interface';
import ProfilePage from "./components/pages/ProfilePage";
import Lobby from "./components/pages/Lobby";
import CellEditor from "./components/pages/CellEditor";


import openSocket from 'socket.io-client';

//#region cell imports.
import cell_body from './components/layouts/resources/cell/cell_body.png';
import color_mask_00 from './components/layouts/resources/cell/color_mask_00.png';
import color_mask_01 from './components/layouts/resources/cell/color_mask_01.png';
import color_mask_02 from './components/layouts/resources/cell/color_mask_02.png';
import color_mask_03 from './components/layouts/resources/cell/color_mask_03.png';
import color_mask_04 from './components/layouts/resources/cell/color_mask_04.png';
import color_mask_05 from './components/layouts/resources/cell/color_mask_05.png';
import color_mask_06 from './components/layouts/resources/cell/color_mask_06.png';
import color_mask_07 from './components/layouts/resources/cell/color_mask_07.png';
import color_mask_08 from './components/layouts/resources/cell/color_mask_08.png';
import color_mask_09 from './components/layouts/resources/cell/color_mask_09.png';
import color_mask_10 from './components/layouts/resources/cell/color_mask_10.png';
import color_mask_11 from './components/layouts/resources/cell/color_mask_11.png';
import color_mask_12 from './components/layouts/resources/cell/color_mask_12.png';
import color_mask_13 from './components/layouts/resources/cell/color_mask_13.png';

import expression_0 from './components/layouts/resources/cell/expression_0.png'
import expression_1 from './components/layouts/resources/cell/expression_1.png'
import expression_2 from './components/layouts/resources/cell/expression_2.png'
import expression_3 from './components/layouts/resources/cell/expression_3.png'
import expression_4 from './components/layouts/resources/cell/expression_4.png'
import expression_5 from './components/layouts/resources/cell/expression_5.png'

const expressions = 
[
  expression_0,
  expression_1,
  expression_2,
  expression_3,
  expression_4,
  expression_5
]
const colors = 
[
  color_mask_00,
  color_mask_01,
  color_mask_02,
  color_mask_03,
  color_mask_04,
  
  color_mask_05,
  color_mask_06,
  color_mask_07,
  color_mask_08,
  color_mask_09,
  
  color_mask_10,
  color_mask_11,
  color_mask_12,
  color_mask_13,
]
//#endregion

//TODO: revise code.
//TODO: Cell Personalize objects
//cowboy hat leather chaps
const uuidv1 = require('uuid/v1');
const version = "v0.1.4.";
const socket = openSocket('http://localhost:5000')


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
  if(event){
    for (let i = 0; i < choices.length; i++) {
      choices[i].Action.event = event
    }
  }
  return {
    callback:event,
    question:caption,
    choices:choices,
    answer:null
    }
}

class App extends Component {
  //#region login

  
  LoginUser = (user) =>{
    localStorage.setItem('user', JSON.stringify({user:user}));
    this.setState({user:user})
  }
  GetUser = ()=>{
    let json = JSON.parse(localStorage.getItem('user'))
    
    if(json != null)
      return json.user;
    else return null;
  }
  LogoutUser = ()=>{
    localStorage.removeItem('user');
    this.setState({user:null})
  }
  //#endregion

  //gets local user cells
  GetCellsFromStorage=()=>{
    let cells = JSON.parse(localStorage.getItem("cells"))

    if(cells != null){
      cells = cells.cells
    }
    
    return cells==null?[]:cells
  }

  state={
    gridSize:30,
    gridSpacing:24,
    showDebug:true,
    user:this.GetUser(),
    //array of message objects. objects have an id, along with data containing the string of the message.
    messages:[],
    choice:null,
  }
  
  
  constructor(props){
    super(props)
    this.p = this;
    this.state.choice = null;
  }
  OnChoice = (target) =>{
    //TODO: send the choice the player made to the server
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
    return this.state.user!=null
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
    
    let gridSize = data.gridSize
    let gridSpacing = data.gridSpacing

    gridSize = gridSize<12?12:gridSize
    gridSize = gridSize>70?70:gridSize
    gridSpacing = gridSpacing<5?5:gridSpacing
    gridSpacing = gridSpacing>100?100:gridSpacing
    
    this.state.gridSize = gridSize
    this.state.gridSpacing = gridSpacing
    this.setState(this.state)
  }

  
  GetPlayers = (gameID) =>
  {
    //grabs list of players in current game
    console.log("Fetching Players")
    let players = null
      fetch('/api/GetPlayers', {
          method: 'POST',
          headers:{
              'Content-Type':'Application/json',
          },
          body: JSON.stringify({
            //pass in host's current game
            gameID:gameID
          })
      }).then(function(response) {
          players = response.players
          console.log(players)
          return players;
      }).then(function(json) {
      }).catch(function(error) {
      });
      return players;
  }
  SetCellSelection = (index) =>{
    //sends the server which cell current 
    //user will play as
    let user = this.state.user
    console.log(user.uid)
    
    fetch('/api/SetUserCell', {
      method: 'POST',
      headers:{
          'Content-Type':'Application/json',
      },
      body: JSON.stringify({
        //pass in host's current game
        uid:user.uid,
        index:index
      })
  }).then(function(response) {
      console.log(response)
  }).then(function(json) {
  }).catch(function(error) {
  });
  }
  CreateGame = () => {
    let user = this.GetUser();

      if(user == null){
        console.log("login required")
        alert("Please Login to continue.")
        return false;
      }
    let userID = user.uid,
    displayName = user.displayName;
    
    console.log(user);
    fetch('/api/CreateGame', {
      method: 'POST',
      headers:{
          'Content-Type':'Application/json',
      },
      body: JSON.stringify({
        userID:userID,
        displayName:displayName
      })
    }).then(function(response) {
       return response.json();
    }).then(function(json) {
      console.log(json)
    }).catch(function(error) {
      console.log(error);
    });
    return true;
  }
  StartGame = () =>{
    let user = this.state.user,userID=user.uid,displayName=user.displayName
    console.log(user)
    
    fetch('/api/StartGame', {
      method: 'POST',
      headers:{
          'Content-Type':'Application/json',
      },
      body: JSON.stringify({
        userID:userID,
        displayName:displayName
      })
    }).then(function(response) {
       return response.json();
    }).then(function(json) {
      console.log("Start Hello")
      console.log(json)
    }).catch(function(error) {
      console.log(error);
    });
    return true;
  }

  render() {
    let game_data={
      cell_body:cell_body,
      expressions:expressions,
      colors:colors,
    }

    const SinglePlayerGame= ()=>{
      //post start game to server
      


        return (<div className="GameSpace">
          <Grid onClosePrompt={this.onClosePrompt}choice={this.state.choice} 
          OnChoice={this.OnChoice} gridSize={this.state.gridSize} gridSpacing={this.state.gridSpacing} 
          onPositionClick={this.onPositionClick}  GetCellsFromStorage={this.GetCellsFromStorage}></Grid></div>);
          }
        const MultiPlayerGame = (<div className="GameSpace">
        <Grid choice={this.state.choice} OnChoice={this.OnChoice} gridSize={this.state.gridSize} gridSpacing={this.state.gridSpacing} onPositionClick={this.onPositionClick}></Grid>
          <Interface onDebugValuesChange={this.onDebugValuesChange} messages={this.state.messages} AddMessage={this.AddMessage}></Interface></div>);
          const CustomizeCell = ()=>{
            return (
              <CellEditor GetCellsFromStorage={this.GetCellsFromStorage}game_data={game_data}/>
            )
          }
    
    

    let MakeChoice = this.MakeChoice
    return (
      
      <Router>
        <div className = "App">
          <div className="Container">
            <Header hasAuthuser={this.hasAuthuser}/>
            <Switch>
              <Route exact path='/'   render={() => <Home CreateGame={this.CreateGame}/>}/>
              <Route exact path='/simulation_s'       render={() =><SinglePlayerGame/>} />
              <Route exact path='/simulation_m'       render={() =><MultiPlayerGame/>}  />
              <Route exact path='/simulation'         render={() =><Lobby  game_data={game_data} func={{StartGame:this.StartGame,GetCellsFromStorage:this.GetCellsFromStorage,GetPlayers:this.GetPlayers,SetCellSelection:this.SetCellSelection}}mode ={"singleplayer"}user={this.user}/>}/>
              <Route exact path='/simulation_editor'  render={()=><CustomizeCell game_data={game_data} user={this.state.user}/>}/>
              <Route exact path='/about'              render={()=><About          version={version}/>} />
              <Route exact path='/signin'             render={()=><Registration   version={version}LoginUser={this.LoginUser} hasAuthuser = {this.hasAuthuser}/>}/>
              <Route exact path='/profile'            render={()=><ProfilePage    version = {version} user={this.state.user} LogoutUser={this.LogoutUser}/>}/>
            </Switch>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

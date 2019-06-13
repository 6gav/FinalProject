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
import ReactTimeout from 'react-timeout';

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
import color_mask_14 from './components/layouts/resources/cell/color_mask_14.png';
import color_mask_15 from './components/layouts/resources/cell/color_mask_15.png';
import color_mask_16 from './components/layouts/resources/cell/color_mask_16.png';
import color_mask_17 from './components/layouts/resources/cell/color_mask_17.png';
import color_mask_18 from './components/layouts/resources/cell/color_mask_18.png';

import face_00 from './components/layouts/resources/cell/face_00.png'
import face_01 from './components/layouts/resources/cell/face_01.png'
import face_02 from './components/layouts/resources/cell/face_02.png'
import face_03 from './components/layouts/resources/cell/face_03.png'
import face_04 from './components/layouts/resources/cell/face_04.png'
import face_05 from './components/layouts/resources/cell/face_05.png'
import face_06 from './components/layouts/resources/cell/face_06.png'
import face_07 from './components/layouts/resources/cell/face_07.png'
import face_08 from './components/layouts/resources/cell/face_08.png'
import face_09 from './components/layouts/resources/cell/face_09.png'

import face_10 from './components/layouts/resources/cell/face_10.png'
import face_11 from './components/layouts/resources/cell/face_11.png'
import face_12 from './components/layouts/resources/cell/face_12.png'
import face_13 from './components/layouts/resources/cell/face_13.png'
import face_14 from './components/layouts/resources/cell/face_14.png'

import face_15 from './components/layouts/resources/cell/face_15.png'
import face_16 from './components/layouts/resources/cell/face_16.png'
import face_17 from './components/layouts/resources/cell/face_17.png'

const faces = 
[
  face_00,
  face_01,
  face_02,
  face_03,
  face_04,
  
  face_05,
  face_06,
  face_07,
  face_08,
  face_09,
  
  face_10,
  face_11,
  face_12,
  face_13,
  face_14,
  
  face_15,
  face_16,
  face_17,
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
  color_mask_14,
  
  color_mask_15,
  color_mask_16,
  color_mask_17,
  color_mask_18,
]
//#endregion

//TODO: revise code.
//TODO: Cell Personalize objects
//cowboy hat leather chaps
const uuidv1 = require('uuid/v1');
const version = "v0.4.2.";

const PromptOneChoice=(message,event=null)=>{
  let msg = {
    callback:event,
    question:message,
    choices:[{Action:{text:"Continue"}}],
    answer:null
    }
  return msg;
}


//caption: the text asking the user what they should do (string)
//messages: the choices for the user. (array of strings)
//
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
    console.log(user)
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
    console.log(cells)
    if(cells == null){
      cells = []
    }
    else
      cells = cells.cells
    
    let user_cells = []
    
    for(let i = 0; i < cells.length; i++){
      if(cells[i].user == this.state.user.displayName)
        user_cells.push(cells[i])
    }

    
    return user_cells
  }
  AddCellToStorage=(cell)=>{
    let cells = JSON.parse(localStorage.getItem("cells")).cells
    for(let i = 0; i < cells.length; i++){
      //cell exists in storage
      if(cells[i].name == cell.name){
        return false;
      }
    }
    console.log("HERE")
    console.log(cells)
    cells.push(cell)
    localStorage.setItem('cells', JSON.stringify({cells:cells}));
    return true;
  }
  RemoveCellFromStorage=(cell)=>{
    let cells = JSON.parse(localStorage.getItem("cells"))
    
    for(let i = 0; i < cells.length; i++){
      //cell exists in storage
      if(cells[i].name == cell.name){
        cells.splice(i)
        return true;
      }
    }
    return false;
  }

  state={
    gridSize:20,
    gridSpacing:50,
    showDebug:true,
    user:this.GetUser(),
    //array of message objects. objects have an id, along with data containing the string of the message.
    messages:[],
    choice:null//PromptMultipleChoice("What will you do","loot,heal,wander,fight,run".split(',')),
  }
  
  onIdle = () =>{
    //log the user out after 10 minutes of inactivity

    //if user is in a game, they will not be logged out as the 'simulation' is likely running

    //Todo: check if user is ingame
    this.setState({user:null})
  }
  constructor(props){
    super(props)
    this.p = this;
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
        
        window.location='/signin'
        return false;
      }
      console.log("Creating game")
    let userID = user.uid,
    displayName = user.displayName;
    let main = this;
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
      main.setState({gameID:json.gameID,hostID:json.hostID})
      console.log(json)
    }).catch(function(error) {
      console.log(error);
    });
    
    return true;
  }
  StartGame = () =>{
    let viewer = this;
    let user = this.state.user,userID=user.uid,
    gameID = 2000
    fetch('/api/StartGame', {
      method: 'POST',
      headers:{
          'Content-Type':'Application/json',
      },
      body: JSON.stringify({
        userID:userID,
        gameID:gameID
      })
    }).then(function(response) {
       return response.json();
    }).then(function(json) {
      console.log("Start Hello")
      viewer.setState({running:true})
      console.log(json)
    }).catch(function(error) {
      console.log(error);
    });
    window.location = '/simulation_s';
    return true;
    
  }

  render() {
    let game_data={
      cell_body:cell_body,
      faces:faces,
      colors:colors,
    }
    let user = this.state.user;
    const SinglePlayerGame= (props)=>{
      //post start game to server


        return (<div className="GameSpace">
          <Grid 
          gameID={2000}
          uid={this.state.user.uid}
          onClosePrompt={this.onClosePrompt}
          choice={this.state.choice} 
          OnChoice={this.OnChoice} 
          gridSize={this.state.gridSize} 
          gridSpacing={this.state.gridSpacing} 
          onPositionClick={this.onPositionClick}  
          GetCellsFromStorage={this.GetCellsFromStorage}
          user={user}>
          
          </Grid>
          <Interface onDebugValuesChange={this.onDebugValuesChange} messages={this.state.messages} AddMessage={this.AddMessage}></Interface>
          </div>);
          }
        const MultiPlayerGame = (<div className="GameSpace">
        <Grid 
        choice={this.state.choice} 
        OnChoice={this.OnChoice} 
        gridSize={this.state.gridSize} 
        gridSpacing={this.state.gridSpacing} 
        onPositionClick={this.onPositionClick}
        user={user}>
        
        </Grid>
          <Interface onDebugValuesChange={this.onDebugValuesChange} messages={this.state.messages} AddMessage={this.AddMessage}></Interface></div>);
          const CustomizeCell = ()=>{
            return (
              <CellEditor user={this.state.user}AddCellToStorage={this.AddCellToStorage}RemoveCellFromStorage={this.RemoveCellFromStorage}GetCellsFromStorage={this.GetCellsFromStorage}game_data={game_data}/>
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
              <Route exact path='/simulation_s'       render={() =><SinglePlayerGame gameID={this.state.gameID}/>} />
              <Route exact path='/simulation_m'       render={() =><MultiPlayerGame/>}  />
              <Route exact path='/simulation'         render={() =><Lobby  game_data={game_data} func={{StartGame:this.StartGame,GetCellsFromStorage:this.GetCellsFromStorage,GetPlayers:this.GetPlayers,SetCellSelection:this.SetCellSelection}}mode ={"singleplayer"}user={this.user}/>}/>
              <Route exact path='/simulation_editor'  render={()=><CustomizeCell game_data={game_data} user={user}/>}/>
              <Route exact path='/about'              render={()=><About          version={version}/>} />
              <Route exact path='/signin'             render={()=><Registration   version={version}LoginUser={this.LoginUser} hasAuthuser = {this.hasAuthuser}/>}/>
              <Route exact path='/profile'            render={()=><ProfilePage    version = {version} user={user} LogoutUser={this.LogoutUser}/>}/>
            </Switch>
          </div>  
        </div>
      </Router>
    );
  }
}

export default App;

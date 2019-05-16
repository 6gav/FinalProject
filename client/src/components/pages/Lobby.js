import React, { Component } from 'react'
import "./Lobby.css"
import CellList from './tools/CellList.js'
import RefButton from './tools/RefButton'

export default class Lobby extends Component {

    //this is where the 
    //game lobby will be held.
    //in the singleplayer

    state={
        host:null,
        gameID:2000,
        clientCell:null,
        cells:null,
        public:false
    }
    constructor(props){
        super(props)
    }
    componentDidMount(){
      if(this.state.players == null){
        this.setState({players:this.props.func.GetPlayers(this.props.gameID)})
        
      }
      if(this.state.cells == null){
        //if there is nothing to render
        let cells = this.props.func.GetCellsFromStorage();
        if(cells == null){
          //the player has not created a cell to play as.
          
        }
        this.setState({cells:cells})
      }
    }
    
    onCellSelected = (index)=>{
      //gets index of cell clicked on in the user's list of cells, 
      //then selects that cell as the playable one.
      //TODO: send selected cell index to server
      this.setState({clientCell:this.state.cells[index]})
      
      this.props.func.SetCellSelection(index)
      
    }
    GrabPlayers = () =>{
      console.log("GFE")
      console.log(this.state.gameID)
      console.log(this.props.func.GetPlayers(2000))
      console.log("Done.")
    }
    handleStartGame = (e) =>{
      e.target.disabled = true
      this.props.func.StartGame()
    }
    componentDidUpdate(){
      let startGameButton = document.getElementsByName("btnStartGame")[0]
      startGameButton.disabled=this.state.clientCell==null
    }
  render() {
      
    //e.target.disabled = true
      console.log(this.state)
      const cells = (this.state.cells)
    return (
    <div className="LobbyContainer">
      <div className="LobbyContainer">
        <div className="LobbyList">
            <h3 className="CenterText">Players</h3>
            <button onClick={this.GrabPlayers}/>
          <button className="button-bottom-elem"name="btnStartGame" type="button" onClick={this.handleStartGame}>Start Game</button>
        </div>
        <div className="LobbyList">
          <h3 className="CenterText">Cells</h3>
          {
            <CellList onCellSelected={this.onCellSelected}state={cells} cell_body={this.props.cell_body}></CellList>
          }
          <RefButton className="button-bottom-elem" href="/simulation_editor" id="Cell Selection" name="btn_home_cell_selection"text ="Edit Cells"></RefButton>      
        </div>
      </div>
    </div>
    )
  }
}

import React, { Component } from 'react'
import "./Lobby.css"
import CellList from './tools/CellList.js'

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
        this.setState({players:this.props.GetPlayers(this.props.gameID)})
        
      }
      if(this.state.cells == null){
        //if there is nothing to render
        let cells = this.props.GetCellsFromStorage();
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
    }
  render() {
      console.log(this.state)
      const cells = (this.state.cells)
    return (
    <div className="LobbyContainer">
      <div className="LobbyContainer">
        <div className="LobbyList">
            <h3 className="CenterText">Players</h3>
        </div>
        <div className="LobbyList">
          <h3 className="CenterText">Cells</h3>
          {
            <CellList onCellSelected={this.onCellSelected}state={cells} cell_body={this.props.cell_body}></CellList>
          }
        </div>
          
      </div>
    </div>
    )
  }
}

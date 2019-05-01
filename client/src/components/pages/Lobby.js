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
    onCellSelected = (index)=>{}
  render() {
      console.log(this.state)
      const cells = (this.state.cells)
    return (
    <div className="LobbyContainer">
      <div className="LobbyContainer">
        <div className="PlayerList">
            <h3>Players</h3>
        PlayerList
        </div>
        <div className="CellList">
          <h3>Cells</h3>
          CellList
          {
            <CellList onCellSelected={this.onCellSelected}state={cells} cell_body={this.props.cell_body}></CellList>
          }
        </div>
      </div>
    </div>
    )
  }
}

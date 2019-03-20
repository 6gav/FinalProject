import React, { Component } from 'react'
const debuggerStyles = {
    position:'absolute',
    backgroundColor:'#ccc',
    top:"2vh",right:"1vw",
    padding:'4px'
}

class Debugger extends Component {
    state={
        gridSize:50,
        gridSpacing:20,
        onDebugValuesChange:null
    }
    constructor(props){
        super(props)
        if(props.onDebugValuesChange)
        {
            this.state.onDebugValuesChange = props.onDebugValuesChange
        }
        
    }

    handleGridSize = (e) =>{
        let gridSize = e.target.value;
        gridSize = gridSize<15?15:gridSize
        gridSize = gridSize>70?70:gridSize
        this.setState({gridSize:gridSize})
        if(this.state.onDebugValuesChange){
            this.state.onDebugValuesChange({gridSize:gridSize})
        }
    
    }

    handleGridSpacing = (e) =>{
        let gridSpacing = e.target.value;
        
        gridSpacing = gridSpacing<5?5:gridSpacing
        gridSpacing = gridSpacing>30?30:gridSpacing

        this.setState({gridSpacing:gridSpacing})
        if(this.state.onDebugValuesChange){
            this.state.onDebugValuesChange({gridSpacing:gridSpacing})
        }
    }

  render() {
    return (
      <div style={debuggerStyles}>Debug Window
        <p><input type='number' value={this.state.gridSize} onChange={this.handleGridSize}></input>Grid size</p>
        <p><input type='number' value={this.state.gridSpacing} onChange={this.handleGridSpacing}></input>Spacing</p>
      </div>
    )
  }
}

export default Debugger;
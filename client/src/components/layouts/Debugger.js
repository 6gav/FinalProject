import React, { Component } from 'react'
const debuggerStyles = {
    position:'absolute',
    backgroundColor:'#ccc',
    top:"2vh",right:"1vw",
    padding:'4px'
}

class Debugger extends Component {
    state=
    {
        onDebugValuesChange:null,
        chatMessage:'',
    }

    updateGridValues = () => {
        console.log("hello")
        if(this.props.gridSize)
        {
            this.setState({gridSize:this.props.gridSize})
        }
        if(this.props.gridSpacing != this.state.gridSpacing)
        {
            this.setState({gridSpacing:this.props.gridSpacing})
        }
    }

    componentDidMount(){
    this.updateGridValues()
    }
    constructor(props)
    {
        super(props)
        this.updateGridValues()
        if(props.onDebugValuesChange)
        {
            this.state.onDebugValuesChange = props.onDebugValuesChange
        }
        
    }

    handleGridSize = (e) =>
    {
        let gridSize = e.target.value;
        this.setState({gridSize:gridSize})
        if(this.state.onDebugValuesChange){
            this.state.onDebugValuesChange({gridSize:gridSize})
        }
    
    }

    handleGridSpacing = (e) =>
    {
        let gridSpacing = e.target.value;
        

        this.setState({gridSpacing:gridSpacing})
        if(this.state.onDebugValuesChange)
        {
            this.state.onDebugValuesChange({gridSpacing:gridSpacing})
        }
    }
    HandleChatMessage = (e) =>
    {
        let chatMessage = e.target.value
        this.setState({chatMessage:chatMessage})
    }

    SubmitMessage = (e) =>
    {
        e.preventDefault()
        let msg = this.state.chatMessage
        if(msg.length > 0)
        {
            this.props.AddMessage({sender:'Debug',data:msg})
        }
        this.setState({chatMessage:''})
    }
  render() 
  {
    return (
      <div style={debuggerStyles}>Debug Window
        <p><input type='number' value={this.state.gridSize} onChange={this.handleGridSize}></input>Grid size</p>
        <p><input type='number' value={this.state.gridSpacing} onChange={this.handleGridSpacing}></input>Spacing</p>
        <form onSubmit={this.SubmitMessage}><input type='text' value={this.state.chatMessage} onChange={this.HandleChatMessage} placeholder={'enter chat message'}/></form>
      </div>
    )
  }
}

export default Debugger;
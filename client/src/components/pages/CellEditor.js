import React, { Component } from 'react'
import './CellEditor.css'
import CellList from './tools/CellList.js'



class CellEditor extends Component {


    GetCellsFromStorage=()=>{
        let cells = JSON.parse(localStorage.getItem("cells")).cells
        console.log(cells)
        console.log("efea")
        return cells==null?[]:cells
      }
    
    componentDidMount(){
        
    }
    constructor(props){
        super(props);
        this.state.color = props.colors[0]
        this.state.face = props.expressions[0]
        this.state=this.initState
        //clears the local cells vvv
        //localStorage.setItem("cells",JSON.stringify({cells:[]}))
        
    }
    
    initState = {
        color:this.props.colors[0],
        face:this.props.expressions[0],
        name:"",
        cells:this.GetCellsFromStorage()
    }
    state=this.initState;
    ChangeFace = (e) =>{
        console.log(e.target.ind)
        this.setState({face:e.target.src})
    }
    ChangeColor = (e) =>{
        this.setState({color:e.target.src})
    }
    SaveCell = (e) =>{
        e.preventDefault()
        let cell = {
            color:this.state.color,
            face :this.state.face,
            name :this.state.name
        }
        if(cell.name == ""){
            return;
        }
        this.setState(
            this.initState
        )
        console.log(this.state.cells)
        this.state.cells.push(cell)
        //TODO: the storage overwrites existing cells
        localStorage.setItem('cells', JSON.stringify({cells:this.state.cells}));
        console.log("Saving cell")
    }
    HandleNameChange = (e) =>{
        this.setState({name:e.target.value})
    }
  render() {
      let props = this.props,
      i = 0,j=0
      console.log(this.props)
    return (
        <div>
            <div className='BtnContainer'>
            {
                props.colors.map(
                    (color)=>{
                        i++
                        return <img className='Button' ind={i}src={color}onClick={this.ChangeColor}/>
                    }
                    )
            }
            </div>
            
            <div className='BtnContainer'>
                {
                    props.expressions.map(
                        (expression)=>{
                            j++
                            return <img className='Button' ind={j}src={expression} onClick={this.ChangeFace}/>
                        }
                    )
                }
            </div>
            <div className='Preview'>
            <div className='Preview'>
                
                <img className='Body' src={this.props.cell_body}></img>
                <img className='Color' src={this.state.color}></img>
                <img className='Face' src={this.state.face}></img>
                </div>
                <form onSubmit={this.SaveCell}>
                    <input type='text' onChange={this.HandleNameChange} placeholder='Name this cell'/>
                    <input type='submit' value='Save'/>                    
                    <CellList state={this.state.cells} cell_body={this.props.cell_body}></CellList>

                </form>
            </div>
            <div className='CellListContainer'>
            </div>
        </div>
    )
  }
}

export default CellEditor;
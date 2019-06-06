import React, { Component } from 'react'
import './CellEditor.css'
import './Cell.css'
import CellList from './tools/CellList.js'
import { userInfo } from 'os';



class CellEditor extends Component {
    
    componentDidMount(){
        if(this.state.cells == null){
            let cells = this.props.GetCellsFromStorage()
            if(cells != null){
                this.setState({cells:cells})
            }
        }
    }
    constructor(props){
        super(props);
        this.state=this.initState
        //clears the local cells vvv
        //localStorage.setItem("cells",JSON.stringify({cells:[]}))
        
    }
    
    initState = {
        color:this.props.game_data.colors[0],
        face:this.props.game_data.faces[0],
        name:"",
    }
    state=this.initState;
    ChangeFace = (e) =>{
        this.setState({face:e.target.getAttribute("src")})
    }
    ChangeColor = (e) =>{
        this.setState({color:e.target.getAttribute("src")})
    }
    SaveCell = (e) =>{
        e.preventDefault()
        let cell = {
            color:this.props.game_data.colors[this.state.color],
            face :this.props.game_data.faces[this.state.face],
            name :this.state.name,
            user :this.props.user.displayName,
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
        this.props.AddCellToStorage(cell)
        
        console.log("Saving cell")
    }
    HandleNameChange = (e) =>
    {
        this.setState({name:e.target.value})
    }
    CopyCell = (cell)=>
    {
        this.setState({color:cell.color,face:cell.face,name:cell.name})
    }
  render() {
      let props = this.props,
      i = 0,j=0
      //console.log(this.props)
    return (
        <div>
            <div className='BtnContainer'>
            {
                props.game_data.colors.map(
                    (color)=>{
                        i++
                        return <img className='Button' name={`cell_color_${i}`} ind={i}src={color}onClick={this.ChangeColor}/>
                    }
                )
            }
            </div>
            
            <div className='BtnContainer'>
                {
                    props.game_data.faces.map(
                        (face)=>{
                            j++
                            return <img className='Button'  name={`cell_face_${j}`}ind={j}src={face} onClick={this.ChangeFace}/>
                        }
                    )
                }
            </div>
            <div className='Preview'>
                <div className='Preview'>
                    <div style={{position:'relative'}}>
                        <img className='Body' src={this.props.game_data.cell_body}></img>
                        <img className='Color' src={this.state.color}></img>
                        <img className='Face' src={this.state.face}></img>
                    </div>
                </div>
                <form onSubmit={this.SaveCell}>
                    <input type='text'  name="cell_name"onChange={this.HandleNameChange} value={this.state.name} placeholder='Name this cell'/>
                    <input type='submit'name="cell_form_submit" value='Save'/> 
                </form>
            </div>
            <div className='CellListContainer'>
                    <CellList state={this.state.cells} cell_body={this.props.cell_body} onClickCell={this.CopyCell}></CellList>
            </div>
        </div>
    )
  }
}

export default CellEditor;
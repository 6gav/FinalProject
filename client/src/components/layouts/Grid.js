import React, {Component} from 'react'
import ChoicePrompt from './ChoicePrompt'
import './Grid.css'
import Cell from './resources/Cell.js'
//import posmark from '../rescources/position_marker.png'
//import { debug } from 'util';
const GRID_WIDTH = 40,GRID_HEIGHT = 40;//Default grid dimensions are 40x40
const GRID_SPACING=20;

//#region Tools
const RanRange = function(min,max,integer=true){
    let val = min+(Math.random()*(max-min))
    if(integer)
    {
        val = Math.floor(val)
    }
    return val;
  }
  //#endregion


/*
const a =() =>{
    return(
    <div x={cell.x} y = {cell.y} 
    key={`${cell.x},${cell.y}`}
    color={cell.color}
    face={cell.face}/>
    )
}
*/
const RenderCells = (props)=>{
    let cells = null//props.state.cells;
    if(props.chars){
        return(
            chars.map(char=>(
                <Cell 
                char={char}
                dimensions = {props.state.dimensions}
                />
            ))
        )
    }
    if(cells)
    {
        return(
            cells.map(
                cell=>(
                    <Cell 
                    x={cell.x} y = {cell.y} 
                    key={`${cell.x},${cell.y}`}
                    color = {props.color} 
                    face={cell.face}
                    dimensions = {props.state.dimensions}
                    />
                )
            )
        )
    }
}
function RenderChoicePrompt(props)
{
    if(props.choice){
        return (
        <div>
            <ChoicePrompt onClosePrompt={props.onClosePrompt} choice={props.choice} OnChoice={props.OnChoice}/>
        </div>
        )
    }
    else{
        return null;
    }
}
class Grid extends Component{
    state = {
        cells: [],//list of occupied cells and contents
        interval: 100,//interval between automatic updates
        isRunning: false,//wether or not the grid should update automatically
        dimensions:{
            X:GRID_WIDTH,
            Y:GRID_HEIGHT,
            Spacing:GRID_SPACING,
        },//default dimensions
        color:"#c00",
        

        onPositionClick:null,//Container for calling events occuring when Grid is clicked

        
    }
    construct = () => {
        let size = this.props.gridSize
        let spacing = this.props.gridSpacing

        // eslint-disable-next-line
        if(size!=this.state.gridSize){
            this.setState({gridSize:this.props.gridSize})
        }
        // eslint-disable-next-line
        if(spacing != this.props.gridSpacing){
            this.setState({gridSpacing:this.props.gridSpacing})
        }
        // eslint-disable-next-line
        this.state.dimensions.X = this.props.gridSize?this.props.gridSize:this.state.dimensions.X
        // eslint-disable-next-line
        this.state.dimensions.Y = this.props.gridSize?this.props.gridSize:this.state.dimensions.Y
        // eslint-disable-next-line
        this.state.dimensions.Spacing=this.props.gridSpacing?this.props.gridSpacing:this.state.dimensions.Spacing
        
        this.rows = this.state.dimensions.X;
        this.cols = this.state.dimensions.Y;
        
    }
    constructor(props){
        super(props);
        this.construct()
        
        this.makeCells = this.makeCells.bind(this)
        
        this.board = this.makeEmptyBoard();
        this.state.cells = this.makeCells();
        this.state.onPositionClick = props.onPositionClick?props.onPositionClick:null;
        //
    }

    //create an empty board  
    //alligns occupied cells with
    //position clicks on the grid
    makeEmptyBoard(){
        let board = [];
        for(let y = 0; y < this.rows; y++){
            board[y] = [];
            for(let x = 0; x < this.cols; x++){
                // eslint-disable-next-line
                board[y][x] = false;
            }
        }
        
        board[10][20] = true
        return board;
    }
    
    //calls the server for all items rendered on grid
    makeCells(){
        let cells=[];

        //api call (top,left,width,height)
        //returns: list of occupied cells
        
        
        for(let y = 0; y < this.rows; y++){
            for(let x = 0; x < this.cols; x++){
                if(this.board[y][x]){
                    
                    cells.push({x:x,y:y,color:'#444'})
                }
            }
        }
        return cells;
    }

    //returns the mouse position relative to the position of the screen.
    getElementOffset(){
        //the ClientRect dimensions of the board component
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return ({
            x: (rect.left+window.pageXOffset-window.scrollX) - doc.clientLeft,
            y: (rect.top +window.pageYOffset-window.screenY) - doc.clientTop ,
        });
    }

    //event called when the player clicks a position on the grid.
    //if the state's onPositionClick event is not null, 
    //will pass in the x and y values to the event
    handleClick = (event) =>{
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / this.state.dimensions.Spacing);
        const y = Math.floor(offsetY / this.state.dimensions.Spacing);
        if(x >= 0 && x <= this.cols && y  >= 0 && y <= this.rows){
            if(this.board[y][x]){
                if(this.state.onPositionClick){
                    console.log("Clicked on: ("+x+','+y+').')
                    this.state.onPositionClick({x:x,y:y,obj:this.board[y][x]})
                }
            }
        }else{
            console.log("Clicked on but outside bounds?")
        }
        this.setState();
    }
    handleChoice = (choice) =>{
        let color = choice.Action.text;
        
        this.setState({color:color})
    }
    //on initial mount, initializes base onscreen obj values
    
    componentDidUpdate(){
        this.construct()
        
        this.board = this.makeEmptyBoard();
        // eslint-disable-next-line
        this.state.cells = this.makeCells();
    }

    componentDidMount(){
        const {cells} = this.state;
        this.state.onPositionClick = (data) =>{
            this.board[data.y][data.x] = true;
        }

        if(this.props.app){
            this.props.app.setState({players:{
                count:(cells.length),
                players:cells,
            }})
        }
    }
    
    render(){
        const{ cells } = this.state.cells;
        
        const Lnkbtn = (props) =>
        {
            return (
            <div className = 'LinkContainer'>
            <a className="button"  href = {props.href}>{props.text}</a>
            </div>
            );
        };
        let sp = this.state.dimensions.Spacing,
        w = this.state.dimensions.X*sp,
        h = this.state.dimensions.Y*sp,
        handleChoice = this.handleChoice
        return (
            <div>
                <Lnkbtn href='/' text='🢠'></Lnkbtn>
                <div className='GridContainer'>
                    <div className='Grid' style={{width: w,height: h,
                    backgroundSize: `${sp}px ${sp}px`}}
                    onClick={this.handleClick}
                    //stores reference to the div inside of simulation
                    ref={(_ref) => {this.boardRef = _ref;}}>
                    {
                        <RenderCells state = {this.state} color={this.state.color}/>
                    } 
                    </div>
                        {
                            <RenderChoicePrompt onClosePrompt={this.props.onClosePrompt} isTrue={true} choice={this.props.choice} callback={this.props.callback} OnChoice={handleChoice}/>
                        }
                </div>
            </div>
        );
    }
}


export default Grid;
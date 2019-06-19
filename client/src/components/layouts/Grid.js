import React, {Component} from 'react'
import ChoicePrompt from './ChoicePrompt'
import './Grid.css'
import Cell from './resources/Cell'
import cell_primary from './resources/cell/color_mask_00.png'
import tempPrimary from './resources/cell/color_mask_17.png'
import tempSecondary from './resources/cell/face_01.png'


import { Socket } from 'dgram';

const uuidv1 = require('uuid/v1');
const GRID_WIDTH = 50,GRID_HEIGHT = 10;//Default grid dimensions are 40x40
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

const RenderCells = (props)=>{
    //this function will draw all 
    //of the cells on their 
    //relative grid position
    let visualRender = props.GetCellsFromStorage();
    
    let cells = props.cells
    //console.log("CELLS")
    // console.log(cells)
    

    if(cells){
        //console.log(props)
        for(let i = 0; i < cells.length; i++){
            cells[i].ind = i;
            if(cells[i].displayName ==props.displayName){
                //console.log(visualRender[0])
            }
        }
          return (
              cells.map(cell =>
                (
                    <Cell 
                    char={cell}
                    x={cell.position.x}
                    y={cell.position.y}
                    key={uuidv1()}//{`${cell.position.x},${cell.position.y}`}
                    color={props.color}
                    image={cell.displayName==props.displayName?props.GetCellSelected():null}
                    ind={cell.ind}
                    cell_primary={tempPrimary}//{cell.primary}
                    cell_secondary = {tempSecondary}//{cell.secondary}
                    dimensions={{Spacing:props.gridSpacing}}
                    />
                )
              
                
              )
          )
      }else{
          //console.log("Cells returned null")
          return <div/>
      }

  }

  function OpenChoicePrompt(props){
      /*
      this function opens a message 
      prompt with options for the 
      player to make a choice
      */
    let render = null
    if(props.choice){
        render = (
            <div>
                <ChoicePrompt user={props.user} gameID={props.gameID} onClosePrompt={props.onClosePrompt} choice={props.choice} OnChoice={props.OnChoice}/>
            </div>
            )
    }

    return render
  }

  const MockCell = (x,y,cell,primary,secondary) =>{
      //gets a fake cell with random components
      if(cell == null){
          cell = {primary:primary,secondary:secondary}
      }
      cell.x = x
      cell.y = y
      return cell
  }
  const GetStorage = ()=>{
    let cells = JSON.parse(localStorage.getItem("cells"))

    if(cells != null){
      cells = cells.cells
    }
    cells.x = Math.floor(Math.random()*10)
    cells.y = Math.floor(Math.random()*10)
    return cells==null?[]:cells
  }
  class Grid extends Component{
      state = {
          cells:[],//list of data occupying cells
          interval: 100,//interval between screen updates
          isRunning: true,//if the grid should update automatically
          
          color:"#c00",
          onPositionClick:null,//function(s) to call when the grid is clicked.
        }

        setCellInterval = ()=>{
           /* 
            let intervalID = setInterval(() => {
                //console.log("HI")
                this.makeCells()
                this.setState({})
            }, 1000);
            */
           let intervalID=null;
            
            this.setState({intervalID:intervalID})
        }
        clearInt = ()=>{
            clearInterval(this.state.intervalID)
            
            this.setState({isRunning:false})//!this.state.isRunning})
        }
        makeCells = () =>{
        //api call (top,left,width,height)
        let gridSp = [];
        //console.log(`Game ID: ${this.props.gameID}\nUser ID: ${this.props.uid}`)
        let gridRef=this;
            //todo: fetch map
            let jdata = 
            {
                gameID: this.props.gameID,
                uid: this.props.uid,
                rect:{top:0,left:0,width:GRID_WIDTH,height:GRID_HEIGHT}
            }
            const cb = (resp)=>{
                this.setState({cells:resp})
            }
            //returns: list of occupied cells
            let _cells = this.props.GetMap(jdata,cb),i=0,container = null;
            for(; i < gridSp.length; i++){
                    container = gridSp[i];
                    console.log (container);
                    if(container != null){
                        if(container.objects != null){
                            _cells.push(container);
                        }
                    }
                }
            //console.log(_cells)
            gridRef.state.cells = _cells
            let storage = GetStorage()
        
        
        }
        
      constructor(props)
      {
        super(props)
        let size = props.gridSize,
        spacing = props.gridSpacing;
        
        this.rows = props.gridSize;
        this.cols = props.gridSize;
        this.makeCells()
        let user = props.user
        //////console.log("Here")
        ////console.log(user)

          this.setCellInterval();
          //this.makeCells()
        
        
      }


      getElementOffset = () =>{
          const rect = this.gridRef.getBoundingClientRect();
          const doc = document.documentElement;

          return({
              x: (rect.left+window.pageXOffset-window.scrollX) - doc.clientLeft,
              y: (rect.top +window.pageYOffset-window.screenY) - doc.clientTop ,
          })
      }
      //event called when the player clicks a position on the grid.
    //if the state's onPositionClick event is not null, 
    //will pass in the x and y values to the event
    handleClick = (event) =>{ 
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / this.props.gridSpacing);
        const y = Math.floor(offsetY / this.props.gridSpacing);
        if(x >= 0 && x <= this.cols && y  >= 0 && y <= this.rows){
                if(this.state.onPositionClick){
                    this.state.onPositionClick({x:x,y:y,obj:this.board[y][x]})
            }
        }else{}
        this.setState();
    }
    CreateChoicePrompt = ()=>{
        this.props.onChoiceMade("What will you do","loot,fight,flee".split(','),this.props.ClearScreen)
    }
    handleChoice = (choice) =>{
        let color = choice.Action.text;
        
        this.setState({color:color})
    }

    componentDidUpdate(){
        this.makeCells();
    }
    componentWillUnmount(){
    }
      render(){
          let { cells } = this.state;
          //console.log(cells)
          
          let sp = this.props.gridSpacing,
          w = this.props.gridSize*sp,
          h = this.props.gridSize*sp,
          state = this.state,
          handleChoice = this.handleChoice
          const stateset=()=>{
              this.setState({})
            }
          const showcell=()=>{
              //console.log(this.state.cells)
        }
        //console.log(this.props.GetCellSelected(0));
            return (<div>
              <button name="btn_back" id="SinglePlayer" onClick={()=>{window.location = '/'}} >🢠</button>
                        
              <div className='GridContainer'>
                <div className='Grid'
                style={{
                    width:w,
                    height:h,
                    backgroundSize:`${sp}px ${sp}px`,
                    
                }} 
                onClick={this.handleClick}
                ref={(_ref)=>{this.gridRef = _ref;}}
                >
                
                    <RenderCells user={this.props.user}GetCellSelected={this.props.GetCellSelected}displayName={this.props.user.displayName}GetCellsFromStorage={this.props.GetCellsFromStorage}makeCells={this.makeCells}cells={this.state.cells} gridSpacing={this.props.gridSpacing} color={this.state.color}cell_body={this.props.cell_body}/>
                
                </div>
                {
                    <OpenChoicePrompt gameID={this.props.gameID} user={this.props.user} onClosePrompt={this.props.onClosePrompt} isTrue={true} choice={this.props.choice} callback={this.props.callback} OnChoice={handleChoice}/>
                }
              </div>
              <button onClick={this.CreateChoicePrompt}>Choice</button>
              
            
          </div>)
      }
  }


  export default Grid;
import React, {Component} from 'react'
import ChoicePrompt from './ChoicePrompt'
import './Grid.css'
import Cell from './resources/Cell'
import cell_primary from './resources/cell/color_mask_00.png'


require('../layouts/resources/api.js')
const socket = global.SocketApi;


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

  const RenderCells = (props)=>{
      //this function will draw all 
      //of the cells on their 
      //relative grid position

      let cells = props.cells
      console.log("CELLS")
      console.log(cells)
      if(cells){
          return (
              cells.map(cell =>
                (
                  <Cell 
                  x={cell.x}
                  y={cell.y}
                  key={`${cell.x},${cell.y}`}
                  color={props.color}
                  cell_primary={cell.primary}
                    cell_secondary = {cell.secondary}
                  dimensions={{Spacing:props.gridSpacing}}
                  />
              )
              )
          )
      }else{
          console.log("Cells returned null")
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
                <ChoicePrompt onClosePrompt={props.onClosePrompt} choice={props.choice} OnChoice={props.OnChoice}/>
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
          isRunning: false,//if the grid should update automatically
          
          color:"#c00",
          onPositionClick:null,//function(s) to call when the grid is clicked.
        }

        makeCells = () =>{
        //api call (top,left,width,height)
        let gridSp = [];
        console.log(`Game ID: ${this.props.gameID}\nUser ID: ${this.props.uid}`)
        let gridRef=this;
    
        let c = global.SocketApi.getMap({gameID:this.props.gameID,uid:this.props.uid,top:0,left:0,width:GRID_WIDTH,height:GRID_HEIGHT},(resp)=>{
            console.log("feff");
            //console.log(resp)
            gridSp = resp;
            console.log(gridSp);
            //returns: list of occupied cells
            let _cells = [],i,j=i=0,container = null;
            for(; i < gridSp.length; i++){
                console.log(`i: ${i}\nj: ${j}`)
                for(j = 0; j < gridSp[i].length; j++){

                    container = gridSp[i][j];
                    console.log (container);
                    if(container != null){
                        if(container.objects != null){
                            for(let k = 0; k < container.objects.length; k++){
                                _cells.push(container.objects[k]);
                            }
                        }
                    }
                }
            }
            console.log(_cells)
            gridRef.state.cells = _cells
        })

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
        console.log("Here")
        console.log(user)
        socket.connectToSocket(user,(j)=>{console.log("CONESCOT");console.log(j)})

        setInterval(() => {
            this.makeCells()
            this.setState({})
        }, 500);
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

    handleChoice = (choice) =>{
        let color = choice.Action.text;
        
        this.setState({color:color})
    }

    componentDidUpdate(){
        this.makeCells();
    }

      render(){
          let { cells } = this.state.cells;
          console.log(cells)
          
          let sp = this.props.gridSpacing,
          w = this.props.gridSize*sp,
          h = this.props.gridSize*sp,
          state = this.state,
          handleChoice = this.handleChoice
          const stateset=()=>{this.setState({})}
          const showcell=()=>{console.log(this.state.cells)}
            return (<div>
              <button name="btn_back" id="SinglePlayer" onClick={()=>{window.location = '/'}} >🢠</button>
                        
              <div className='GridContainer'>
                <div className='Grid'
                style={{
                    width:w,
                    height:h,
                    backgroundSize:`${sp}px ${sp}px`,
                    backgroundColor:"#211"
                }} 
                onClick={this.handleClick}
                ref={(_ref)=>{this.gridRef = _ref;}}
                >
                {
                    <RenderCells makeCells={this.makeCells}cells={state.cells} gridSpacing={this.props.gridSpacing} color={this.state.color}cell_body={this.props.cell_body}/>
                }
                </div>
                {
                    <OpenChoicePrompt onClosePrompt={this.props.onClosePrompt} isTrue={true} choice={this.props.choice} callback={this.props.callback} OnChoice={handleChoice}/>
                }
              </div>
              <button onClick={this.makeCells}>ForceUpdate</button>
              <button onClick={stateset}>set State</button>
              <button onClick={showcell}>cells</button>
          
          </div>)
      }
  }


  export default Grid;
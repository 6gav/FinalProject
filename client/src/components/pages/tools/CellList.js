import React, { Component } from 'react'
import '../Cell.css'
import './CellList.css'
export default class CellList extends Component {
    handleClick = (e)=>{
        let choice = e.currentTarget.dataset.id
        if(this.props.onCellSelected){
            this.props.onCellSelected(choice);
        }
        if(this.props.onClickCell){
            this.props.onClickCell(this.props.state[choice])
        }

    }
    constructor(props){
        super(props)
    
        
    }
  render() {
    let props = this.props,
    cells = props.state,
    cell_body = props.cell_body
    if(cells != null){

        
        if(cells.length>0)
        {
            let i = -1;
            return( 
                <ol>
                {
            
                    cells.map((Cell)=>{
                        i++
                    return( 
                        <li draggable data-id={i} key={i} className="CustCell" onClick={this.handleClick}>
                            <div className="CellBox">
                                <img className='Body'  src={cell_body}></img>
                                <img className='Color' src={Cell.color}></img>
                                <img className='Face'  src={Cell.face}></img>
                            </div>
                            <h4 className='CellLabel' >{Cell.name}</h4>
                        </li>
                        ) 
                    })
                }
                </ol>
            )
            }
            
        } 
    return <div/>  
    }
}
import React, { Component } from 'react'

import cell_body from './cell/cell_body.png'
import cell_red from './cell/color_mask_00.png'
import cell_blue from './cell/color_mask_09.png'
import cell_green from './cell/color_mask_05.png'
import cell_purp from './cell/color_mask_11.png'

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
let cell_color=null;
export class Cell extends Component {
    state={
        dimensions:{
            X:this.props.GRID_WIDTH,
            Y:this.props.GRID_HEIGHT,
            Spacing:this.props.GRID_SPACING,
        }
    }
    constructor(props){
        super(props)
    }
    
    render(){
        let char = this.props.char?this.props.char:null
        let color = (this.props.color?this.props.color:this.state.color)
        if(char){
            let color = char.body.color
            let face = char.body.face
            
        }
        let spacing = this.props.dimensions.Spacing*0.8,rad=-2,
        translation='translate('+rad+'px, '+rad+'px)',
        invlation = 'translate('+(-rad)+'px, '+(-rad)+'px)';
        return <div/>
        return(
            <div className="Cell" style={{
                transform:invlation,
                left:   `${this.state.dimensions.Spacing*this.props.x+1}px`,
                top:    `${this.state.dimensions.Spacing*this.props.y+1}px`,
                width:  `${this.state.dimensions.Spacing-1}px`,
                height: `${this.state.dimensions.Spacing-1}px`,
                
            }}>
            <img src = {cell_body}  style={{tintColor:`${color}`,position:'absolute',width:spacing,height:spacing,opacity:'0.3'}}></img>
            <img src = {cell_body} style={{transform:translation,position:'absolute',width:this.state.dimensions.Spacing}}></img>
                {()=>{
                    if(this.state.imgs.length>0){
                        alert()
                        return(this.state.imgs.map(img=>(
                        {/*<img src = {posmark} alt = {''} className='CellContents'/>*/}
                        )))
                    }

                }}
            </div>
        )
    }
}

export default Cell

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
    }
    constructor(props){
        super(props)
    }
    
    render(){
        //console.log("rendering cell")
        //console.log(this.state)
        let cell_primary = this.props.cell_primary,
        cell_secondary   = this.props.cell_secondary
        let char = this.props.char?this.props.char:null
        let color = (this.props.color?this.props.color:this.state.color)
        if(char){
            //let color = char.body.color
            //let face = char.body.face
            
        }
        if(this.props.image){
            let image = this.props.image
            cell_primary = image.face
            cell_secondary=image.color
        }
        console.log(this.props)
        console.log(this.props.char.displayName)
        let spacing = this.props.dimensions.Spacing*0.8,rad=-2,
        translation='translate('+rad+'px, '+rad+'px)',
        invlation = 'translate('+(-rad)+'px, '+(-rad)+'px)';
        //console.log(this.props)
        //console.log(cell_secondary)
        if(this.props.char.type != "building"){

        
        return(
            <div className="Cell" style={{
                transform:invlation,
                left:   `${spacing*this.props.x+1}px`,
                top:    `${spacing*this.props.y+1}px`,
                width:  `${spacing-1}px`,
                height: `${spacing-1}px`,
                
            }}>
             <div>{this.props.char.displayName}</div>
            <img src = {cell_body} style={{position:'absolute',width:spacing,height:spacing}}></img>
            <img src = {cell_primary}  style={{tintColor:`${color}`,position:'absolute',width:spacing,height:spacing}}></img>
            <img src = {cell_secondary} style={{position:'absolute',width:spacing,height:spacing}}></img>
            </div>
        )
        }
        else{return <div className="building" style={{
            transform:invlation,
            position: "absolute",
            left:   `${spacing*this.props.x+1}px`,
            top:    `${spacing*this.props.y+1}px`,
            
        }}></div>}
    }
}

export default Cell

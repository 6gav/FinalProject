import React, { Component } from 'react'

import cell_body from './cell/cell_body.png'
import cell_red from './cell/color_mask_00.png'
import cell_blue from './cell/color_mask_09.png'
import cell_green from './cell/color_mask_05.png'
import cell_purp from './cell/color_mask_11.png'

import building_0 from './building/building_0.png'
import building_1 from './building/building_1.png'
import building_2 from './building/building_2.png'
import building_3 from './building/building_3.png'
import building_4 from './building/building_4.png'

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
const buildings = [
    building_0,
    building_1,
    building_2,
    building_3,
    building_4
]
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
            cell_primary = image.color
            cell_secondary=image.face
        }
        
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
        else{
            return <img 
            className="Building" 
            src={buildings[this.props.ind%5]}
            style={{
                
                position: "absolute",
                left:   `${spacing*this.props.x+1}px`,
                top:    `${spacing*this.props.y+1}px`,
                }
            }></img>
        }
    }
}

export default Cell

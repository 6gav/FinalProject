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

import terrain_0 from './terrain/terrain_0.png'
import terrain_1 from './terrain/terrain_1.png'
import terrain_2 from './terrain/terrain_2.png'
import terrain_3 from './terrain/terrain_3.png'
import terrain_4 from './terrain/terrain_4.png'
import terrain_5 from './terrain/terrain_5.png'
import terrain_6 from './terrain/terrain_6.png'
import terrain_7 from './terrain/terrain_7.png'
import terrain_8 from './terrain/terrain_8.png'
import terrain_9 from './terrain/terrain_9.png'


import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const terrain = [
    terrain_0,
    terrain_1,
    terrain_2,
    terrain_3,
    terrain_4,
    terrain_5,
    terrain_6,
    terrain_7,
    terrain_8,
    terrain_9,
]
const buildings = [
    building_0,
    building_1,
    building_2,
    building_3,
    building_4,
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
        let type = this.props.char.type
        switch(type){

            case "player":
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
                break;
                
            case "bot":
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
            break;
                case "building":
                    return <img 
                        className="Building" 
                        src={buildings[this.props.ind%5]}
                        style={{
                            
                            position: "absolute",
                            left:   `${spacing*this.props.x+1}px`,
                            top:    `${spacing*this.props.y+1}px`,
                            }
                        }>
                        </img>
                        break;
                case "terrain":
                    return <img 
                    className="Terrain" 
                    src={
                        terrain[this.props.ind%10]
                    }
                    style={
                        {
                        position: "absolute",
                        left:   `${spacing*this.props.x+1}px`,
                        top:    `${spacing*this.props.y+1}px`,
                        }
                    }>
                    </img>
                break;
                default:
                console.log(`cant render terrain of type ${type}`)
                return <div></div>
        }
    }
}

export default Cell

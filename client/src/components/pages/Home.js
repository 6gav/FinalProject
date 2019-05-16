import React, {Component} from 'react';
import './Home.css'
import RefButton from './tools/RefButton'

class Home extends Component{
//#region colors
/*
Reds
E55041
401612
7F2C24
BF4336

Blues
5D68BF
3E457F
7C8AFF
1F2340
707CE5
*/

//#endregion
    BeginSinglePlayer = (event) =>{
        this.props.CreateGame()
        //multiplayer is simply a publicly initialized game  
    }
    Modes = (event) =>{

    }
    render(){
        
        
        return(
            <div >
                <div className="Page">
                    <div className="Title">DeGaS Final Project</div>
                    <div className="TitleMenuContainer">
                        <RefButton href="/simulation" id="SinglePlayer" onClick={this.BeginSinglePlayer}  text="SinglePlayer"></RefButton>
                        <RefButton href="/simulation" id="MultiPlayer" onClick={this.Modes} text='Multiplayer Modes'></RefButton>
                        <RefButton href="/simulation_editor" id="Cell Selection" name="btn_home_cell_selection"text ="Cells"></RefButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
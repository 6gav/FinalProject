import React, {Component} from 'react';
import './Home.css'

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
        window.location=event.target.getAttribute("href")
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
                        {/*
                        <RefButton name="btn_singleplayer" href="/simulation" id="SinglePlayer" onClick={this.BeginSinglePlayer}  text="SinglePlayer"></RefButton>
                        */}
                        <button className="LinkContainer" name="btn_singleplayer" href="/simulation" id="SinglePlayer" onClick={this.BeginSinglePlayer} >Run Simulation</button>
                        <button className="LinkContainer" name="btn_editor" href="/simulation_editor" id="Cell Selection" onClick={this.BeginSinglePlayer} Click={()=>{window.location="/simulation_editor"}}name="btn_home_cell_selection" text="Cells">View Cells</button>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
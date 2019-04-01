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
        //
    }
    Modes = (event) =>{

    }
    render(){
        //Holds "buttons" that 
        const Lnkbtn = (props) =>
        {
            
            return (
            <div className = 'LinkContainer'>
                <a className="button" href = {props.href}>{props.text}</a>
            </div>
            );
        }
        return(
            <div >
                <div className="Page">
                    <div className="Title">DeGaS Final Project</div>
                    <div className="TitleMenuContainer">
                        <Lnkbtn href="/simulation_s" id="SinglePlayer" onClick={this.BeginSinglePlayer}  text="SinglePlayer"></Lnkbtn>
                        <Lnkbtn href="/simulation_m" id="SinglePlayer" onClick={this.Modes} text='Multiplayer Modes'></Lnkbtn>
                        <Lnkbtn href="/editor" id="Cell Selection" text ="Cells"></Lnkbtn>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
"use strict";

class Game { 
    constructor(gameID, hostID){
        this.gameID = gameID;
        this.hostID = hostID;
        this.playerList = [];
    }


    AddPlayer(player){
        this.playerList.push(player);
        player.Print();
    }

    Start(tickRate){
        this.tickRate = tickRate;
        this.Running = true;
        
        setTimeout(this.Update(), this.tickRate);
    }

    Update(){

        

        if(this.Running){
            setTimeout(this.Update(), this.tickRate);
        }
    }
}

module.exports = Game;
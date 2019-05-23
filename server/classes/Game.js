"use strict";

const Player = require('./Player');
const Map = require('./Map');

class Game{

    constructor(gameID, hostID){
        this.gameID = gameID;
        this.hostID = hostID;

        this.playerList = [];

    }

    AddPlayer(player){
        this.playerList.push(player);
    }

    StartGame(deltaTime){
        this.Setup(deltaTime);

        this.Update();
    }

    AddAi(amount){
        for(let i = 0; i < amount; i++){
            let tempPlayer = new Player();
            tempPlayer.MakeAi(i);
            this.playerList.push(tempPlayer);
        }
    }

    Setup(deltaTime){
        this.deltaTime = deltaTime;
        this.running = true;

        this.map = new Map(25);
        

        this.playerList.forEach(player => {
            player.SetMapSize(25);
            player.SetPosition({x: Math.floor(Math.random()*25), y: Math.floor(Math.random()*25)});

            this.map.objects.push(player);

        });
        this.map.ExportMap();

        this.playerList[0].Input({type: 'direction', direction: {x: -1, y: -1}});
    }

    PlayerInput(userID, params){
        this.playerList.forEach(player => {
            if(player.userID == userID){
                player.Input(params);
            }
        });   
    }

    Update(){

        console.log("Game tick");

        this.playerList.forEach(player => {
            player.Update();
        });

        if(this.running){
            setTimeout(() => this.Update(), this.deltaTime);
        }
    }
}

module.exports = Game;
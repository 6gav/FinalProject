"use strict";

const Player = require('./Player');
const Map = require('./Map');

class Game{

    constructor(gameID, hostID){
        this.gameID = gameID;
        this.hostID = hostID;

        this.playerList = [];
        this.map = new Map(25);

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

        

        this.playerList.forEach(player => {
            player.SetMapSize(25);
            player.SetPosition({x: Math.floor(Math.random()*25), y: Math.floor(Math.random()*25)});

            this.map.objects.push(player);

        });

        this.playerList[1].SetPosition({x: 0, y: 0});
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

        let player = this.playerList[0];

        for(let j = 1; j < this.playerList.length; j++){

            const otherPlayer = this.playerList[j];

            var pPos = player.GetPosition();
            var ePos = otherPlayer.GetPosition();
            
            var distX = pPos.x - ePos.x;
            var distY = pPos.y - ePos.y;

            if(distX + distY <= 10 && otherPlayer.alive){
                this.playerList[0].Input({type: "enemy", enemy: otherPlayer});
            }
        }

        console.log("Game tick");

        if(!this.playerList[0].alive){
            this.running = false;
        }

        this.playerList.forEach(player => {
            player.Update();
        });

        if(this.running){
            setTimeout(() => this.Update(), this.deltaTime);
        }
    }

    GetMap(){
        return this.map.ExportMap();
    }
}

module.exports = Game;
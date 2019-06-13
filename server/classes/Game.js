"use strict";

const Player = require('./Player');
const Map = require('./Map');
const Building = require('./Building');

class Game{

    constructor(gameID, hostID){
        this.gameID = gameID;
        this.hostID = hostID;

        this.objects = {};
        this.playerList = [];
        this.map = new Map(50);

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

    AddBuildings(amount){
        
        this.objects["building"] = [];
        
        for(let i = 0; i < amount; i++){
            let x = Math.floor(Math.random()*this.map.size);
            let y = Math.floor(Math.random()*this.map.size);
            let building = new Building({x: x, y: y});
            this.objects["building"].push(building);
            this.map.objects.push(building);
        }
    }

    Setup(deltaTime){
        this.deltaTime = deltaTime;
        this.running = true;

        this.AddBuildings(10);
        

        this.playerList.forEach(player => {
            player.SetMapSize(this.map.size);
            player.SetPosition({x: Math.floor(Math.random()*this.map.size), y: Math.floor(Math.random()*this.map.size)});

            this.map.objects.push(player);

        });

        this.playerList[1].SetPosition({x: 0, y: 0});
        this.map.ExportMap();

        this.playerList[0].Input({type: 'direction', params: {x: -1, y: -1}});
    }

    PlayerInput(userID, params){
        this.playerList.forEach(player => {
            if(player.userID == userID){
                player.Input(params);
            }
        });
    }

    async Update(){

        console.log("~~~~~~GAME TICK~~~~~~");

        let player = this.playerList[0];

        for(let j = 1; j < this.playerList.length; j++){

            const otherPlayer = this.playerList[j];

            var pPos = player.GetPosition();
            var ePos = otherPlayer.GetPosition();
            
            var distX = pPos.x - ePos.x;
            var distY = pPos.y - ePos.y;

            if(distX + distY <= 3 && otherPlayer.alive){
                this.playerList[0].Input({type: "enemy", params: otherPlayer});
            }

        }


        if(!this.playerList[0].alive){
            this.running = false;
        }

        this.playerList.forEach(player => {
            if(player.mood == "loot"){
                player.FindClosest(this.objects["building"]);
            }
            else if (player.mood == "fight"){
                let players = this.playerList.slice(1, this.playerList.length);
                player.FindClosest(players);
            }
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
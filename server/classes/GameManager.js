"use strict";

const Game = require('./Game');

class GameManager{

    constructor(){
        this.gameList = {};
    }

    GetGame(gameID){
        return this.gameList[gameID];
    }

    CreateGame(hostID){
        var gameID;

        do{
            //Return random number between 1000 and 9999 for game ID
            gameID = Math.floor(Math.random()*9000 + 1000);
        }while(this.gameList[gameID]);
        gameID = 2000;
        this.gameList[gameID] = new Game(gameID, hostID);

        return gameID;
    }

    StartGame(gameID, userID){
        let currentGame = this.gameList[gameID];

        if(!currentGame){
            return {error: "Game does not exist"};
        }

        if(currentGame.hostID == userID){
            currentGame.AddAi(3);

            currentGame.StartGame(2000);
        }

        return;
    }

    AddPlayer(gameID, player){
        let currentGame = this.gameList[gameID];

        if(!currentGame){
            return {error: "Game does not exist"};
        }
        currentGame.AddPlayer(player);
        player.AssignToGame(gameID);
    }

    GetPlayers(gameID){
        let currentGame = this.gameList[gameID];

        if(!currentGame){
            return {error: "Game does not exist"};
        }

        return currentGame.playerList;
    }

    PlayerInput(gameID, userID, params){
        let currentGame = this.gameList[gameID];
        if(currentGame){
            currentGame.PlayerInput(userID, params);
        }
    }

    /*async SetupSocket(socket){
        socket.on("connection", (client) => {
            console.log("Client joined");            
            client.on("getMap", (info) => {
                console.log("ASKED FOR MAP");
                setInterval(() => {
                let uid = info.uid;
                let currentGame = this.gameList[info.gameID];
                let map = null;
                if(currentGame){
                    map = currentGame.GetMap();
                }
                    client.emit("map", (map));
                }, 0);
            });
            //Uid, GameID, Params
            client.on("pInput", (gameID, userID, params) => {
                this.PlayerInput(gameID, userID, params);
            });
        });
    }*/     
    

    GetMap(gameID){
        let currentGame = this.gameList[gameID];

        if(!currentGame){
            return {error: "Game does not exist!"};
        }

        return currentGame.map.ExportMap();
    }
}

module.exports = GameManager;
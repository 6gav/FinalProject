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

        currentGame.Start(100);
    }

    AddPlayer(gameID, player){
        let currentGame = this.gameList[gameID];

        if(!currentGame){
            return {error: "Game does not exist"};
        }
        currentGame.AddPlayer(player);
    }

    GetPlayers(gameID){
        let currentGame = this.gameList[gameID];

        if(!currentGame){
            return {error: "Game does not exist"};
        }

        return currentGame.playerList;
    }

    SetupSocket(socket){
        this.socket = socket;

        socket.on("connection", (client) => {
            client.on("uid", (info) => {
                client.join(info);
            });
        });
    }
}

module.exports = GameManager;
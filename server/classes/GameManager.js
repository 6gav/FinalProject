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

            currentGame.StartGame(1000);
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

        currentGame.playerInput(userID, params);
    }

    SetupSocket(socket){
        this.socket = socket;

        socket.on("connection", (client) => {
            console.log("Client joined");
            client.on("sendUid", (info) => {
                console.log("Client connected with uid: " + info);
                client.join(info);
            });

            client.on("getMap", (info) => {
                let uid = info.uid;

                let currentGame = this.gameList[info.gameID];

                let map = currentGame.GetMap();
                socket.to(uid).emit("map", (map));
            });

            //Uid, GameID, Params
            client.on("pInput", (info) => {

            }); 
        });
    }
    

    GetMap(gameID){
        let currentGame = this.gameList[gameID];

        if(!currentGame){
            return {error: "Game does not exist!"};
        }

        return currentGame.map.ExportMap();
    }
}

module.exports = GameManager;
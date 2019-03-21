var GameManager = require('./server/game.js');


var games = {};

let runningGames = [];

module.exports.registerPaths = function(app){

    //Host ID, game id gets returned to sender
    app.post('/api/CreateGame', (req, res) => {

        var gameID;

        do{
            gameID = Math.floor(Math.random()*8000 + 1000);
        }while(games[gameID]);
        games[gameID] = {
            gameID: gameID,
            host: req.body.userID,
            players: []
        }
        games[gameID].players.push({userID: req.body.userID, displayName: req.body.username});
        console.log('Created game:');
        console.log(games[gameID]);
        res.send({gameID: gameID});

    });


    //User passes in gameID, returns all players in current game if exists
    app.post('/api/GetPlayers', (req, res) => {
        var game = games[req.body.gameID];
        if(!game){
            res.send({error: 'Game not found!', status: 404});
            return;
        }
        res.send({players: game.players});
    });


    //User passes in gameID and host's ID, if it is matched with current game that isn't running, game is started
    app.post('/api/StartGame', (req, res) => {
        var game = games[req.body.gameID];
        if(!game)
        {
            res.send({error: 'Game not found!', status: 404});
            return;
        }
        if(game.running)
        {
            res.send({error: 'Game already running.', status: 500});
            return;
        }
        GameManager.StartGame(game);
        res.send({status: 200});
    });
}
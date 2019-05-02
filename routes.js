var GameManager = require('./server/game.js');

const api = require('./server/api.js');
const error = require('./server/error.js');
var Player = require('./server/classes/player');
var Character = require('./server/classes/character');

var games = {};

let runningGames = [];

module.exports.registerPaths = function(app){

    //
    //User accounts
    //

    //New user is sent to database
    app.post('/api/registerUser', (req, res) => {

        var user = req.body;

        //Check parameters to see if all exist
        if(!(user.username && user.password && user.email)){
            error.sendBadRequest(res);
            return;
        }

        api.registerUser(user);

        res.send({'Message': "User registered successfully"});
    });

    app.post('/api/loginUser', (req, res) => {
        var user = req.body;

        if(!(user.password && user.email)){
            error.sendBadRequest(res);
            return;
        }

        var cb = (status) => {
            if(status.statusCode != 0){
                res.send({message: status.message});
            }
            else
            {
                res.send({message: status.message});
            }
        };

        api.loginUser(user, cb);

    });

    //
    //Game paths
    //

    //Host ID, game id gets returned to sender
    app.post('/api/CreateGame', (req, res) => {

        var gameID;

        do{
            gameID = Math.floor(Math.random()*8000 + 1000);
        }while(games[gameID]);

        //DEV ONLY
        gameID = 2000;

        games[gameID] = {
            gameID: gameID,
            host: req.body.userID,
            players: []
        }

        games[gameID].players.push(new Player(req.body.userID, req.body.displayName, new Character({x: 0, y: 0})));
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
        console.log(req.body);
        var game = games[req.body.gameID];
        console.log(games);
        console.log(game);
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
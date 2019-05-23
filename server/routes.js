const GameManager = require('./classes/GameManager');

const Player = require('./classes/Player');

const userApi = require('./userApi');
const error = require('./error');


global.gameManager = new GameManager();

//Create routing info regarding api calls
function registerPaths(app, socket){
    
    //User paths
    registerUserPaths(app);
    
    //Game paths
    registerGamePaths(app);

    global.gameManager.SetupSocket(socket);

}

//Call function when file is loaded externally
module.exports = registerPaths;



//Route functions
function registerUserPaths(app){
    app.post('/api/registerUser', (req, res) => {
        var user = req.body;

        //Construct fallback for bad api calls
        var fallback = (result) =>{
            if(result.status == "Ok"){
                res.send({status: "User registered successfully!"});
            }
            if(result.error){
                res.send(result.error);            

            }
            else{
                error.sendBadRequest(res);

            }
        }

        //Send to user api
        var result = userApi.registerUser(user, fallback);


    });


    app.post('/api/loginUser', (req, res) => {
        var user = req.body;


        if(!(user.password && user.email)){
            error.sendBadRequest(res);
            return;
        }

        var cb = (status) => {
            res.send({message: status.message, user: status.user}); 
        };

        userApi.loginUser(user, cb);
    });


}



function registerGamePaths(app){

    //Create game
    //@Params = UserID, DisplayName
    app.post('/api/CreateGame', (req, res) => {
        //Create game object
        var gameID;
        console.log(global.gameManager);

        gameID = global.gameManager.CreateGame(req.body.userID);

        //Add player
        global.gameManager.AddPlayer(gameID, new Player(req.body.userID, req.body.displayName));

        //SEND BACK HOST
        res.send({gameID: gameID, hostID: req.body.userID});

    });


    //Start game
    //@Params = GameID, UserID
    app.post('/api/StartGame', (req, res) => {

        var result = global.gameManager.StartGame(req.body.gameID, req.body.userID);

        if(result){
            res.send({result});
        }
        else{
            res.send({status: "Game started successfully!"});
        }
    });

    //Join game
    //@Params = GameID, UserID, DisplayName
    app.post('/api/JoinGame', (req, res) => {

        let result = gameManager.AddPlayer(req.body.gameID, new Player(req.body.userID, req.body.displayName));
        
        if(result){
            res.send(result);
        }
        else{
            res.send({status: "Player added successfully!"});
        }

    });

    //Get players
    app.post('/api/GetPlayers', (req, res) => {
        let result = gameManager.GetPlayers(req.body.gameID);

        res.send(result);
    });

    app.get('/api/GetMap', (req, res) => {
        var mapObject = global.gameManager.GetMap(req.body.gameID);
        
        res.send(mapObject);
    });

    app.post('/api/PlayerInput', (req, res) => {
        //GameID, UserID, InputType, Params

        global.gameManager.PlayerInput(req.body.gameID, req.body.userID, {type: req.body.inputType, params: req.body.parms})
    });
}
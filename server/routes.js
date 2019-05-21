const GameManager = require('./classes/GameManager');
const Player = require('./classes/Player');
const userApi = require('./userApi');
const error = require('./error');

const gameManager = new GameManager();


//Create routing info regarding api calls
function registerPaths(app, socket){
    
    //User paths
    registerUserPaths(app);
    
    //Game paths
    registerGamePaths(app);

    GameManager.SetupSocket(socket);
    
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

        //SABIAN FUCKING WANTS THE USER //Uid, Username

        if(!(user.password && user.email)){
            error.sendBadRequest(res);
            return;
        }

        var cb = (status) => {
            res.send({message: status.message, user: status.user}); 
        };

        userApi.loginUser(user, cb);
    });

    //api/SetUserCell - uid, index


}



function registerGamePaths(app){

    //Create game
    //@Params = UserID, DisplayName
    app.post('/api/CreateGame', (req, res) => {
        //Create game object
        var gameID;

        gameID = gameManager.CreateGame(req.body.userID);
        console.log(gameID);
        //Add player
        gameManager.AddPlayer(gameID, new Player(req.body.userID, req.body.displayName));

        //SEND BACK HOST

    });


    //Start game
    //@Params = GameID, UserID
    app.post('/api/StartGame', (req, res) => {
        console.log("Start game here");

        gameManager.StartGame(req.body.gameID, req.body.userID);
    });

    //Join game
    //@Params = GameID, UserID, DisplayName
    app.post('/api/JoinGame', (req, res) => {
        console.log("Joining game");

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
        console.log("Getting player list");
        console.log(req.body);
        let result = gameManager.GetPlayers(req.body.gameID);

        res.send(result);
    });
}
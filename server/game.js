var RunningGames = [];

var Player = require('./classes/player');

//Takes in a game, called when /api/StartGame passes in a gameID that exists
module.exports.StartGame = function(game){
    game.running = true;
    RunningGames.push(game);

    RunGame(game);
}



//This runs while the game is active, performs logic and checks
async function RunGame(game) {
    var map = [];

    let XSIZE = 2;
    let YSIZE = 2;

    for(let x = 0; x < XSIZE; x++){
        var column = [];
        for(let y = 0; y < YSIZE; y++){
            column.push({x: x, y: y, player: -1});
        }
        map.push(column);
    }

    

    //DEV CHAR
    game.players.push(new Player(1000, 'Gavin', {position: {x: 1, y: 1}}));


    //Fill map with players
    for(let i = 0; i < game.players.length; i++){

        var x, y;
        do{
            x = Math.floor(Math.random() * XSIZE);
            y = Math.floor(Math.random() * YSIZE);
        }while(map[x][y].player != -1);
        map[x][y].player = game.players[i];
    }
    
    console.log(map);

    while(game.running){

        console.log('-----GAME STEP----')
        console.log(game);
        

        await sleep(5000);
    }

}


//Takes in time to sleep in milliseconds
function sleep(millis){
    return new Promise(res => setTimeout(res, millis));
}
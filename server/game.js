var RunningGames = [];


//Takes in a game, called when /api/StartGame passes in a gameID that exists
module.exports.StartGame = function(game){
    game.running = true;
    RunningGames.push(game);

    RunGame(game);
}



//This runs while the game is active, performs logic and checks
async function RunGame(game) {
    while(game.running){
        console.log('Game running: ');
        console.log(game.gameID);

        await sleep(1000);
    }

}


//Takes in time to sleep in milliseconds
function sleep(millis){
    return new Promise(res => setTimeout(res, millis));
}
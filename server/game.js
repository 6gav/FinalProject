var RunningGames = [];

module.exports.StartGame = function(game){
    RunningGames.push(game);
    RunGame(game);
}


function RunGame(game) {
    while(game.Running){
        console.log('Game running: ');
        console.log(game);
    }

}
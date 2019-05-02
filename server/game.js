var RunningGames = [];

var Player = require('./classes/player');
var Character = require('./classes/character');

//Takes in a game, called when /api/StartGame passes in a gameID that exists
module.exports.StartGame = function(game){
    game.running = true;
    RunningGames.push(game);

    RunGame(game);
}



//This runs while the game is active, performs logic and checks
async function RunGame(game) {
    var map = [];

    let XSIZE = 20;
    let YSIZE = 20;

    for(let x = 0; x < XSIZE; x++){
        var column = [];
        for(let y = 0; y < YSIZE; y++){
            column.push({x: x, y: y, player: -1});
        }
        map.push(column);
    }

    

    //DEV CHAR
    game.players.push(new Player(1000, 'Gavin', new Character({x: 1, y: 1})));

    //Fill map with players
    for(let i = 0; i < game.players.length; i++){

        var x, y;
        do{
            x = Math.floor(Math.random() * XSIZE);
            y = Math.floor(Math.random() * YSIZE);
        }while(map[x][y].player != -1);
        map[x][y].player = game.players[i];
        game.players[i].char.position = {x: x, y: y};
    }
    
    //Replace random spots with objects if not a player
    for(let i = 0; i < 20; i++){
        var x, y;
        do{
            x = Math.floor(Math.random() * XSIZE);
            y = Math.floor(Math.random() * YSIZE);
        }while(map[x][y].player != -1);

        map[x][y].player = Math.floor(Math.random()*3 + 1);

    }

    ConvertMapToString(map);

    while(game.running){


        process.stdout.write('\033c');
        console.log('-----GAME STEP----')
        ConvertMapToString(map);

        for(let i = 0; i < game.players.length; i++){
            var char = game.players[i].char;
            var currentPos = char.position;
            char.update();
            map[char.position.x][char.position.y].player = char;
            map[currentPos.x][currentPos.y].player = -1;
        }


        await sleep(5000);
    }

}


//Takes in time to sleep in milliseconds
function sleep(millis){
    return new Promise(res => setTimeout(res, millis));
}

function ConvertMapToString(map){
    for(let x = 0; x < map.length; x++){
        let column = map[x];
        var output = "";
        for(let y = 0; y < map.length; y++){
            var objectAtPos = map[x][y].player;
            if(objectAtPos > 0){
                switch (objectAtPos) {
                    case 1:
                        output += "A";
                        break;
                
                    case 2:
                        output += "B";
                        break;
                    case 3: 
                        output += "C";
                        break;
                }
            }
            else if(objectAtPos != -1){
                output += "X";
            }
            else{
                output += "_";
            }
        }
        console.log(output);
    }
}
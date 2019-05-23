const Char = require('./char');

class Player{
    constructor(userID, displayName){
        this.char = new Char();

        this.mood = [];
        this.combat = false;

        this.userID = userID;
        this.displayName = displayName;

        this.type = "player";
    }

    AssignToGame(gameID){this.gameID = gameID;}

    MakeAi(number){
        this.type = "bot";

        this.userID = number;
        this.displayName = "AI_" + number;
    }

    Update(){
        this.char.Update();
    }

    GetPosition(){
        return this.char.position;
    }

    SetPosition(position){
        this.char.position = position;
    }

    Input(params){
        switch(params.type){
            case 'direction':
                this.char.target = params.direction;   
            break; 
            case 'enemy':
                if(this.mood.includes("fight")){
                    this.combat = true;
                }
                else{
                    this.combat = false;
                }
            break;
        }
    }

    SetMapSize(size){
        this.char.max = size;
    }
}

module.exports = Player;
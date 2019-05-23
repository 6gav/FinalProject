const Char = require('./char');

//SinglePlayer AI import

class Player{
    constructor(userID, displayName){
        this.char = new Char();

        this.armor = 50;
        this.health = 100;
        this.attack = 30;
        this.alive = true;

        this.mood = ["fight"];
        this.enemyTarget = null;
        this.combat = false;

        this.userID = userID;
        this.displayName = displayName;

        this.type = "player";
    }

    AssignToGame(gameID){this.gameID = gameID;}

    MakeAi(number){
        this.type = "bot";

        this.armor = 10;
        this.health = 100;
        this.attack = 10;

        this.userID = number;
        this.displayName = "AI_" + number;
    }

    Update(){
        //Call AI and get result

        if(this.combat && this.enemyTarget){
            this.Attack(this.enemyTarget);
        }

        this.char.Update();
    }

    Attack(enemy){
        let pAttack = Math.floor(Math.random()*this.attack);
        let eAttack = Math.floor(Math.random()*enemy.attack);

        if(enemy.armor > 0){
            enemy.armor -= pAttack;
            if(enemy.armor < 0){
                enemy.armor = 0;
            }
        }
        else {
            enemy.health -= pAttack;
        }

        if(this.armor > 0){
            this.armor -= eAttack;
            if(this.armor < 0){
                this.armor = 0;
            }
        }
        else {
            this.health -= eAttack;
        }

        if(this.health = 0){
            this.alive = false;
        }

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
                    this.enemyTarget = params.enemy;
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
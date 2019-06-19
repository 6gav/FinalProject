const Char = require('./char');

//SinglePlayer AI import

class Player{
    constructor(userID, displayName){

        this.armor = 50;
        this.health = 200;
        this.attack = 50;
        this.alive = true;

        this.mood = "fight";
        this.combat = false;

        this.userID = userID;
        this.displayName = displayName;
        
        this.TurnCount = 0; //<<<<<REMOVE THIS
        this.type = "player";
    }

    AssignToGame(gameID){this.gameID = gameID;}

    MakeAi(number){
        this.type = "bot";

        this.armor = 0;
        this.health = 100;
        this.attack = 10;

        this.position = {x: null, y: null};
        this.target = {x: null, y: null};

        this.userID = number;
        this.displayName = "AI_" + number;
    }

    Update(){

        this.TurnCount++;

        this.TurnCount %= 10;

        if(this.type == "bot"){


            this.target = {x: Math.floor(Math.random() * 3) - 1, y: Math.floor(Math.random() * 3) - 1};
        }





        var newPos = {x: this.position.x + this.target.x, y: this.position.y + this.target.y};
        if(newPos.x >= 0 && newPos.x < this.max){
            this.position.x = newPos.x;
        }
        if(newPos.y >= 0 && newPos.y < this.max){
            this.position.y = newPos.y;
        }


        console.log({x: this.position.x, y: this.position.y, health: this.health, targetX: this.target.x, targetY: this.target.y,mood:this.mood});
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
            if(enemy.health > 0){
                enemy.health -= eAttack;
            }
            
            if(enemy.health < 0){
                enemy.health = 0;
            }
        }

        if(this.armor > 0){
            this.armor -= eAttack;
            if(this.armor < 0){
                this.armor = 0;
            }
        }
        else {
            if(this.health > 0){
                this.health -= eAttack;
            }

            if(this.health < 0){
                this.health = 0;
            }
        }

        if(enemy.health == 0){
            enemy.alive = false;
        }

        if(this.health == 0){
            this.alive = false;
        }

    }

    SetPosition(position){
        this.position = position;
    }

    Input(params){
        switch(params.type){
            case 'direction':
                this.target = params.params;   
            break;
            case 'enemy':
                if(this.mood == "fight"){
                    this.Attack(params.params);
                }
                else{
                    this.combat = false;
                }
            break;
            case 'mood': 
                this.mood = params.params;
            break;
        }
    }

    SetMapSize(size){
        this.max = size;
    }

    FindClosest(objects){

        let closestObject = null;
        let closestDistance = 100000;
        objects.forEach(obj => {
            if(obj.type == "building" && obj.looted){
                return;
            }
            if(obj.type == "player" && !obj.alive){
                return;
            }
            let distance = {};
            distance.x = this.position.x - obj.position.x;
            distance.y = this.position.y - obj.position.y
            distance.x = distance.x*distance.x;
            distance.y = distance.y*distance.y;
            if(distance.x + distance.y < closestDistance){
                closestObject = obj;
                closestDistance = distance.x + distance.y;
            }
        });
        this.PathToBuilding(closestObject);
    }

    PathToBuilding(obj){
        let newTarget = {};
        newTarget.x = obj.position.x - this.position.x;
        newTarget.y = obj.position.y - this.position.y;

        if(newTarget.x > 0){
            newTarget.x = 1;
        }
        else if(newTarget.x < 0){
            newTarget.x = -1;
        }
        else {
            newTarget.x = 0;
        }

        if(newTarget.y > 0){
            newTarget.y = 1;
        }
        else if(newTarget.y < 0){
            newTarget.y = -1;
        }
        else{
            newTarget.y = 0;
        }

        if(this.mood == "flee"){
            newTarget.x *= -1;
            newTarget.y *= -1;
        }

        let loot = {};
        if(newTarget.x == 0 && newTarget.y == 0 && obj.type == "building"){
            loot = obj.GetLoot();
            obj.looted = true;
        }

        if(loot.Health){
            this.health += loot.Health;
        }
        else if(loot.Attack){
            this.health += loot.Attack;
        }
        else if(loot.Armor){
            this.health += loot.Armor;
        }

        this.target = JSON.parse(JSON.stringify(newTarget));
        
    }
}

module.exports = Player;
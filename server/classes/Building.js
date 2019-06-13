"use strict"


class Building {

    constructor(pos){
        this.position = pos;
        this.loot = {};
        this.looted = false;
        this.GenerateLoot();
        this.type = "building";
    
    }


    GenerateLoot(){
        
        let lootRoll = Math.floor(Math.random()*3);

        let lootType;
        switch(lootRoll){
            case 0:
                lootType = "Health";
                lootRoll = Math.floor(Math.random()*20);
            break;
            case 1:
                lootType = "Armor";
                lootRoll = Math.floor(Math.random()*20);
            break;
            case 2:
                lootType = "Attack";
                lootRoll = Math.floor(Math.random()*5);
            break;
        }

        this.loot[lootType] = lootRoll;
    }

    GetLoot(){
        if(this.looted){
            return null;
        }
        this.looted = true;
        return this.loot;
    }


}

module.exports = Building;

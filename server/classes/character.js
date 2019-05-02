"use strict";
const math = require('../Utilities/Math.js');
const charApi = require('../charApi');


//This is actual character as used in simulation
var Character = class Character{
    constructor(position){
        this._position = position;
        this._velocity = {x: 0, y: 0};
    }

    get position(){
        return this._position;
    }

    set position(pos){
        this._position = pos;
    }

    set name(name){
        this._name = name;
    }

    get apparel(){
        return this._apparel;
    }
    
    set apparel(armor){
        this._apparel = armor;
    }

    get velocity(){
        return this._velocity;
    }

    set velocity(velocity){
        this._velocity = velocity;
    }


    update(){
        switch (charApi.GetMove()) {
            case 0:
                this.velocity = {x: 0, y: -1};
                break;        
        
            case 1:
                this.velocity = {x: -1, y: 0};
                break;        
            
            case 2:
                this.velocity = {x: 0, y: 1};
                break;        
            
            case 3:
                this.velocity = {x: -1, y: 0};
                break;
                
            case -1:
                this.velocity = {x: 0, y: 0};
        }
        this.move();
    }

    move(){
        this._position = math.AddTwoVectors(this._position, this._velocity);
    }

}

module.exports = Character;
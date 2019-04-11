"use strict";

//This is actual character as used in simulation
class Character{
    constructor(){

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
}
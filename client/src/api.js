import io from 'socket.io-client';
const socket = io();

class SocketApi{
    constructor(){
        this.map_cb = null;

        socket.on('map',(map)=>{
            map = map;
        
            if(map_cb != null){
                map_cb(map)
            }
        })

    }
    connectToSocket(cb){
        console.log('connecting');
        socket.on('acceptConnection', vals => cb(null, vals));    
    };

    disconnectFromServer(){
        console.log('Disconnecting.');
        socket.emit('disconnect');
    }
    //get game map. data includes current user uid, and game ID 
    getMap(data,cb){
        console.log('fetching map data')
        socket.emit('getMap',data)
        
        map_cb = cb;
    }

    sendUid(uid){
        socket.emit('uid',uid);
    }



    //data: object containing info aout render location - top left corner, width, and height of grid
    getCells(data){
        socket.emit("getCells")
    }
}
module.exports = SocketApi;

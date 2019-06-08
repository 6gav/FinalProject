import OpenSocket from 'socket.io-client';

const socket = OpenSocket();
console.error("NEW SOCKET IS MADE HERE");


class SocketApi{
    constructor(){
        this.map_cb = null;
        this.connected = false;
        console.log("CONST")

        socket.on('map',(map)=>{
            map = map;
        
            console.log("ME")
            if(this.map_cb != null){
                console.log("ME")
                this.map_cb(map)
            }
        })

    }
    connectToSocket(user,cb){
        let uid = user.uid
        console.log(`connecting with user ${uid}`);
        socket.emit('connection', vals => cb(null, vals));  
        
        socket.emit('sendUid',uid)
        this.connected = true;
    };

    disconnectFromServer(){
        console.log('Disconnecting.');
        socket.emit('disconnect');
        this.connected = false
    }
    //get game map. data includes current user uid, and game ID 
    getMap(data,cb){
        console.log(this.connected)
        console.log('fetching map data')
        socket.emit('getMap',data)
        
        this.map_cb = cb;
    }

    sendUid(uid){
        socket.emit('uid',uid);
    }



    //data: object containing info aout render location - top left corner, width, and height of grid
    getCells(data){
        socket.emit("getCells")
    }
}

global.SocketApi = new SocketApi();
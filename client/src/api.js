import io from 'socket.io-client';
const socket = io();
let map = null;
function connectToSocket(cb){
    console.log('connecting');
    socket.on('acceptConnection', vals => cb(null, vals));    
};

function disconnectFromServer(){
    console.log('Disconnecting.');
    socket.emit('disconnect');
}

function getMap(data,cb){
    console.log('fetching map data')
    socket.emit('getMap',data)
    
    
}

function sendUid(uid){
    socket.emit('uid',uid);
}

socket.on('map',(json)=>{
    map = json.map;
})
export {connectToSocket, disconnectFromServer, sendUid, getMap};

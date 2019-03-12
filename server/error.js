module.exports = {
    
    //If the frontend made the api request wrong, this gets 
    sendBadRequest: function(res){
        res.send({errorCode: 400, message: "Api request not sent correctly"});
    },
    
    //Info was requested that was not found
    sendMissingError: function(res){
        res.send({errorCode: 404, message: "Item not found"});
    },

}
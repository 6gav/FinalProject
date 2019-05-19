//Bad API Params
function sendBadRequest(res){
    res.send({status: 300, message: "Bad request was made to API, please check parameters and try again."});
}



module.exports.sendBadRequest = sendBadRequest;

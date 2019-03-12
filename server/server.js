//Initial server for backend
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

//Custom modules
const api = require('./api.js');
const error = require('./error.js');

//Enables JSON input on post methods
const bodyParser = require('body-parser');

//Server setup
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Public APIs
//New user is sent to database
app.post('/api/registerUser', (req, res) => {

    var user = req.body;

    //Check parameters to see if all exist
    if(!(user.username && user.password && user.email)){
        error.sendMissingError(res);
    }

    api.registerUser(user);

    res.send({'Message': "User registered successfully"});
});



//Route for production
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.listen(port);

console.log('Server listening on port ' + port);
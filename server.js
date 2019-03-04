//Initial server for backend
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

//Enables JSON input on post methods
const bodyParser = require('body-parser');

//Server setup
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Route for production
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port);

console.log('Server listening on port ' + port);
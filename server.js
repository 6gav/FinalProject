//Environment Vars
const PORT = process.env.PORT || 5000;


//Module imports
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

//Server setup
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({extended: true}));

//Custom modules
require("./server/routes.js")(app, io);     //Register api calls/routing info to app


//Production routing
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});


//Server listening
server.listen(PORT, () => {console.log("Server listening on port " + PORT)});
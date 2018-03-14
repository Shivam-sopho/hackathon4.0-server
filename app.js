/*All dependecies and modules*/
const http = require("http");
const express = require("express");
const app = express();
const path = require("path")
const socket = require('socket.io');
const mongoose = require("mongoose");
var config = require("./config");
app.use(express.static(path.join(__dirname, 'public')));
require("./routes")(app);


/*Server configuration*/
var server = http.createServer(app);
server.listen(config.server.port,function(error){
    if(error){
        console.log("Error in stating server")
    }
});
server.on("error",onError);
server.on("listening",onListening);

/*Perform the action is any error occured while starting the server*/
function onError(error){
    switch(error.code){
        case "EACCES":
            console.log("You dont have such privillage to start the server")
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.log(config.server.port + " is allready in use!!")
            process.exit(1);
            break;
        default:
            throw err;
    }
}

function onListening(){
    /*Connect to mongodb server and database after server starts successfullly */
    console.log("Server is successfully listening on port " + config.server.port)
    mongoose.connect(process.env.MONGOLAB_URI||config.server.dbServer,function (error){
       if(error){
           console.log(error)
       }else{
           console.log("Connected to database successfully")
       }
    })
}

/* Stop server from crashing when an uncaughtException occures */
process.on('uncaughtException',function(error){
    console.log("------------An uncaught exception occured----------")
    console.log(error);
});

/*Create socket server*/
const io = socket.listen(server);
require("./sockets")(io);



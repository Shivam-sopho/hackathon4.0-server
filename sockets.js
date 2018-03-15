var mongoose = require("mongoose");
require("./models/user")
var User = mongoose.model("User");
var activeSocket = [];
var activeUser = [];

module.exports = function(io){
    io.sockets.on("connection",handleSockets);
    function handleSockets(socket){
        socket.on("login",function(data,callback){

        })
    }
};
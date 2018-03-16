var mongoose = require("mongoose");
require("./models/user");
require("./models/feedback");
var User = mongoose.model("User");
var Feedback = mongoose.model("Feedback");
var activeSocket = [];
var activeUser = [];

module.exports = function(io){
    io.sockets.on("connection",handleSockets);
    function handleSockets(socket){
        socket.on("emitUser",function(data,callback){
            socket.userid = data.userid;
            activeSocket.push(socket);
            activeUser.push(socket.userid);
            callback(true)
        });

        socket.on("getRating",function(data,callback){
            var userid = data.userid;
            Feedback.findOne({"userid":userid},function(err,feedback){
                if(err){
                    callback(500,"Internal server error")
                }else{
                    if(!feedback){
                        callback(200,"Unrated")
                    }else{
                        callback(200,feedback.rating);
                    }
                }
            })
        });
    }
};
var mongoose = require("mongoose");
require("./models/user");
require("./models/feedback");
require("./models/service");
require("./models/subservice")
var Subservice = mongoose.model("Subservice")
var Service = mongoose.model("Service")
var User = mongoose.model("User");
var Feedback = mongoose.model("Feedback");
var activeSocket = [];
var activeUser = [];

module.exports = function(io){
    io.sockets.on("connection",handleSockets);
    function handleSockets(socket){
        socket.on("emitUser",function(data,callback){
            console.log("helllo")
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

        socket.on("extractServices",function(callback){
            console.log("hhhhhhhhhh")
            Service.find({},function(err,service){
                if(err){
                    callback(500,"Internal server error")
                }else{
                    callback(200,service)
                }
            })
        })

        socket.on("extractSubservice",function(data,callback){
            console.log(data)
            Subservice.find({"service":data},function(err,service){
                if(err){
                    callback(500,"Internal service error")
                }else{
                    callback(200,service)
                }
            })
        })
    }
};
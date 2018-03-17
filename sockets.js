var mongoose = require("mongoose");
require("./models/user");
require("./models/feedback");
require("./models/service");
require("./models/subservice")
require("./models/college")
var Subservice = mongoose.model("Subservice")
var Service = mongoose.model("Service")
var User = mongoose.model("User");
var Feedback = mongoose.model("Feedback");
var College = mongoose.model("College")
var activeSocket = [];
var activeUser = [];

module.exports = function(io){
    io.sockets.on("connection",handleSockets);
    function handleSockets(socket){
        console.log("a socket connected")
        socket.on("emitUser",function(data){
            console.log("helllo")
            socket.userid = data.userid;
            activeSocket.push(socket);
            activeUser.push(socket.userid);
            socket.emit("emitUser ack")
        });

        socket.on("getRating",function(data){
            console.log("helllllllo")
            var userid = data.userid;
            var json = {}
            Feedback.findOne({"userid":userid},function(err,feedback){
                if(err){
                    json.status = 500;
                    json.data = "internal server error"
                }else{
                    if(!feedback){
                        json.status = 200
                        json.data = "Unrated"
                    }else{
                        json.status = 200;
                        json.data = feedback.rating;
                    }
                }
                socket.emit("getRating ack",json)
            })
        });

        socket.on("extractServices",function(){
            console.log("hhhhhhhhhh")
            var json = {}
            Service.find({},function(err,service){
                if(err){
                    json.status = 500;
                    json.response = "internal server error"
                }else{
                    json.status = 200;
                    json.response = service
                }
                socket.emit("extractServices ack",json)
            })
        })

        socket.on("extractSubservice",function(data){
            console.log(data)
            var json = {}
            Subservice.find({"service":data},function(err,service){
                if(err){
                    json.status = 500
                    json.response = "internal server error"
                }else{
                    json.status = 200
                    json.response = service
                }
                socket.emit("extractSubservice ack",json)
            })
        })

        socket.on("extractCollege",function(callback){
            var json = {}
            College.find({},function(err,college){
                if(err){
                    json.status = 500
                    json.response = "internal server error"
                }else{
                    json.status = 200
                    json.response = college
                }
                socket.emit("extractCollege ack",json)
            })
        })
    }
};

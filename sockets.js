var mongoose = require("mongoose");
require("./models/user");
require("./models/feedback");
require("./models/userFeedback");
require("./models/service");
require("./models/subservice")
require("./models/college")
require("./models/details")
require("./models/transaction")
var payment = require("./lib/payment");
var Transaction = mongoose.model("Transaction")
var Details = mongoose.model("Details")
var Subservice = mongoose.model("Subservice")
var Service = mongoose.model("Service")
var User = mongoose.model("User");
var Feedback = mongoose.model("Feedback");
var College = mongoose.model("College");
var UserFeedback = mongoose.model("UserFeedback");
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
            UserFeedback.find({"userid":userid},function(err,feedback){
                if(err){
                    json.status = 500;
                    json.data = "internal server error"
                }else{
                    if(!feedback){
                        json.status = 200
                        json.rating = "Unrated"
                    }else{
                        var total = 0;
                        for(var i=0;i<feedback.length;i++){
                            total = total + parseInt(feedback[i].rating)
                        }
                        json.status = 200
                        json.rating = total/feedback.length
                        console.log(json)
                        socket.emit("getRating ack",json)
                    }
                }
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
        socket.on("knumberDetail",function(data){
            var json = {}
            var knumber = data.knumber;
            Details.findOne({"kNumber" : knumber},function(err,fetchBill){
                if(err){
                    json.status = 500
                    json.response = "internal server error"
                }else{
                    json.status = 200;
                    json.response = fetchBill;
                    console.log('fetchbill');
                    socket.emit("knumberDetail ack",json);
                }

            })
            
        })
        socket.on("storeFeedback",function(data){
            console.log("data")
            console.log(data.userid);
            new Feedback({
                userid : data.userid,
                feedback : data.feedback,
                rating : data.rating
            }).save((err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log("Successfully entered")
                }
            })
        });

        socket.on("storeuserFeedback",function(data){
            var respond = data.message;
            respond = respond.split(" ");
            var id = respond[1];
            var rating = respond[2];
            var feed = ""
            for(var i=3;i<respond.length;i++){
                feed = feed + respond[i] + " "
            }
            new UserFeedback({
                "userid"    : id,
                "rating"    : rating,
                "feedback"  : feed
            }).save(function(err,data){
                if(err){
                    console.log(err)
                }else{
                    console.log(data)
                }
            })
            console.log(id)
            console.log(rating)
            console.log(feed)
        })

        socket.on("getPayment",function () {
            socket.emit("getPayment ack",payment);
            console.log(payment);
        })

        socket.on("addMoney",function(data){
            console.log(data)
            new Transaction({
                "userid"        : data.userid,
                "serviceid"     : data.service,
                "subserviceid"  : data.subService,
                "billAmount"    : data.amount,
                "serviceCharge" : data.serviceCharge,
                "aadhar"        : data.aadhaar,
                "pendingStatus" : "1"
            }).save(function(err){
                var json = {}
                if(err){
                    json.status = 500
                    json.response = "internal server error"
                }else{
                    json.status = 200
                    json.response = "transition success"
                    socket.emit("addMoney ack",json)
                }
            })
        })

        socket.on("getWalletBalance",function(req){
            Transaction.find({"userid":req.userid},function(err,data){
                if(!data){
                    console.log("hellllo")
                    socket.emit("getWalletBalance ack",{"lockedBalance":0,"freeBalance":0})
                }else{
                    console.log("helo")
                    var lockedBalance = 0;
                    var freeBalance = 0;
                    for(var i=0;i<data.length;i++){
                        if(data[i].pendingStatus == "1"){
                            console.log("1")
                            lockedBalance = lockedBalance + (parseInt(data[i].billAmount) + parseInt(data[i].serviceCharge))
                        }
                        else if(data[i].pendingStatus == "2"){
                            console.log("2")
                            freeBalance = freeBalance + parseInt(data[i].serviceCharge)
                        }
                        else if(data[i].pendingStatus == "3"){
                            console.log("3")
                            freeBalance = freeBalance - parseInt(data[i].serviceCharge)
                        }
                    }
                    socket.emit("getWalletBalance ack",{"lockedBalance":lockedBalance,"freeBalance":freeBalance})
                }
            })
        })

        socket.on("getPendingStatus",function(data){
            Transaction.find({"userid":data.userid,"pendingStatus":"1"},function(err,data){
            }).populate("serviceid").exec(function(err,pending){
                console.log(pending)
                socket.emit("getPendingStatus ack",pending)
            })
        })

        socket.on("initiatePayment",function(data){
            console.log("hiiiiii")
            Transaction.findOneAndUpdate({"_id":data.transId},{"pendingStatus":"2"},function(err,trans){
                console.log(trans)
                if(err){
                    socket.emit("initiatePayment ack",{"status":500,"response":"internal server error"})
                }
                else if(!trans){
                    socket.emit("initiatePayment ack",{"status":404,"response":"internal server error"})
                }
                else if(trans){
                    socket.emit("initiatePayment ack",{"status":200,"response":"Successfull"})
                }
            })
        })

        socket.on("getTransHistory",function(data){
            Transaction.find({"userid":data.userid,"pendingStatus":"2"},function(err,data){
            }).populate("serviceid").exec(function(err,pending){
                console.log(pending)
                socket.emit("getTransHistory ack",pending)
            })
        })

        socket.on("sendToBank",function(data){
            console.log(data)
            new Transaction({
                "userid"        : data.userid,
                "serviceCharge" : data.amount,
                "pendingStatus" : "3"
            }).save(function(err){
                var json = {}
                if(err){
                    json.status = 500
                    json.response = "internal server error"
                }else{
                    json.status = 200
                    json.response = "transition success"
                    socket.emit("sendToBank ack",json)
                }
            })
        })

        
    }
};

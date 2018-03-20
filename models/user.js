var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "username"  : {"type":String,"required":true},
    "password"  : {"type":String,"required":true},
    "usertype"  : {"type":String},
    "mobiles"   : {"type":String}
});

mongoose.model("User",userSchema,"user");
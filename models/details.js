var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    "kNumber"  : {"type":String,"required":true},
    "name"     : {"type":String,"required":true},
    "mobile"   : {"type":String,"required":true},
    "address"  : {"type":String,"required":true},
    "billAmount" : {"type": String,"required":true}
    //"usertype"  : {"type":String,"required":true}
});

mongoose.model("Details",dataSchema,"details");
var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    "userid"    	: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    "serviceid" 	: {type:mongoose.Schema.Types.ObjectId,ref:'Service'},
    "subserviceid"  : {type:mongoose.Schema.Types.ObjectId,ref:'Subservice'},
    "billAmount"    : {"type":String, "required" : true},
    "serviceCharge" : {"type":String, "required" : true},
    "aadhar"		: {"type":String, "required" : true}
    //
});

mongoose.model("Transaction",transactionSchema,"transaction");
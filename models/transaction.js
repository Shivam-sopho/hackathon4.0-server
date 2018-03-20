var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    "userid"    		: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    "serviceid" 		: {type:mongoose.Schema.Types.ObjectId,ref:'Service'},
    "subserviceid"  	: {type:mongoose.Schema.Types.ObjectId,ref:'Subservice'},
    "billAmount"    	: {"type":String},
    "upiAddress"		: {"type":String},
    "serviceCharge" 	: {"type":String},
    "aadhar"			: {"type":String},
    "pendingStatus"		: {"type":String},
    "bankName"			: {"type":String},
    "account"			: {"type":String}
});

/*
1->pending
2->not pending
3->not req
*/

mongoose.model("Transaction",transactionSchema,"transaction");
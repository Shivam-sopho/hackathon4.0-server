var mongoose = require("mongoose")
var Schema = mongoose.Schema

var serviceSchema = new Schema({
	"service"		: {"type":String},
	//"serviceCharge"	: {"type":String},
	"serviceType"	: {"type":String}
	/*
		1->fixed billpayment
		2->no billpayment
		3->dynamic bill payment
	*/
})
mongoose.model("Service",serviceSchema,"service")
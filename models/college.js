var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var collegeSchema = new Schema({
	"collegeName"		: {"type":String},
	"paymentUrl" : {"type":String}
})

mongoose.model("College",collegeSchema,"college")
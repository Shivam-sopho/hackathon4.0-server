var mongoose = require("mongoose")
var Schema = mongoose.Schema

var subserviceSchema = new Schema({
	"service"		: {type:mongoose.Schema.Types.ObjectId,ref:'Service'},
	"subService"	: {"type":String},
	"charge"		: {"type":String},
	"duration"		: {"type":String}
	/* in number of days */
})
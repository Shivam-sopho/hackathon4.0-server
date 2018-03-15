var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    "userid"    : {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    "feedback"  : [{"type":String}],
    "rating"    : {"type":String}
});

mongoose.model("Feedback",feedbackSchema,"feedback");
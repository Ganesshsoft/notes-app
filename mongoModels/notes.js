var mongoose = require('mongoose');


var notes = new mongoose.Schema({
	title:String,
	owner: String,
	description:String,
	createdAt: Date

},{strict:false});


module.exports = notes;
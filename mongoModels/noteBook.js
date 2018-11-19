var mongoose = require('mongoose');

var noteBook = new mongoose.Schema({
	title:String,
	owner: String,
	createdAt: Date

},{strict:false});


module.exports = noteBook;
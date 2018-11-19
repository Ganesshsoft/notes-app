//Require all modules
var mongoose = require('mongoose'),
    _ = require('lodash'),
    user = require('./user'),
    notes = require('./notes'),
    noteBook = require('./noteBook');


var connections = {};

module.exports =  () => {

    var mongoModels = {};

    mongoModels.user =  () => {
        return mongoose.model('user', user);
    };

     mongoModels.notes =  () => {
        return mongoose.model('notes', notes);
    };

     mongoModels.noteBook =  () => {
        return mongoose.model('noteBook', noteBook);
    };

  return mongoModels;
};
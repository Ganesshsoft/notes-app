var mongoModels = require('../mongoModels/index')();
var User = mongoModels.user();
var Notes = mongoModels.notes();
var NoteBook = mongoModels.noteBook();

module.exports = () => {

  var result = {};

  result.getAllNotes = (req, res) => {
    console.log("Inside getAllNotes");

    Notes.find({}).exec((err, notesInfo) => {
      if (notesInfo) {
        res.json({
          success: true,
          message: "Get All Notes Successfully.",
          data: notesInfo
        });
      } else {
        res.json({
          success: false,
          message: "Error to Getting All Notes."
        });
      }
    });
  }

  result.getNotesById = (req, res) => {
    console.log("Inside getNotesById");
    var noteId = req.body.id;

    if ((typeof noteId == undefined) || noteId == "") {
      res.json({
        success: false,
        message: "Notes Id Not Defined."
      })
    }

    Notes.findOne({
      _id: noteId
    }).exec((err, notesInfo) => {
      if (notesInfo) {
        res.json({
          success: true,
          message: "Get Notes By Id Successfully.",
          data: notesInfo
        });
      } else {
        res.json({
          success: false,
          message: "Error to Getting Notes By Id."
        });
      }
    });
  }

  result.createNote = (req, res) => {
    console.log("Inside createNote");

    var title = req.body.title;
    var owner = req.body.owner;
    var description = req.body.description;
    var date = new Date();

    if ((typeof title == undefined) || title == "") {
      res.json({
        success: false,
        message: "Title not defined."
      })
    } else if ((typeof description == undefined) || description == "") {
      res.json({
        success: false,
        message: "Description not defined."
      })
    } else {
      Notes.findOne({
        title: title
      }).exec((err, noteInfo) => {
        if (noteInfo) {
          res.json({
            success: false,
            message: "Notes allready exists."
          })
        } else {

          var note = new Notes({
            title: title,
            owner: owner,
            description: description,
            createdAt: date
          });
          note.save((err, noteResult) => {
            if (noteResult) {
              res.json({
                success: true,
                message: "Notes Saved Successfully.",
                data: noteResult
              });
            } else {
              res.json({
                success: false,
                message: "Error in Saving Notes."
              });
            }
          });
        }
      });
    }
  }

  result.updateNote = (req, res) => {
    console.log("Inside updateNote");
    var date = new Date();
    var noteId = req.body.id;

    if ((typeof noteId == undefined) || noteId == "") {
      res.json({
        success: false,
        message: "Notes Id Not Defined."
      })
    }
    var obj = {
      title: req.body.title,
      description: req.body.description,
      createdAt: date
    }
    var query = {
      $set: obj
    };

    Notes.findOneAndUpdate({
      _id: noteId
    }, query, {
      new: true
    }, (err, updateNotes) => {
      if (updateNotes) {
        res.json({
          success: true,
          message: "Notes Update Successfully.",
          data: updateNotes
        });
      } else {
        res.json({
          success: false,
          message: "Error Updating Notes."
        });
      }
    });
  }

  result.deleteNote = (req, res) => {
    console.log("Inside deleteNote");
    var noteId = req.body.id;

    if ((typeof noteId == undefined) || noteId == "") {
      res.json({
        success: false,
        message: "Notes Id Not Defined."
      })
    }

    Notes.findByIdAndRemove({
      _id: noteId
    }, (err, deleteNotes) => {
      if (deleteNotes) {
        res.json({
          success: true,
          message: "Notes Deleted Successfully."
        });
      } else {
        res.json({
          success: false,
          message: "Error Deleting Notes."
        });
      }
    });
  }

  return result;
}
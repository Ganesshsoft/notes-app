var mongoModels = require('../mongoModels/index')();
var User = mongoModels.user();
var Notes = mongoModels.notes();
var NoteBook = mongoModels.noteBook();


module.exports = () => {

  var result = {};
  
  result.getAllNoteBooks = (req, res) => {
    console.log("Inside getAllNoteBooks");
    
    NoteBook.find({}).exec((err, noteBkInfo) => {
      if (noteBkInfo) {
        res.json({
          success: true,
          message: "Get All NoteBooks Successfully.",
          data: noteBkInfo
        });
      } else {
        res.json({
          success: false,
          message: "Error to Getting All NoteBooks."
        });
      }
    });  
  }

  result.getNoteBookById = (req, res) => {
    console.log("Inside getNoteBookById");
    var noteBkId = req.body.id;

    if ((typeof noteBkId == undefined) || noteBkId == "") {
      return res.json({
        success: false,
        message: "NoteBook Id Not Defined."
      })
    }

    NoteBook.findOne({
      _id: noteBkId
    }).exec((err, noteBkInfo) => {
      if (noteBkInfo) {
        res.json({
          success: true,
          message: "Get NoteBook By Id Successfully.",
          data: noteBkInfo
        });
      } else {
        res.json({
          success: false,
          message: "Error to Getting NoteBook By Id."
        });
      }
    }); 
  }
  
  result.createNoteBook = (req, res) => {
    console.log("Inside createNoteBook");
    console.log(req.body)
    var title = req.body.title;
    var owner = req.body.owner;
    var date = new Date();

    if ((typeof title == undefined) || title == "") {
      return res.json({
        success: false,
        message: "Title not defined."
      })
    }
    NoteBook.findOne({
        title: title
      }).exec((err, noteBkInfo) => {
        if (noteBkInfo) {
          res.json({
            success: false,
            message: "NoteBook allready exists."
          })
        } else {
          var noteBk = new NoteBook({
            title: title,
            owner: owner,
            createdAt: date
          });
          noteBk.save((err, noteBkResult) => {
            if (noteBkResult) {
              res.json({
                success: true,
                message: "NoteBook Created Successfully.",
                data: noteBkResult
              });
            } else {
              res.json({
                success: false,
                message: "Error in Creating NoteBook."
              });
            }
          });
        }
      });
    }

  result.updateNoteBook = (req, res) => {
    console.log("Inside updateNoteBook");
    var date = new Date();
    var noteBkId = req.body.id;
    var title = req.body.title;
    var owner = req.body.owner;

    if ((typeof noteBkId == undefined) || noteBkId == "") {
      return res.json({
        success: false,
        message: "NoteBook Id Not Defined."
      })
    }
    var obj = {
      title: title,
      owner: owner,
      createdAt: date
    }
    var query = {
      $set: obj
    };

    NoteBook.findOneAndUpdate({
      "_id": noteBkId
    }, query, {
      new: true
    }, (err, updateNoteBk) => {
      console.log(err)
      console.log(updateNoteBk)
      if (updateNoteBk) {
        res.json({
          success: true,
          message: "NoteBook Update Successfully.",
          data: updateNoteBk
        });
      } else {
        res.json({
          success: false,
          message: "Error Updating NoteBook."
        });
      }
    });
    
  }

  result.deleteNoteBook = (req, res) => {
    console.log("Inside deleteNoteBook");
    var noteBkId = req.body.id;

    if ((typeof noteBkId == undefined) || noteBkId == "") {
      return res.json({
        success: false,
        message: "NoteBook Id Not Defined."
      })
    }

    NoteBook.findByIdAndRemove({
      _id: noteBkId
    }, (err, deleteNoteBk) => {
      if (deleteNoteBk) {
        res.json({
          success: true,
          message: "NoteBook Deleted Successfully."
        });
      } else {
        res.json({
          success: false,
          message: "Error Deleting NoteBook."
        });
      }
    });
  }

  return result;
}
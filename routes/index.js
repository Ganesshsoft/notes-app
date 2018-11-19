//Require all routes
var express = require('express');
var router = express.Router();

var userController = require('./user')();
var notesController = require('./notes')();
var noteBookController = require('./noteBook')();


router.get('/',function(req, res){
	res.send("HOME..");
});

//user
router.post('/registration',userController.registration);
router.post('/login',userController.login);

//notes
router.get('/getAllNotes',notesController.getAllNotes);
router.get('/getNotesById',notesController.getNotesById);
router.post('/createNote',notesController.createNote);
router.put('/updateNote',notesController.updateNote);
router.delete('/deleteNote',notesController.deleteNote);

//noteBook
router.get('/getAllNoteBooks',noteBookController.getAllNoteBooks);
router.post('/getNoteBookById',noteBookController.getNoteBookById);
router.post('/createNoteBook',noteBookController.createNoteBook);
router.put('/updateNoteBook',noteBookController.updateNoteBook);
router.delete('/deleteNoteBook',noteBookController.deleteNoteBook);


//export router
module.exports = router;

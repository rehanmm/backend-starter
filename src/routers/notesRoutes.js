const express = require("express");
const noteCtrl = require("../controllers/noteCtrl");
const router = express.Router();

router.route("/note/list")
.get(noteCtrl.list)
.post(noteCtrl.create);
router
  .route("/note/:noteId")
  .get(noteCtrl.read)
  .put(noteCtrl.update)
  .delete(noteCtrl.remove);

router.param("noteId",noteCtrl.noteById);

module.exports = router;

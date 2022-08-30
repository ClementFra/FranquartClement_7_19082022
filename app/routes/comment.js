const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');


// Router get

router.get("/:id", auth, commentCtrl.readOneComment);
router.get("/", auth, commentCtrl.readAllComments);

// Router post

router.post("/", auth, commentCtrl.createComment);
router.post("/:id/like", auth, commentCtrl.likeComment);

// Router put

router.put("/:id", auth, commentCtrl.updateComment);

// Router delete

router.delete("/:id", auth, commentCtrl.deleteComment);



module.exports = router;
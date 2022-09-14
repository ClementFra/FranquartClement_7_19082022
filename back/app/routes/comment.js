const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');



// Router post

router.post("/:postId", auth, commentCtrl.createComment);


// Router put

router.put("/:id", auth, commentCtrl.updateComment);

// Router delete

router.delete("/:id", auth, commentCtrl.deleteComment);



module.exports = router;

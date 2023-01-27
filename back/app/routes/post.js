const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



// Router post

router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id/like", auth, postCtrl.likePost);

// Router get

router.get("/", auth, postCtrl.readAllPosts);
router.get("/:id", auth, postCtrl.readPost);


// Router put

router.put("/:id", auth, multer, postCtrl.updatePost);

// Router delete

router.delete("/:id", postCtrl.deletePost);


module.exports = router;
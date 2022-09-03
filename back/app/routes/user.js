const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require('../middleware/auth');
const pswd = require("../middleware/password");
const rateLter = require("../middleware/rate-limiter");
const multer = require('../middleware/multer-config')


// Router post

router.post("/signup",pswd, userCtrl.signup);
router.post("/login",rateLter, userCtrl.login);
router.post('/refresh', auth, userCtrl.refresh);

// Router get
router.get('/logout', userCtrl.logout);
router.get('/', auth, userCtrl.readUser);
router.get('/export', auth, userCtrl.exportUser);
router.get('/:id', auth, userCtrl.readOneUser);


// Router put

router.put('/', auth,multer, userCtrl.updateUser);

// Router delete

router.delete('/', auth, userCtrl.deleteUser);


module.exports = router;
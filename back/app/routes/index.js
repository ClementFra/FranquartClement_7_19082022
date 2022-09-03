const express = require("express");
const router = express.Router();
const userRoutes= require("./user");
const postRoutes = require("./post");
const commentRoutes = require("./comment")

router.use("/auth", userRoutes); // Auth route
router.use(`/post`, postRoutes); // Post route
router.use("/comments",commentRoutes); // Comment route

module.exports = router;
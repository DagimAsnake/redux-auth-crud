const router = require("express").Router();
const blogController = require("../control/blog")

router.post('/add', blogController.addBlog)

module.exports = router;
const router = require("express").Router();
const blogController = require("../control/blog")

router.post('/add', blogController.addBlog)
router.get('/', blogController.getBlog)
router.get('/:blogId', blogController.getOneBlog)
router.delete('/delete/:blogId', blogController.deleteBlog)
router.put('/update/:blogId', blogController.updateBlog)

module.exports = router;
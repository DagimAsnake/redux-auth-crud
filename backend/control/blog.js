const Blog = require("../model/blog")

module.exports.addBlog = async function (req, res) {
  
      const data = req.body;
      if (!(data.title && data.topic && data.description)) {
          return res.json({
              msg: "Inputs are required",
          });
      }
  
      const inputData = {
          title: data.title,
          topic: data.topic,
          description: data.description,
      }
  
      const newBlog = new Blog(inputData);
  
      await newBlog.save();
      return res.json({
          msg: "Blog sent successfully"
      }).status(200)
  }

  module.exports.getBlog = async function (req, res) {
    try {
      const blogs = await Blog.find({})
        .sort({ createdAt: -1 })
  
      const data = blogs.map((blog) => ({
        _id: blog._id,
        title: blog.title,
        topic: blog.topic,
        description: blog.description,
        createdAt: blog.createdAt,
      }));
  
      return res.status(200).json({
        blogs: data,
      });
    } catch (error) {
      console.error('Error retrieving blogs:', error);
      return res.status(500).json({
        error: 'Server error',
      });
    }
  }
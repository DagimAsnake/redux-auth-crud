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
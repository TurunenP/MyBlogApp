// const blogController = require("express").Router();
// const Blog = require("../models/Blog");
// const verifyToken = require("../middlewares/verifyToken");

// const express = require("express");
// // const router = express.Router();

// blogController.get("/getAll", async (req, res) => {
//   console.log("blogController loaded");

//   try {
//     const blogs = await Blog.find({}).populate("userId", "-password");
//     return res.status(200).json(blogs);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// console.log("blogController loaded");

// blogController.get("/find/:id", async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id).populate(
//       "userId",
//       "-password"
//     );
//     blog.views += 1;
//     await blog.save();
//     return res.status(200).json(blog);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// blogController.get("/featured", async (req, res) => {
//   try {
//     const blogs = await Blog.find({ featured: true })
//       .populate("userId", "-password")
//       .limit(3);
//     return res.status(200).json(blogs);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// blogController.post("/", verifyToken, async (req, res) => {
//   try {
//     const blog = await Blog.create({
//       ...req.body,
//       userId: req.user.id,
//       category: req.body.category.toLowerCase(),
//     });
//     return res.status(201).json(blog);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// blogController.put("/updateBlog/:id", verifyToken, async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (blog.userId.toString() !== req.user.id.toString()) {
//       throw new Error("You can update only your own posts");
//     }

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     ).populate("userId", "-password");

//     return res.status(200).json(updatedBlog);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// });

// blogController.put("/likeBlog/:id", verifyToken, async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (blog.likes.includes(req.user.id)) {
//       blog.likes = blog.likes.filter((userId) => userId !== req.user.id);
//       await blog.save();

//       return res.status(200).json({ msg: "Successfully unliked the blog" });
//     } else {
//       blog.likes.push(req.user.id);
//       await blog.save();

//       return res.status(200).json({ msg: "Successfully liked the blog" });
//     }
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// blogController.delete("/deleteBlog/:id", verifyToken, async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (blog.userId.toString() !== req.user.id.toString()) {
//       throw new Error("You can delete only your own posts");
//     }

//     await Blog.findByIdAndDelete(req.params.id);

//     return res.status(200).json({ msg: "Successfully deleted the blog" });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// // GET blogs by category
// // blogController.get("/category/:categoryName", async (req, res) => {
// //   const categoryName = req.params.categoryName;
// //   try {
// //     const blogs = await Blog.find({ category: categoryName }).populate(
// //       "userId",
// //       "-password"
// //     );
// //     return res.status(200).json(blogs);
// //   } catch (error) {
// //     return res.status(500).json(error);
// //   }
// // });

// blogController.get("/category/:categoryName", async (req, res) => {
//   const categoryName = req.params.categoryName;
//   console.log("Requested category:", categoryName);
//   try {
//     const blogs = await Blog.find({
//       category: { $regex: new RegExp(categoryName, "i") },
//     }).populate("userId", "-password");
//     return res.status(200).json(blogs);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// module.exports = blogController;

//Render

const express = require("express");
const blogController = express.Router();

const Blog = require("../models/Blog");
const verifyToken = require("../middlewares/verifyToken");

// Get all blogs
blogController.get("/getAll", async (req, res) => {
  console.log("Fetched blogs:", data);

  try {
    const blogs = await Blog.find({}).populate("userId", "-password");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get blog by ID
blogController.get("/find/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "userId",
      "-password"
    );
    blog.views += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get featured blogs
blogController.get("/featured", async (req, res) => {
  try {
    const blogs = await Blog.find({ featured: true })
      .populate("userId", "-password")
      .limit(3);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get blogs by category
blogController.get("/category/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;
  try {
    const blogs = await Blog.find({
      category: { $regex: new RegExp(categoryName, "i") },
    }).populate("userId", "-password");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create blog
blogController.post("/", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      userId: req.user.id,
      category: req.body.category.toLowerCase(),
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update blog
blogController.put("/updateBlog/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.userId.toString() !== req.user.id.toString()) {
      throw new Error("You can update only your own posts");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate("userId", "-password");

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Like/unlike blog
blogController.put("/likeBlog/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.likes.includes(req.user.id)) {
      blog.likes = blog.likes.filter((id) => id !== req.user.id);
      await blog.save();
      res.status(200).json({ msg: "Unliked the blog" });
    } else {
      blog.likes.push(req.user.id);
      await blog.save();
      res.status(200).json({ msg: "Liked the blog" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete blog
blogController.delete("/deleteBlog/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.userId.toString() !== req.user.id.toString()) {
      throw new Error("You can delete only your own posts");
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = blogController;

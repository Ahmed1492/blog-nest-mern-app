import Comment from "../../db/models/comment.model.js";
import Blog from "../../db/models/blog.model.js";
import { connectDB } from "../../db/connection.js";

export const addComment = async (req, res, next) => {
  try {
    await connectDB();
    const { blog, name, content } = req.body;
    if (!blog || !name || !content)
      return res.json({ success: false, message: 'All Fields Required.' });
    const isBlogExist = await Blog.findById(blog);
    if (!isBlogExist)
      return res.json({ success: false, message: 'Blog not found' });

    const comment = await Comment.create({ blog, name, content });
    return res.json({ success: true, message: "comment added for review.", comment });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });

  }
};


export const getBlogComments = async (req, res, next) => {
  const { blog } = req.body;
  try {
    await connectDB();
    const comments = await Comment.find({ blog, isApproved: true }).sort({ createdAt: -1 });
    return res.json({ success: true, comments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });

  }
};


export const getComments = async (req, res, next) => {
  try {
    await connectDB();
    const comments = await Comment.find({ isApproved: true });
    return res.json({ success: true, comments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });

  }
};




export const getCommentsAdmin = async (req, res, next) => {
  try {
    await connectDB();
    const comments = await Comment.find({}).populate('blog').sort({ createdAt: -1 });
    return res.json({ success: true, comments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });

  }
};



export const deleteCommentById = async (req, res, next) => {
  try {
    await connectDB();
    const { id } = req.params;
    const checkComment = await Comment.findById(id);
    if (!checkComment)
      return res.json({ success: false, message: "comment not found!" });
    await Comment.findByIdAndDelete(id);
    return res.json({ success: true, message: 'comment deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};

export const approveComment = async (req, res, next) => {
  try {
    await connectDB();
    const { id } = req.body;
    const approvedComment = await Comment.findById(id);
    if (!approvedComment)
      return res.json({ success: false, message: "comment not found!" });
    approvedComment.isApproved = true;
    approvedComment.save();
    return res.json({ success: true, message: 'comment is approved !', approvedComment });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};

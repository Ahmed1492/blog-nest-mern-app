import jwt from "jsonwebtoken";
import 'dotenv/config';
import Blog from "../../db/models/blog.model.js";
import Comment from "../../db/models/comment.model.js";
import { connectDB } from "../../db/connection.js";


const generateToken = async (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


export const adminLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) return res.json({ success: false, message: 'please fill inputs' });

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
    const token = await generateToken(email);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });

  }
};

export const getDashboard = async (req, res, next) => {
  try {
    await connectDB();
    const recentBlogs = await Blog.find({}).limit(5).sort({ createdAt: -1 });
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const draftBlogs = await Blog.countDocuments({ isPublished: false });
    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      draftBlogs
    };
    return res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });

  }
};
import { Router } from "express";
import { createBlog, getBlogs, getBlogById, deleteBlogById, togglePublish, getBlogsAdmin, generateContent } from "../controllers/blog.controller.js";
import isAuth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = Router();

// create blog
router.post('/create-blog', upload.single('image'), isAuth, createBlog);

// list all blogs (is published = true)
router.get('/', getBlogs);


// list all blogs (Admin)
router.get('/admin-blogs', getBlogsAdmin);

// get blog by id
router.get('/:id', getBlogById);

// delete blog by id
router.post('/delete-blog', isAuth, deleteBlogById);

// toggle blog Publish
router.post('/toggle-publish', isAuth, togglePublish);

// generate blog with AI
router.post('/generate', generateContent);

export default router;  
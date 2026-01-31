import main from "../../config/gemini.js";
import Blog from "../../db/models/blog.model.js";


export const createBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } =
      JSON.parse(req.body.blog);

    if (!title || !subTitle || !description || !category) {
      return res.json({ success: false, message: "All fields Required" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

    // 🌤 Cloudinary gives URL directly
    const imageUrl = req.file.path;

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image: imageUrl,
    });

    return res.json({ success: true, message: "Blog created!", blog });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });
  }
};












export const getBlogs = async (req, res, next) => {
  try {
    let blogs = await Blog.find({ isPublished: true });
    return res.json({ success: true, blogs });
  } catch (error) {
    console.log(error);
    return res.json({ success: fasle, err: error.message, stack: error.stack });

  }
};

export const getBlogsAdmin = async (req, res, next) => {
  try {
    let blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, blogs });
  } catch (error) {
    console.log(error);
    return res.json({ success: fasle, err: error.message, stack: error.stack });

  }
};


export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    let blog = await Blog.findById(id);

    if (!blog)
      return res.json({ success: false, message: 'blog not found' });

    return res.json({ success: true, blog });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });
  }
};



export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;

    let blog = await Blog.findByIdAndDelete(id);

    if (!blog)
      return res.json({ success: false, message: 'blog not found' });

    return res.json({ success: true, message: "blog deleted successfully" });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });
  }
};


export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    let blog = await Blog.findById(id);
    if (!blog)
      return res.json({ success: false, message: "Blog not found" });

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res.json({
      success: true,
      message: "Publish state toggled",
      isPublished: blog.isPublished,
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      err: error.message,
      stack: error.stack
    });
  }
};



export const generateContent = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // const content = await main(prompt + ` Generate a blog content with bullet points and proper formatting`);

    const content = await main(prompt + `Generate a detailed blog with the following formatting:
          1. Use numbered sections (1, 2, 3...) for the main ideas.
          2. Inside each section, add bullet points (•).
          3. Include headings and subheadings.
          4. Write in long text format.
          5. Do NOT return plain text.`);
    return res.json({ success: true, content });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      err: error.message,
      stack: error.stack
    });
  }
};
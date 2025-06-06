import Blog from '../model/Blog.js';
import imagekit from '../config/imagekit.js';
import fs from 'fs';

export const createBlog = async (req, res) => {
  try {
    if (!req.body.blog) {
      return res.status(400).json({ success: false, message: 'No blog data provided' });
    }

    const {
      title, subTitle, slug, description,
      category, author, isPublished
    } = JSON.parse(req.body.blog);

    const imageFile = req.file;

    if (!title || !slug || !description || !category || !imageFile) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Slug already exists' });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blog_images'
    });

    const image = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: 1280 }
      ]
    });

    await Blog.create({
      title,
      subTitle,
      slug,
      
      description,
      
      category,
      author,
      image,
      isPublished: isPublished ?? false,
      
    });

    res.json({ success: true, message: 'Blog created successfully' });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    if (!req.body.blog) {
      return res.status(400).json({ success: false, message: 'No blog data provided' });
    }
    const {
      title, subTitle, slug, description,
      category, author, isPublished
    } = JSON.parse(req.body.blog);

    const imageFile = req.file;
    const updateData = {
      title,
      subTitle,
      slug,
      description,
      category,
      author,
      isPublished: isPublished ?? false
    };

    if (imageFile) {
      const fileBuffer = fs.readFileSync(imageFile.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: '/blog_images'
      });
      updateData.image = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: 'auto' },
          { format: 'webp' },
          { width: 1280 }
        ]
      });
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog updated successfully', blog: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({
      success: true,
      message: 'Blog publish status updated successfully',
      isPublished: blog.isPublished
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

import Blog from '../model/Blog.js';
import imagekit from '../config/imagekit.js';
import fs from 'fs';

export const createBlog = async (req, res) => {
  try {
    const {
      title, subTitle, slug, description,
      category, author, isPublished
    } = req.body;

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

    // Clean up the temp file
    fs.unlinkSync(imageFile.path);

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
      isPublished: isPublished === true // handle string "true"/"false"
    });

    res.json({ success: true, message: 'Blog created successfully' });

  } catch (error) {
    console.error('Create Blog Error:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};


export const updateBlog = async (req, res) => {
  try {
    const {
      title, subTitle, slug, description,
      category, author, isPublished
    } = req.body;

    const imageFile = req.file;
    const updateData = {
      title,
      subTitle,
      slug,
      description,
      category,
      author,
      isPublished: isPublished === true
    };

    if (imageFile) {
      const fileBuffer = fs.readFileSync(imageFile.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: '/blog_images'
      });

      // Clean up the temp file
      fs.unlinkSync(imageFile.path);

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
    console.error('Update Blog Error:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
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
    const { id } = req.params;
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

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getPublishedBlogs = async (req, res) => {
  try {
    console.log("Fetching published blogs...");
    // Optional: Check if Blog model is connected
    if (!Blog) {
      throw new Error("Blog model not found or not imported correctly.");
    }

    const blogs = await Blog.find({ isPublished: true });
    console.log("Found blogs:", blogs.length);
    
    res.json({ success: true, blogs });
  } catch (error) {
    console.error('Error fetching published blogs:', error); 
    return res.status(500).json({ success: false, message: 'Failed to fetch published blogs', error: error.message });
  }
};

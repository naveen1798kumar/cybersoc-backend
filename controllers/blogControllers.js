import Blog from '../models/Blog.js';

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};

export const createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  const saved = await blog.save();
  res.status(201).json(saved);
};

export const updateBlog = async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted' });
};

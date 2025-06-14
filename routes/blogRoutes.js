import express from 'express';
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  togglePublish,
  getBlogBySlug 
} from '../controllers/blogControllers.js';
import { updateBlog } from '../controllers/blogControllers.js';

import upload from '../middleware/multer.js';

const blogRouter = express.Router();

blogRouter.post('/add', upload.single('image'), createBlog);
blogRouter.put('/update/:id', upload.single('image'), updateBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:id', getBlogById);
blogRouter.get('/slug/:slug', getBlogBySlug);

blogRouter.delete('/:id',  deleteBlogById);
blogRouter.post('/toggle-publish',  togglePublish);

export default blogRouter;

/*

blogRouter.get('/dummy', (req, res) => {
  res.json({
    success: true,
    blogs: [
      {
        _id: "1",
        title: "Dummy Blog Title",
        subTitle: "A dummy subtitle",
        slug: "dummy-blog-title",
        description: "This is a dummy blog description.",
        category: "General",
        image: "https://placehold.co/600x400",
        date: new Date().toISOString(),
        author: "Admin",
        isPublished: true
      },
      {
        _id: "2",
        title: "Second Dummy Blog",
        subTitle: "Another subtitle",
        slug: "second-dummy-blog",
        description: "Another dummy blog description.",
        category: "Tech",
        image: "https://placehold.co/600x400",
        date: new Date().toISOString(),
        author: "Admin",
        isPublished: false
      }
    ]
  });
});

*/ 
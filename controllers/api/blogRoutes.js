const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all blogs
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            title: req.body.title,
            content: req.body.content,
        });

        if(!blogData) {
            res.status(400).json({ message: 'Sorry, could not find blog data' });
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Create new blog
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
        }); 

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateBlog = await Blog.update({
            title: req.body.title,
            content: req.body.content,
        },
        {
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No data found with this id' });
            return;
        }
        
        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Post comments (comments don't work)
router.post('/comments', withAuth, async (req, res) => {
    try {
      const commentData = await Blog.create({
        comment: req.body.comment,
      });
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;

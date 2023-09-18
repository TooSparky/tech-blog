const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Testing to try and get /api/blogs
router.get('/blogs', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll();

        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Create new blog
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            // body or session?
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
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
                user_id: req.session.user_id,
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

module.exports = router;

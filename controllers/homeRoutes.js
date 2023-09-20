const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Blog } = require('../models');

// get to the login page
router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// error, too many requests...
// Get all the blogs to display on homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            title: req.body.title,
            content: req.body.content,
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render("homepage", { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// to comment
// router.post('/', withAuth, async (req, res) => {
//     try {
//         const commentData = await Blog.create({
//             comment: req.body.comment,
//         });

//         res.status(200).json(commentData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

module.exports = router;

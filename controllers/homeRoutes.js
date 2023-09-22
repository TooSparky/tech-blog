const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Blog } = require('../models');

// get to the login page
router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

// Get to the signup page
router.get('/signup', async (req, res) => {
  res.render("signup");
});

// Get all the blogs to display on homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll();

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render("homepage", { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get the blank dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get new post on dashboard page
router.get('/dashboard/post', withAuth, async (req, res) => {
  try {
    const blogs = await Blog.findAll();

    res.render("dashboard-post", { blogs, logged_in: req.session.logged_in });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Get to edit posts on dashboard page
router.get('/dashboard/edit', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard-edit", { blogs, logged_in: req.session.logged_in });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Post comments
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

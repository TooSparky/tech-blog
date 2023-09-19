const router = require('express').Router();
const { User } = require('../../models');

// to load login page
router.get('/', async (req, res) => {
    try {
        res.render("login", {
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// WORKS! after sign-in, login works
// Find username /login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are logged in' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// WORKS! reutrns username and hashed password
// Create new user /signup
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Password must be at least 6 characters long, please try again' });
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now signed in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// ERROR but program ends... maybe works
// Handles /logout
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        res.session.destroy(() => {
            res.status(204).end();
        });

    } else {
        res.status(404).end();
    }
});

module.exports = router;

const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Handles /login
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

// router.get('/signup', async (req, res) => {
//     try {
//         const userData = await User.
//     } catch (err) {
//         res.status(400).json(err);
//     }
// })

// Handles /signup
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Oops, something went wrong, please try again' });
            return;
        }

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

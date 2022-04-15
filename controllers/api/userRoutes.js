const router = require('express').Router();
const {
    User
} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json({
                message: `Username ${userData.username} created`,
                username: userData.username
            });
        });
    } catch (err) {
        let message = 'Something went wrong.';

        if (!err.errors) {
            res.status(400).json({
                message,
                // ...err
            });
            return;
        }

        switch (err.errors[0].message) {
            case 'user.username cannot be null':
            case 'user.password cannot be null':
                message = 'Please provide a username and password';
                break;
            case 'username must be unique':
                message = 'User already exists with that username.';
                break;
            case 'Validation len on password failed':
                message = 'Password must be 8 characters or more.';
                break;
            default:
                message = err.errors[0].message;
        }

        res.status(400).json({
            message,
            // ...err
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!userData) {
            throw {
                message: 'Incorrect username or password, please try again'
            };
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            throw {
                message: 'Incorrect username or password, please try again'
            };
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.json({
                // user: userData,
                message: `${userData.username} is now logged in!`
            });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
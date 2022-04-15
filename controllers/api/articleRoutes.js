const router = require('express').Router();
const {
    Article
} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const articleData = await Article.create({
            ...req.body,
            user_id: req.session.user_id
        });

        const article = articleData.toJSON();

        res.status(200).json({
            message: `"${article.title}" published by ${req.session.username} at ${article.createdAt}`
        })
    } catch (err) {
        let message = 'Something went wrong.';

        if (!err.errors) {
            res.status(400).json({
                message,
                // ...err
            });
            return;
        }

        res.status(400).json({
            message,
            // ...err
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateData = await Article.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        const articleData = await Article.findByPk(req.params.id);
        const article = articleData.toJSON();

        res.status(200).json({
            message: `"${article.title}" updated by ${req.session.username} at ${article.updatedAt}`
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

        res.status(400).json({
            message,
            // ...err
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Article.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            message: `Article id: ${req.params.id} deleted by ${req.session.username}`
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

        res.status(400).json({
            message,
            // ...err
        });
    }
});

module.exports = router;
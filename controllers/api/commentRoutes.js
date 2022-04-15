const router = require('express').Router();
const {
    Comment
} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        const comment = commentData.toJSON();

        res.status(200).json({
            message: `Comment added by ${req.session.username} at ${comment.createdAt}`
        });
    } catch (err) {
        let message = 'Something went wrong.';

        res.status(400).json({
            message,
            err
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateData = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            message: `Comment updated by ${req.session.username} at ${article.updatedAt}`
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
        await Comment.destroy({
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
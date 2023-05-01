const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {

    // CREATE Comment
    app.post('/posts/:postId/comments', async (req, res) => {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);
        comment.author = req.user._id;

        try {
            const post = await Post.findById(req.params.postId);
            post.comments.unshift(comment);

            await Promise.all([
                post.save(),
                comment.save(),
            ]);

            res.redirect(`/posts/${req.params.postId}`);
        } catch (err) {
            console.log(err);
        }
    });
};

const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
  // NEW REPLY
  app.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
    const currentUser = req.user;
    let post;
    Post.findById(req.params.postId).lean()
      .then((p) => {
        post = p;
        return Comment.findById(req.params.commentId).lean();
      })
      .then((comment) => {
        res.render('replies-new', { post, comment, currentUser });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

// CREATE REPLY
app.post('/posts/:postId/comments/:commentId/replies', async (req, res) => {
    try {
      // TURN REPLY INTO A COMMENT OBJECT
      const reply = new Comment(req.body);
      reply.author = req.user._id;
      
      // LOOKUP THE PARENT POST
      const post = await Post.findById(req.params.postId);
  
      // FIND THE CHILD COMMENT AND ADD THE REPLY
      const [replyObj, comment] = await Promise.all([
        reply.save(),
        Comment.findById(req.params.commentId),
      ]);
      comment.comments.unshift(replyObj._id);
      await comment.save();
  
      // SAVE THE CHANGE TO THE PARENT DOCUMENT AND REDIRECT
      await post.save();
      res.redirect(`/posts/${req.params.postId}`);
    } catch (err) {
      console.log(err);
    }
  });
};
const Post = require('../models/post');

module.exports = (app) => {

  // INDEX
  // Stretch Challenge - Async and Await
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
  });

  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
  });

  // CREATE
  // Stretch Challenge - Async and Await
  app.post('/posts/new', async (req, res) => {
    try {
      const post = new Post(req.body);
      await post.save();
      res.redirect('/');
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  });

  // SHOW
  // Stretch Challenge - Async and Await
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      return res.render('posts-show', { post });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  // Stretch Challenge - Async and Await
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render('posts-index', { posts });
    } catch (err) {
      console.log(err);
    }
  });
};
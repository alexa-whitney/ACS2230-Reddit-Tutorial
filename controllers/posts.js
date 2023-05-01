const Post = require('../models/post');

module.exports = (app) => {

  // Define checkAuth middleware
const checkAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).send('Unauthorized');
  }
};

  // INDEX
  // Stretch Challenge - Async and Await
  app.get('/', async (req, res) => {
    const currentUser = req.user;

    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // NEW
  app.get('/posts/new', checkAuth, (req, res) => {
    res.render('posts-new');
  });

  // CREATE
  // Stretch Challenge - Async and Await
  app.post('/posts/new', checkAuth, async (req, res) => {
    if (req.user) {
      const post = new Post(req.body);
  
      try {
        await post.save();
        res.redirect('/');
      } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
      }
    } 
  });

  // SHOW
  // Stretch Challenge - Async and Await
  app.get('/posts/:id', async (req, res) => {
    const currentUser = req.user;

    try {
      const post = await Post.findById(req.params.id).lean().populate('comments');
      return res.render('posts-show', { post, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  // Stretch Challenge - Async and Await
  app.get('/n/:subreddit', async (req, res) => {
    const currentUser = req.user;

    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err);
    }
  });
};
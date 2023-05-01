const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

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
    try {
      const { user } = req;
      console.log(req.cookies);
      const posts = await Post.find({}).lean().populate('author');
      res.render('posts-index', { posts, user });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });

  // NEW
  app.get('/posts/new', checkAuth, (req, res) => {
    res.render('posts-new');
  });

  // CREATE
  // Stretch Challenge - Async and Await
  app.post('/posts/new', async (req, res) => {
    if (req.user) {
      try {
        const userId = req.user._id;
        const post = new Post(req.body);
        post.author = userId;
        await post.save();
  
        const user = await User.findById(userId);
        user.posts.unshift(post);
        await user.save();
  
        // REDIRECT TO THE NEW POST
        return res.redirect(`/posts/${post._id}`);
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
      }
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // SHOW
  // Stretch Challenge - Async and Await
  app.get('/posts/:id', async (req, res) => {
    const currentUser = req.user;

    try {
      const post = await Post.findById(req.params.id).lean().populate({ path:'comments', populate: { path: 'author' } }).populate('author')
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
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean().populate('author');
      res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err);
    }
  });
};
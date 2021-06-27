const router = require('express').Router();
const {  User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  const blogData = await Blog.findAll();
  const blogs = blogData.map((blog) => {
    let modblog = blog.get({ plain: true })
    if (modblog.body.length > 280){
      modblog.body = modblog.body.substr(0, 279);
      modblog.body += "...";
      return modblog;
    }
  });
  if (req.session.logged_in){
    res.render('home', {blogs, logged_in: true});
  }
  else {
    res.render('home', blogs);
  }
});

router.get('/dashboard', withAuth, (req, res) => {
  res.render('/dash', {logged_in: true});
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  else {
    res.render('login');
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    const blog = blogData.get({ plain: true });

    let logged_in;
    let owner;
    if (req.session.logged_in){
      logged_in = true;
      if (req.session.user_id === blog.user_id){
        owner = true;
      }
      else {
        owner = false;
      }
    }
    else {
      logged_in = false;
      owner = false;
    }


    const commentData = await blogData.getCommments();
    if (commentData){
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      res.render('blog', {blog, comments, logged_in});
        return;
    }
    else {
      res.render('blog', {blog, logged_in})
    }
    
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    const blog = blogData.get({ plain: true });

    if (req.session.user_id !== blog.user_id){
      res.status(403);
      return;
    }

    res.render('edit', {blog, logged_in: true})
    
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
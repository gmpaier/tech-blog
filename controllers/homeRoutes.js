const router = require('express').Router();
const {  User, Blog } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/dashboard', withAuth, (req, res) => {
  res.redirect('/dash');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dash');
    return;
  }
  else {
    res.redirect('/login');
  }
});

router.get('/blog', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.body.blog_id);
    const blog = blogData.get({ plain: true });
    if (req.session.logged_in) {
      res.render('blog', {blog, logged_in: true});
      return;
    }
    else {
      res.render('blog', {blog, logged_in: false});
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

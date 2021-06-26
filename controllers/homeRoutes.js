const router = require('express').Router();
const {  User, Blog } = require('../models')
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
  res.render('home', blogs);
});

router.get('/dashboard', withAuth, (req, res) => {
  res.render('/dash');
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

module.exports = router;
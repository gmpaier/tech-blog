const router = require('express').Router();
const {  User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', async (req, res) => {
  const blogData = await Blog.findAll({include: User});
  const blogs = blogData.map((blog) => {
    let modblog = blog.get({ plain: true })
    modblog.route = "/blog/" + blog.id;
    if (modblog.body.length > 280){
      modblog.body = modblog.body.substr(0, 279);
      modblog.body += "...";
      return modblog;
    }
    return modblog
  });
  if (req.session.logged_in){
    res.render('home', {blogs: blogs, logged_in: true});
  }
  else {
    res.render('home', blogs);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  const blogData = await Blog.findAll({where: {user_id: req.session.user_id}, include: User})
  const blogs = blogData.map((blog) => {
    let modblog = blog.get({ plain: true })
    console.log(modblog);
    modblog.route = "/blog/" + blog.id;
    if (modblog.body.length > 280){
      modblog.body = modblog.body.substr(0, 279);
      modblog.body += "...";
      return modblog;
    }
    return modblog
  });
  res.render('dash', {blogs: blogs, logged_in: true});
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
    console.log("in individual blog");
    const blogData = await Blog.findByPk(req.params.id);
    const blog = blogData.get({ plain: true });
    blog.route = "/edit/" + blog.id
    console.log(blog);
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


    const commentData = await Comment.findAll({where: {blog_id: req.params.id}, include: User})
    console.log("through commentData");
    if (commentData){
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      res.render('blog', {blog: blog, comments: comments, logged_in: logged_in, owner: owner});
    }
    else {
      res.render('blog', {blog: blog, logged_in: logged_in, owner: owner})
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

    res.render('edit', {blog: blog, logged_in: true})
    
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
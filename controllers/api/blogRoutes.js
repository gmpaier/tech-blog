const router = require('express').Router();
const {Blog} = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.status(200).json(blogs);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.get("/user", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({where: {user_id: req.session.user_id}})
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.status(200).json(blogs);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    await Blog.create(
      {
        user_id: req.session.user_id,
        title: req.body.title,
        body: req.body.body,
        date: Date.now()
      }
    );
    res.status(200);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    await Blog.update(
      {
        title: req.body.title,
        body: req.body.body,
        date: Date.now()
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    await Blog.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
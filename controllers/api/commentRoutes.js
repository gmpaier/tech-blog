const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
  try {
    await Comment.create(
      {
        user_id: req.session.user_id,
        blog_id: req.body.blog_id,
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

module.exports = router;
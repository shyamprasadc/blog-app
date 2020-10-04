const express = require("express");
const verify = require("../controllers/auth");
const Article = require("../models/article");
const router = express.Router();

router.get("/all", async (req, res) => {
  const articles = await Article.find().sort({ created_at: "desc" });
  res.json({ data: articles });
});

router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json({ data: article });
  } catch (err) {
    res.send(err);
  }
});

router.post("/new", verify, async (req, res) => {
  const article = new Article({
    userId: req.user,
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    await article.save();
    res.json({ message: "article created" });
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", verify, async (req, res) => {
  let article = await Article.findById(req.params.id);
  article.title = req.body.title;
  article.description = req.body.description;
  article.markdown = req.body.markdown;
  try {
    await article.save();
    res.json({ message: "article updated" });
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "article deleted" });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

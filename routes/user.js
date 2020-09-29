const router = require("express").Router();
const verify = require("../controllers/auth");
const User = require("../models/user");

router.get("/details", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user});
  res.send({name: user.name})
});

module.exports = router;

const express = require("express");
const router = express.Router();
const user = require("../Models/user");
const bcrypt = require("bcrypt");
const comment = require("../Models/comment");
const post = require("../Models/post");
const verifyToken = require("../verifyToken")

//Update
router.put("/:id",verifyToken,async(req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete
router.delete("/:id",verifyToken, async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    await post.deleteMany({ userId: req.params.id });
    await comment.deleteMany({ userId: req.params.id });
    res.status(200).json("User have been deleted")
  } catch (err) {
    res.status(500).send(err)
  }
});

//Get User
router.get("/:id", async (req, res) => {
  try {
    const User= await user.findById(req.params.id)
    const {password,...info} = User._doc
    res.status(200).json(info)
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;

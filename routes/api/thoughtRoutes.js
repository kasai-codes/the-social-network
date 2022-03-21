const router = require("express").Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/postController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).put(updateThought);

router.route("/:userId/:thoughtId").delete(removeThought);

router.route("/:thoughtId/:reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;

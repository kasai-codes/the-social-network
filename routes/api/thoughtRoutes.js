const router = require("express").Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");
// /api/thoughts
router
.route("/")
.get(getThoughts)
.post(createThought);

//  api/;thoughtid
router
.route("/:thoughtId")
.get(getSingleThought)
.put(updateThought);

// api/userid/thoughtid
router
.route("/:userId/:thoughtId")
.delete(removeThought);



// /api/thoughts/<thoughtId>/reactions
router.route
("/:thoughtId/:reactions")
.post(addReaction);

// /api/<thoughtId>/reactions/<reactionId>
router.route
("/:thoughtId/reactions/:reactionId")
.delete(removeReaction);

module.exports = router;

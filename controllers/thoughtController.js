const { Thought, User} = require('../models')

module.exports = {
   // get all thoughts
   getThoughts(req, res) {
    Thought.find({})
      
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

// get one thought by id
getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

// add thought to user
createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

// update thought by id
updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },


// remove thought
deleteCourse(req, res) {
    Course.findOneAndDelete({ _id: req.params.courseId })
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with that ID' })
          : Student.deleteMany({ _id: { $in: course.students } })
      )
      .then(() => res.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

// add reaction
addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
    )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
},

// remove reaction
removeReaction({ params }, res) {
    console.log(params.thoughtId, params.reactionId);
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { runValidators: true, new: true }
    )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
}



}
const { User, Thought } = require("../models");

module.exports = {
  // get all users
  getUsers(req, res) {
      User.find({})
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
  },

  // get one user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },

  // createUser
  createUser({ body }, res) {
      User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err));
  },


  // update user by id
  updateUser(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts} })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: {
            friends: req.params.friendId,
            }              
        },
        { runValidators: true, new: true }
    )
 
      .then((friends) => res.json(friends))
      .catch((err) => res.status(500).json(err));
  },
  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {
            friends: req.params.friendId,
            } 
        },
        { runValidators: true, new: true }
    )
      .then((friends) => {
        if (!friends) {
          res.status(404).json({message: 'No friend found with this id'})
          return;
        }
        res.json({message: 'Successfully removed this friend.'})
      })
      .catch((err) => res.status(500).json(err));
  },

};


  






// TODO:
// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list
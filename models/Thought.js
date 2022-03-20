const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");


const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: function () {
      return this.toLocaleString();
    },
  },

  username: {
    type: String,
    required: true,
  },
// bringing in reactionSchema
  reactions: [reactionSchema],

  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});


thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = { Thought };

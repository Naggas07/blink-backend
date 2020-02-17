const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentEventSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc.id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      }
    }
  }
);

const CommentEvent = mongoose.model("CommentEvent", commentEventSchema);

module.exports = CommentEvent;

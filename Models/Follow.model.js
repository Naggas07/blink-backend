const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema(
  {
    bussinnes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    userFollow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    state: {
      type: String,
      enum: ["Follow", "Unfollow"],
      default: "Follow"
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;

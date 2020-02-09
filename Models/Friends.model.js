const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendshipSchema = new Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    state1: {
      type: String,
      enum: ["Acepted", "Pending", "Dismiss"],
      default: "Pending"
    },
    state2: {
      type: String,
      enum: ["Acepted", "Pending", "Dismiss"],
      default: "Pending"
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

const Friends = mongoose.model("Friends", friendshipSchema);

module.exports = Friends;

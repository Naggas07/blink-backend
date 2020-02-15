const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Topics = require("./Topics.models");

const topics = Topics.find({}, { id: 0, name: 1 }).then(data => data);

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    topics: {
      type: [String],
      enum: topics
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    limitUsers: {
      type: Number
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

EventSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "users",
  justOne: false
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;

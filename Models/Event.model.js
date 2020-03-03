const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Topics = require("./Topics.models");

const topics = Topics.find({}, { id: 0, name: 1 }).then(data => data);

console.log(Topics.schema.path("name").enumValues);

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ["Point"]
      },
      coordinates: {
        type: [Number]
      }
    },
    topics: {
      type: [String],
      enum: Topics.schema.path("name").enumValues
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    image: {
      type: String,
      default:
        "http://res.cloudinary.com/docfree/image/upload/v1582458576/B-link/no-featured-image.jpg.jpg"
    },
    date: {
      type: Date,
      required: true
    },
    limitUsers: {
      type: Number
    },
    reserves: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
      default: []
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
      max: 1000
    },
    describe: {
      type: String,
      default: null
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

EventSchema.virtual("comments", {
  ref: "CommentEvent",
  localField: "_id",
  foreignField: "comments",
  justOne: false
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;

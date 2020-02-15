const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Topics = require("./Topics.models");

const topics = Topics.find({}, { id: 0, name: 1 }).then(data => data);

const EventSchema = new Schema({
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
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;

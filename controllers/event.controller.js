const Event = require("../Models/Event.model");
const Topics = require("../Models/Topics.models");

module.exports.new = (req, res, next) => {
  console.log(Topics.schema.path("name").enumValues);
  console.log(req.body);
  const {
    title,
    location,
    topics,
    business,
    image,
    date,
    limitUsers
  } = req.body;

  if ((!title, !business, !date)) {
    res.status(400).json({ message: "items required" });
  }

  const event = {
    title,
    location,
    topics,
    business,
    image,
    date,
    limitUsers
  };

  Event.create(event)
    .then(event => {
      console.log(event);
      res.status(202).json(event);
    })
    .catch(next);
};

module.exports.reserve = (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;

  Event.findById(id)
    .then(event => {
      if (!event) {
        res.status(404).json({ message: "Event not found" });
      } else {
        const newUsers = [...event.reserves, user];
        if (event.limitUsers > 0 && event.reserves.length >= event.limitUsers) {
          res.status(400).json({ message: "Event full" });
        } else {
          Event.findByIdAndUpdate(
            id,
            { reserves: newUsers },
            { new: true }
          ).then(updated => {
            res.status(201).json(updated);
          });
        }
      }
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Event.find()
    .then(events => {
      if (!events) {
        res.status(404).json({ message: "Events not found" });
      } else {
        res.status(200).json(events);
      }
    })
    .catch(next);
};

module.exports.unsuscribe = (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;

  Event.findById(id)
    .then(event => {
      if (!event) {
        res.status(404).json({ message: "Event not found" });
      } else {
        console.log(event.reserves[1], user);
        const reserves = event.reserves.filter(data => data != user);
        Event.findByIdAndUpdate(id, { reserves }, { new: true }).then(
          update => {
            res.status(202).json(update);
          }
        );
        // res.json(event);
      }
    })
    .catch(next);
};

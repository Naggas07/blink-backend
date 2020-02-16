const Topic = require("../Models/Topics.models");

module.exports.new = (req, res, next) => {
  const { name } = req.body;

  const topic = {
    name
  };

  Topic.create(topic)
    .then(newTopic => {
      res.status(201).json(newTopic);
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Topic.find()
    .then(topics => {
      if (!topics) {
        res.status(404).json({ message: "Topics not found" });
      } else {
        res.status(200).json(topics);
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { name, state } = req.body;

  Topic.findById(id)
    .then(topic => {
      const toUpdate = {
        name: !name ? topic.name : name,
        state: !state ? topic.state : state
      };
      Topic.findByIdAndUpdate(id, toUpdate, { new: true }).then(updated => {
        res.status(202).json(updated);
      });
    })
    .catch(next);
};

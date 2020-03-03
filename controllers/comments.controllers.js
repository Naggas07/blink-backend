const Comment = require("../Models/eventComents.model");

module.exports.new = (req, res, next) => {
  const { event, user, message } = req.body;

  if ((!event, !user, !message)) {
    res.status(400).json({ message: "All items are required" });
  } else {
    const comment = {
      message,
      event,
      user
    };

    Comment.create(comment)
      .then(create => {
        res.status(202).json({ message: "Comment created" });
      })
      .catch(next);
  }
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;
  const { user, message } = req.body;

  if (user === currentUser._id || currentUser.userType === "Admin") {
    Comment.findByIdAndUpdate(id, { message }, { new: true })
      .then(update => {
        res.status(201).json(update);
      })
      .catch(next);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;
  const { user } = req.body;

  if (user === currentUser._id || currentUser.userType === "Admin") {
    Comment.findOneAndDelete(id)
      .then(update => {
        res.status(202).json({ message: "Comment deleted" });
      })
      .catch(next);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports.eventComments = (req, res, next) => {
  const { id } = req.params;

  Comment.find({ event: id })
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(next);
};

const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User.model");
const Friends = require("../Models/Friends.model");

module.exports.createFriends = (req, res, next) => {
  const { user1, user2 } = req.body;

  if (!user1 || !user2) {
    res.status(404).json({ mesage: "users are required" });
  }

  Friends.findOne({
    $or: [
      { user1, user2 },
      { user1: user2, user2: user1 }
    ]
  })
    .then(relation => {
      if (relation) {
        res.status(400).json({ message: "friendship already exist" });
      } else {
        User.findById(user1).then(user1 => {
          if (!user1) {
            res.status(404).json({ mesage: "user not found" });
          } else {
            User.findById(user2).then(user2 => {
              if (!user2) {
                res.status(404).json({ mesage: "user not found" });
              } else {
                const friendship = {
                  user1,
                  user2,
                  state1: "Acepted"
                };

                Friends.create(friendship).then(friendship => {
                  res.status(200).json(friendship);
                });
              }
            });
          }
        });
      }
    })
    .catch(next);
};

module.exports.userFriends = (req, res, next) => {
  const { id } = req.params;

  Friends.find({ $or: [{ user1: id }, { user2: id }] })
    .populate("user1")
    .populate("user2")
    .then(friends => {
      if (!friends) {
        res.status(404).json({ message: "Friends not found" });
      } else {
        res.status(200).json(friends);
      }
    })
    .catch(next);
};

module.exports.updateFriends = (req, res, next) => {
  const { id } = req.params;
  const { userId, toUpdate } = req.body;

  Friends.findById(id)
    .populate("user1")
    .populate("user2")
    .then(relation => {
      if (!relation) {
        res.status(404).json({ message: "Friend not found" });
      } else {
        const toChange = {
          state1: relation.user1 == userId ? toUpdate : relation.state1,
          state2: relation.user2 == userId ? toUpdate : relation.state2
        };

        Friends.findByIdAndUpdate(id, toChange, { new: true }).then(updated => {
          res.status(201).json(updated);
        });
      }
    })
    .catch(next);
};

module.exports.pending = (req, res, next) => {
  const { id } = req.params;

  Friends.find({ $or: [{ user1: id }, { user2: id }] })
    .populate("user1")
    .populate("user2")
    .then(relations => {
      if (!relations) {
        res.status(404).json({ message: "relations not found" });
      } else {
        const pendings = relations.filter(
          friend => friend.state1 === "Pending" || friend.state2 === "Pending"
        );

        res.status(200).json(pendings);
      }
    })
    .catch(next);
};

module.exports.realFriends = (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);

  Friends.find({ $or: [{ user1: id }, { user2: id }] })
    .populate("user1")
    .populate("user2")
    .then(relations => {
      if (!relations) {
        res.status(404).json({ message: "relations not found" });
      } else {
        const pendings = relations.filter(
          friend => friend.state1 === "Acepted" && friend.state2 === "Acepted"
        );

        res.status(200).json(pendings);
      }
    })
    .catch(next);
};

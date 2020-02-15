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

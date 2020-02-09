const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User.model");
const Friends = require("../Models/Friends.model");

module.exports.createFriends = (req, res, next) => {
  const { user1, user2 } = req.body;

  if (!user1 || !user2) {
    res.status(404).json({ mesage: "user not found" });
  }

  User.findOne({ id: user1 })
    .then(user1 => {
      if (!user1) {
        res.status(404).json({ mesage: "user not found" });
      } else {
        User.findOne({ id: user2 }).then(user2 => {
          if (!user2) {
            res.status(404).json({ mesage: "user not found" });
          } else {
            const friendship = {
              user1,
              user2,
              state1: "Acepted"
            };

            Friends.save(friendship).then(friendship => {
              res.status(200).json(friendship);
            });
          }
        });
      }
    })
    .catch(next);
};

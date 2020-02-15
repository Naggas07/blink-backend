const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User.model");
const Follow = require("../Models/Follow.model");

module.exports.follow = (req, res, next) => {
  const { bussiness, user } = req.body;

  User.findOne({ id: bussiness })
    .then(b => {
      if (!b) {
        res.status(404).json({ message: "Bussiness not found" });
      } else {
        if (b.userType != "Bussiness") {
          res.status(404).json({ message: "Bussiness not found" });
        } else {
          const follow = {
            bussiness,
            userFollow: user
          };

          Follow.create(follow)
            .then(relation => {
              res.status(201).json(relation);
            })
            .catch(next);
        }
      }
    })
    .catch(next);
};

module.exports.unFollow = (req, res, next) => {
  const { bussiness, user } = req.body;

  Follow.findOneAndRemove({ bussiness, userFollow: user })
    .then(relation => {
      if (!relation) {
        res.status(404).json({ message: "Follow not found" });
      } else {
        res.status(201).json({ message: "Follow delete" });
      }
    })
    .catch(next);
};

module.exports.follows = (req, res, next) => {
  const { id } = req.params;

  Follow.find({ userFollow: id })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "No items" });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(next);
};

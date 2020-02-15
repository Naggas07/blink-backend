const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User.model");
const Follow = require("../Models/Follow.model");

module.exports.follow = (req, res, next) => {
  const { business, user } = req.body;

  Follow.findOne({ business, userFollow: user })
    .then(relation => {
      if (relation) {
        res.status(400).json({ message: "Relation already exist" });
      } else {
        User.findById(business).then(b => {
          if (!b) {
            res.status(404).json({ message: "Business not found" });
          } else {
            if (b.userType != "Business") {
              res.status(404).json({ message: "Business not found" });
            } else {
              const follow = {
                business,
                userFollow: user
              };

              Follow.create(follow)
                .then(relation => {
                  res.status(201).json(relation);
                })
                .catch(next);
            }
          }
        });
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

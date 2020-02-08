const createError = require("http-errors");
const mongoose = require("mongoose");

const User = require("../Models/User.model");

module.exports.create = (req, res, next) => {
  const {
    nickName,
    name,
    lastName1,
    lastName2,
    password,
    email,
    userType
  } = req.body;

  const user = {
    nickName,
    name,
    lastName1,
    lastName2,
    email,
    password,
    userType
  };

  User.create(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find().then(users => {
    res.json(users);
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(400).json({ message: "email and password required" });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        return user.comparePassword(password)
        .then(match => {
          if (match) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ message: "User not found" });
          }
        });
      }
    })
    .catch(next);
};

const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../Models/User.model')

module.exports.create = (req, res, next) => {
     const { nickName, name, lastName1, lastName2, password, email, userType } = req.body

     const user = {
         nickName,
         name,
         lastName1,
         lastName2,
         email,
         password, 
         userType
     }

     User.create(user)
     .then(user => {
         res.status(202).json(user)
     }).catch(next)
}

module.exports.getUsers = (req, res, next) => {
    User.find()
    .then(users => {
        res.json(users)
    })
}
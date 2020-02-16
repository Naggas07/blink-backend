const Location = require("../Models/LocationUser.model");

module.exports.new = (req, res, next) => {
  const { id } = req.params;
  const { location } = req.body;

  const newLocation = {
    id
  };
};

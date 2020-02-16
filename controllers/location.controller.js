const Location = require("../Models/LocationUser.model");

module.exports.new = (req, res, next) => {
  const { id } = req.params;
  const { location } = req.body;

  const newLocation = {
    user: id,
    location
  };

  Location.create(newLocation)
    .then(location => {
      res.status(202).json({ message: "Location created" });
    })
    .catch(next);
};

module.exports.getLocations = (req, res, next) => {
  const { id } = req.params;

  Location.findById(id)
    .then(locations => {
      if (!locations) {
        res.status(404).json({ message: "locations not found" });
      } else {
        res.status(200).json(locations);
      }
    })
    .catch(next);
};

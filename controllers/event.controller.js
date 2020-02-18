const Event = require("../Models/Event.model");
const Topics = require("../Models/Topics.models");
const User = require("../Models/User.model");

module.exports.new = (req, res, next) => {
  console.log(Topics.schema.path("name").enumValues);
  console.log(req.body);
  const {
    title,
    location,
    topics,
    business,
    image,
    date,
    limitUsers
  } = req.body;

  if ((!title, !business, !date)) {
    res.status(400).json({ message: "items required" });
  }

  const event = {
    title,
    location,
    topics,
    business,
    image,
    date,
    limitUsers
  };

  Event.create(event)
    .then(event => {
      res.status(202).json(event);
    })
    .catch(next);
};

module.exports.reserve = (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;

  Event.findById(id)
    .then(event => {
      if (!event) {
        res.status(404).json({ message: "Event not found" });
      } else {
        const newUsers = [...event.reserves, user];
        if (event.limitUsers > 0 && event.reserves.length >= event.limitUsers) {
          res.status(400).json({ message: "Event full" });
        } else {
          Event.findByIdAndUpdate(
            id,
            { reserves: newUsers },
            { new: true }
          ).then(updated => {
            res.status(201).json(updated);
          });
        }
      }
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Event.find()
    .populate("comments")
    .then(events => {
      if (!events) {
        res.status(404).json({ message: "Events not found" });
      } else {
        res.status(200).json(events);
      }
    })
    .catch(next);
};

module.exports.unsuscribe = (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;

  Event.findById(id)

    .then(event => {
      if (!event) {
        res.status(404).json({ message: "Event not found" });
      } else {
        console.log(event.reserves[1], user);
        const reserves = event.reserves.filter(data => data != user);
        Event.findByIdAndUpdate(id, { reserves }, { new: true }).then(
          update => {
            res.status(202).json(update);
          }
        );
      }
    })
    .catch(next);
};

module.exports.userEvents = (req, res, next) => {
  const { id } = req.params;

  Event.find({ reserves: { $in: [id] } })
    .then(events => {
      if (!events) {
        res.status(404).json({ message: "Not events founds" });
      } else {
        res.status(200).json(events);
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;

  Event.findById(id)
    .then(event => {
      if (event.business != user) {
        User.findById(user).then(user => {
          if (user.userType === "Admin") {
            Event.findByIdAndDelete(id)
              .then(del => {
                res.status(204).json({ message: "Event delete" });
              })
              .catch(next);
          } else {
            res.status(403).json({ message: "Forbidden" });
          }
        });
      } else {
        Event.findByIdAndDelete(id)
          .then(del => {
            res.status(204).json({ message: "Event delete" });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.eventDetail = (req, res, next) => {
  const { id } = req.params;

  Event.findById(id)
    .populate("comments")
    .then(event => {
      if (!event) {
        res.status(404).json({ message: "Event not found" });
      } else {
        res.status(200).json(event);
      }
    })
    .catch(next);
};

module.exports.getEventsByFilters = (req, res, next) => {
  const { latitude, longitude, distance, maxPrice, minPrice } = req.body;

  let priceMin = !minPrice ? 0 : minPrice;
  let priceMax = !maxPrice ? 1000 : maxPrice;

  if (!latitude || !longitude || !distance) {
    res.status(400).json({ message: "Location is required to this search" });
  } else {
    const query = {
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: distance
        }
      },
      price: { $gte: priceMin, $lte: priceMax }
    };

    Event.find(query)
      .then(events => {
        if (!events) {
          res.status(404).json({ message: "Events not found in this area" });
        } else {
          res.status(200).json(events);
        }
      })
      .catch(next);
  }
};

module.exports.getEventUsers = (req, res, next) => {
  const { id } = req.params;

  Event.findById(id)
    .populate(reserves)
    .then(event => {
      if (!event) {
        res.status(404).json({ message: "Event not found" });
      } else {
        res.status(200).json(event.reserves);
      }
    })
    .catch(next);
};

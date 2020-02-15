const createError = require("http-errors");

module.exports.isAdmin = (req, _, next) => {
  if (req.session.user.userType === "Admin") {
    next();
  } else {
    next(createError(403));
  }
};

module.exports.isBussines = (req, _, next) => {
  if (
    req.session.user.userType === "Admin" ||
    req.session.userType === "Bussines"
  ) {
    next();
  } else {
    next(createError(403));
  }
};

module.exports.isUser = (req, _, next) => {
  if (
    req.session.user.userType === "Admin" ||
    req.session.userType === "User"
  ) {
    next();
  } else {
    next(createError(403));
  }
};

module.exports.isNotBussines = (req, _, next) => {
  if (req.session.user.userType != "Bussines") {
    next();
  } else {
    next(createError(403));
  }
};

module.exports.isNotUser = (req, _, next) => {
  if (req.session.user.userType != "User") {
    next();
  } else {
    next(createError(403));
  }
};

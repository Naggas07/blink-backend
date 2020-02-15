const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const SALTFACTOR = 11;

const PASSWORD_PATTERN =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$";
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema(
  {
    nickName: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    name: {
      type: String,
      required: true,
      minlength: [3, "El usuario debe tener al menos 3 caracteres"],
      uppercase: true
    },
    lastName1: {
      type: String,
      required: true,
      minlength: [3, "El apellido debe tener al menos 3 caracteres"],
      uppercase: true
    },
    lastName2: {
      type: String,
      uppercase: true,
      default: null
    },
    password: {
      type: String,
      required: true
      // match: [PASSWORD_PATTERN, 'La contraseña debe tener al menos 10 caracteres, mayúsculas, minusculas y un caracter especial']
    },
    email: {
      type: String,
      required: true,
      match: [EMAIL_PATTERN, "El email debe tener un formato válido"]
    },
    userType: {
      type: String,
      required: true,
      enum: ["User", "Business", "Admin"]
    },
    rangeLocation: {
      type: Number,
      default: null
    },
    avatar: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc.id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      }
    }
  }
);

userSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt
      .genSalt(SALTFACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt).then(hash => {
          user.password = hash;
          next();
        });
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("Friends", {
  ref: "Friends",
  localField: "_id",
  foreignField: "friends",
  justOne: false
});

userSchema.virtual("LocationUser", {
  ref: "LocationUser",
  localField: "_id",
  foreignField: "locations",
  justOne: false
});

const User = mongoose.model("User", userSchema);

module.exports = User;

let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    category: {
      type: String,
    },
    technology: {
      type: Array,
    },
    profilePic: {
      type: String,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);

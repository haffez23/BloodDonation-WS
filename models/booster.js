const mongoose = require("mongoose");

const Booster = mongoose.model(
  "Booster",
  new mongoose.Schema({
    id_user: String,
    firstName: String,
    lastName: String,
    username: String,
    status: String,
    createdAt: String,
    deletedAt: Number,
    birthdate: String,
    adresse: String,
    solde: String
  })
);

module.exports = Booster;

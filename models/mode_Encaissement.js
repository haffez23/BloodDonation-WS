const mongoose = require("mongoose");

const ModeEncaissement = mongoose.model(
  "ModeEncaissement",
  new mongoose.Schema({
    id_modeEncaissement: String,
    type: String,
  })
);

module.exports = ModeEncaissement;

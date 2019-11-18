const mongoose = require("mongoose");

const Commission = mongoose.model(
  "Commission",
  new mongoose.Schema({
    id_commission: String,
    type: String,
    status: String,
  })
);

module.exports = Commission;

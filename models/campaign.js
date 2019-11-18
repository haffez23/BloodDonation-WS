const mongoose = require("mongoose");

const Campaign = mongoose.model(
  "Campaign",
  new mongoose.Schema({
    id_campaign: String,
    name: String,
    status: String,
    account: String,
    type: Number,
    createdAt: String,
    deletedAt: String,
    default: String,
    order: String,
    commission: String
  })
);

module.exports = Campaign;

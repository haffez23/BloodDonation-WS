
const mongoose = require("mongoose");

const Banner = mongoose.model(
  "Banner",
  new mongoose.Schema({
    id_banner: String,
    name: String,
    type: String,
    description: String,
    url_cible: String,
    order: String,
    price: Number,
    pics: String,
    promo_description: String
  })
);

module.exports = Banner;

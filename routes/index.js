/**
 * Main Routes
 * routes/index.js
 * @description::  papRoutes requests will need to call Pap Services 
 *  
 */

const papRoutes = require('./pap/')
const boostinyRoutes = require('./boostiny/')
module.exports = function(app){
    app.use('/pap',papRoutes);
    app.use('/boostiny',boostinyRoutes);
} ;
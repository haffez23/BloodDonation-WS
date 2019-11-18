let userRouter = require('express').Router();
// Import User controller
var bannerController = require('../../controllers/banner');
// User routes
userRouter.route('/')
    .get(bannerController.getBanners)
module.exports =  userRouter;

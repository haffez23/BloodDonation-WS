let userRouter = require('express').Router();
// Import User controller
var userController = require('../../controllers/user');
// User routes
userRouter.route('/login')
    .get(userController.signin)
userRouter.route('/banner')
    .get(userController.banners)
module.exports =  userRouter;

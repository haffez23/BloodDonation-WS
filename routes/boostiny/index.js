/**
 * @description:: All routes with /boostiny come here
 */

const router = require('express').Router();
const user = require('./user');

router.use('/user',user);

module.exports = router;
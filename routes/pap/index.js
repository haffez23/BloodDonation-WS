/**
 * @description:: All routes with /pap come here
 */

const router = require('express').Router();
const user = require('./user');
const banner = require('./banner');

router.use('/user',user);
router.use('/banner',banner);

module.exports = router;
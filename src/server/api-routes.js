const express = require('express');
const { postAnalyse, getTest } = require('./api-routes-controller');

const router = express.Router();

router.route('/analyse').post(postAnalyse);
router.route('/test').get(getTest);

module.exports = router;

var express = require('express');
var router = express.Router();
const client = require('../models/client');


/* GET users listing. */
router.get('/', function(req, res, next) {
  let url = "/link.html?token="+req.query.token;
  res.redirect(url);
});

module.exports = router;

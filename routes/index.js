var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.role);
  if (req.session.role !== undefined) {
    switch(req.session.role) {
      case "admin":
        res.redirect('/admin');
        break;
      case "agent":
        res.redirect('/agent.html');
        break;
      case "client":
        res.redirect('/client');
        break;
      case "webmaster":
        res.redirect('/webmaster');
        break;
      default:
        res.redirect('/');
    }
  } else res.redirect('/');

});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var role =  req.session.role;
  console.log(role);
  if(role !== "admin"){
    res.redirect("/");
    return;
  }
  res.redirect("/admin.html");
});

module.exports = router;

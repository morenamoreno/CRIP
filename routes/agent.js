var express = require('express');
var router = express.Router();
const db = require('../models/agent');

/* GET users listing. */
router.get('/', function(req, res, next) {
  async function sendPictures(req, res) {
    try {
      var role =  req.session.role;
      console.log("At agent router");
      console.log(role);
      if(role !== "agent"){
        res.redirect("/");
        return;
      }
      res.redirect("/agent.html");
    } catch (e) {
      error(res, e);
    }
  }
});
/*router.get('/', function(req, res, next) {
  async function sendPictures(req, res) {
    try {
      const clients = await db.getClients(2);
      res.json(clients);
    } catch (e) {
      error(res, e);
    }
  }
});*/



module.exports = router;

const express = require('express');
const path = require('path');
const router = express.Router();
const admin = require('../models/admin');
const agent = require('../models/agent');
const client = require('../models/client');
const link = require('../models/link');
const webmaster = require('../models/webmaster');
const user = require('../models/user');

//Shared user services
router.post('/sessions', function(req, res, next) {
 // console.log(req.body);
  let result;
  (async () =>  {
    try {
      let message = '';
      let sess = req.session;

        let post  = req.body;
        let name= post.user_name;
        let pass= post.password;

        result = await user.login(name, pass);

        if (result !== undefined) {
          console.log("Authenticated OK");
          //res.sendFile('admin.html', { root: path.join(__dirname, '../public') });
          req.session.userId = result.id;
          req.session.user = result.username;
          req.session.role = result.role;
          switch(result.role) {
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

        } else {
          //res.send('Wrong credentials');
          res.sendFile('index.html', { root: path.join(__dirname, '../public') });
        }

    } catch (e) {
      console.log(e);
    }
  })();
});


//Company Administrator
router.get('/admin', function(req, res, next) {
  //console.log("admin request received");
  (async () =>  {
    try {
      var role =  req.session.role;
      console.log(role);
      if(role !== "admin"){
        res.redirect("/index.html");
        return;
      }
      const agents = await admin.getAgents(1);
      res.json(agents);
    } catch (e) {
      error(res, e);
    }
  })();
});

//Insurance Agent
router.get('/agent', function(req, res, next) {
  console.log(req.session.role);
  (async () =>  {
    try {
      var role =  req.session.role;
      console.log(role);
      if(role !== "agent"){
        res.redirect("/index.html");
        return;
      }
      const clients = await agent.getClients(req.session.userId);
      res.json(clients);
    } catch (e) {
      error(res, e);
    }
  })();
});

router.post('/agent', function(req, res, next) {
  console.log(req.body.oldID + " " + req.body.newID);
  (async () =>  {
    try {
      var role =  req.session.role;
      console.log(role);
      if(role !== "admin"){
        res.redirect("/index.html");
        return;
      }
      await agent.transferAgent(req.body.oldID,req.body.newID);
    } catch (e) {
      error(res, e);
    }
  })();
});


//Insurance Client
router.post('/clients', function(req, res, next) {
  console.log(req.body);
  console.log("Add client request received");
  (async () =>  {
    try {
/*      var role =  req.session.role;
      console.log(role);
      if(role !== "client"){
        res.redirect("/index2.html");
        return;
      }*/
      await client.addClient(req.body.username, req.body.password, req.body.email, req.body.role, req.body.metarole) ;
    } catch (e) {
      console.log(e);
    }
  })();
});


//Policies
router.get('/policies', function(req, res, next) {
  console.log("get policies request received from: "+req.session.userId);
  (async () =>  {
    try {
      const policies = await client.getPolicies(req.session.userId);
  /*    if (req.session.role == "agent") {
        const policies = await client.getPolicies(req.params.id);
      } else {
        const policies = await client.getPolicies(req.session.userID);
      }*/
      res.json(policies);
    } catch (e) {
      error(res, e);
    }
  })();
});

router.get('/policies/:id', function(req, res, next) {
  console.log("get policy request received");
  (async () =>  {
    try {
      console.log(req.params.id);
      const policies = await client.getPolicies(req.params.id);
      res.json(policies);
    } catch (e) {
      error(res, e);
    }
  })();
});

router.post('/policies', function(req, res, next) {
  console.log("Add policy - Client_ID: " + req.body.client + " Desc: " + req.body.name + " Type: " + req.body.type + " Valid: " + req.body.valid);
  (async () =>  {
    try {
      //client, name, type, valid
      await client.addPolicy(req.body.client, req.body.name, req.body.type, req.body.valid) ;
    } catch (e) {
      error(res, e);
    }
  })();
});

router.delete('/policies', function(req, res, next) {
  console.log("Delete policy - ID: " + req.body.policyID);
  (async () =>  {
    try {
      //client, name, type, valid
      client.deletePolicy(req.body.policyID) ;
    } catch (e) {
      error(res, e);
    }
  })();
});


//Policy Beneficiary
router.get('/link/:id', function(req, res, next) {
  console.log("link request received: "+req.params.id);
  (async () =>  {
    try {
      let [valid] = await client.validateToken(req.params.id);
      //console.log(valid.client);
      if (valid === undefined) {
        res.redirect("/invalidLink.html");
      }
      const policies = await client.getPolicies(valid.client);
      console.log(policies);
      res.json(policies);
    } catch (e) {
      console.log("Invalid token");
    }
  })();
});


//Webmaster
router.get('/disclosures', function(req, res, next) {
  console.log("webmaster get request received");
  (async () =>  {
    try {
      const policies = await client.getDisclosures();
      /*    if (req.session.role == "agent") {
            const policies = await client.getPolicies(req.params.id);
          } else {
            const policies = await client.getPolicies(req.session.userID);
          }*/
      res.json(policies);
    } catch (e) {
      error(res, e);
    }
  })();
});

router.post('/disclosures', function(req, res, next) {
  console.log("webmaster post request received");
  (async () =>  {
    try {
      //client, name, type, valid
      await client.addDisclosure(req.body.client, req.body.email, req.body.token, req.body.valid) ;
    } catch (e) {
      error(res, e);
    }
  })();
});


module.exports = router;

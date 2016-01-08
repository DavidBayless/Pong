var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
var account = require('../local_modules/account');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next) {
  //temporary user for testing without user sessions
  var user = {
    id: 1,
    username: 'User1',
    first_name: 'John',
    last_name: 'Smith'
  };
  res.render('profile', {
    title: 'Pong',
    user: user.username + "'s Profile",
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name
  });
});

router.post('/profile', function(req, res, next) {
  var userSubmission = req.body;
  //temporary user for testing without user sessions
  var user = {
    id: 1,
    username: 'User1',
    first_name: 'John',
    last_name: 'Smith'
  };
  account.getMatchingUsernames(userSubmission, knex)
  .then(function(matchingUsers) {
    if (account.validUsername(userSubmission, user, matchingUsers)) {
      if(account.update(user, userSubmission, knex)) {
        res.render('profile', {
          message: 'it worked',
          title: 'Pong',
          user: user.username + "'s Profile",
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name
        });
      } else {
        res.render('profile', {
          message: 'Invalid First or Last Name',
          title: 'Pong',
          user: user.username + "'s Profile",
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name
        });
      }
    } else {
      res.render('profile', {
        message: userSubmission.username+' is not available',
        title: 'Pong',
        user: user.username + "'s Profile",
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name
      });
    }
  });
});

router.get('/signup', function(req, res, next) {
  res.render('newUser');
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  var passerr = '';
  var passGo = false;
  var usernameerr = '';
  var usernameGo = false;
  var firstnameerr = '';
  var firstnameGo = false;
  var lastnameerr = '';
  var lastnameGo = false;
  if(req.body.firstname && req.body.lastname && req.body.username && req.body.email && req.body.password && req.body.passwordTwo) {
    if (req.body.password === req.body.passwordTwo) {
      passGo = true;
    } else {
      passerr = 'Passwords do not match';
    }

    console.log(req.body.username.length);
    if (req.body.username.length > 3 && req.body.username.length < 25) {
      usernameGo = true;
    } else if (req.body.username.length > 25) {
      usernameerr = 'Username is too long';
    } else if (req.body.username.length <= 3) {
      usernameerr = 'Username is too short';
    }

    if (account.validName(req.body.firstname)) {
      firstnameGo = true;
    } else if (req.body.firstname.length > 17){
      firstnameerr = 'First name is too long';
    } else if (/[\*,&^%$#@!)(-+\s|}{\\`~/?><.';:"0-9]/g.test(req.body.firstname)) {
      firstnameerr = 'Name can only be letters';
    }

    if (account.validName(req.body.lastname)) {
      lastnameGo = true;
    } else if (req.body.lastname.length > 17){
      lastnameerr = 'Last name is too long';
    } else if (/[\*,&^%$#@!)(-+\s|}{\\`~/?><.';:"0-9]/g.test(req.body.lastname)) {
      lastnameerr = 'Name can only be letters';
    }

    if (passGo && usernameGo && firstnameGo && lastnameGo) {
      res.redirect('profile');
    } else {
      res.render('newUser', {firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, email: req.body.email, passerr: passerr, usernameerr: usernameerr, firstnameerr: firstnameerr, lastnameerr: lastnameerr});
    }
  } else {
    res.render('newUser', {firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, email: req.body.email});
  }
});

module.exports = router;

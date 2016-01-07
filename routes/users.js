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
  //account.update(user, userSubmission, knex, account.uniqueUsername);
  //account.uniqueUsername(req, res, user, userSubmission, knex, account.update);
});

module.exports = router;

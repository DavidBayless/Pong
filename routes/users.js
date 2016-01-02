var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
var account = require('../local_modules/account');

var unique;
function uniqueUsername(username) {
  knex('preferences').where('username', username).then(function(info) {
    if (info.length === 0) {
      unique = 2;
    } else {
      unique = 1;
    }
  }).catch(function(error) {
    console.log(error);
  });
}

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
  uniqueUsername(userSubmission.username);
  setTimeout(function() {
    account.update(user, userSubmission, unique, knex);
  }, 1000);
  res.render('profile', {
    title: 'Pong',
    user: user.username + "'s Profile",
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name
  });
});

module.exports = router;

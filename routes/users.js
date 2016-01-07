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
  req.flash('info');
  account.uniqueUsername(req, res, user, userSubmission, knex, account.update);
  // res.render('profile', {
  //   title: 'Pong',
  //   user: user.username + "'s Profile",
  //   username: user.username,
  //   firstName: user.first_name,
  //   lastName: user.last_name
  // });
});

router.get('/signup', function(req, res, next) {
  res.render('newUser');
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  var passerr = '';
  if(req.body.firstname && req.body.lastname && req.body.username && req.body.email && req.body.password && req.body.passwordTwo) {
    if (req.body.password === req.body.passwordTwo) {
      res.redirect('/users/profile');
    } else {
      passerr = 'Passwords do not match';
    }
    if (account.validUsername(req.body.username))
  } else {
    res.render('newUser', {firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, email: req.body.email});
  }
});

module.exports = router;

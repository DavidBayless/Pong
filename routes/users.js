var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
var account = require('../local_modules/account');

/* GET users listing. */
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
    user: user.username+"'s Profile",
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

  account.update(res, user, userSubmission, knex);
  res.render('profile', {
    title: 'Pong',
    user: user.username+"'s Profile",
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name
  });
});

module.exports = router;

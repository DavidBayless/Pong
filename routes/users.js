var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next) {
  var user = 'Tommy';
  var firstName = 'Thomas';
  var lastName = 'Smith';
  res.render('profile', {
    title: 'Pong',
    user: user+"'s Profile",
    username: user,
    firstName: firstName,
    lastName: lastName
  });
});

module.exports = router;

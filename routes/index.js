var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Pong'});
});

// router.get('/flash', function(req, res, next) {
//   res.render('flash', {title: 'Pong'});
// });
//
// router.post('/flash', function(req, res, next) {
//   var userSubmission = req.body;
//   if (!userSubmission.password) {
//     req.flash('info', 'Please enter a password');
//   } else if (userSubmission.password.length < 7) {
//     req.flash('info', 'Passwords must be 8 or more characters long');
//   } else {
//     req.flash('info', 'Valid password');
//   }
//   res.render('flash', {
//     title: 'Pong',
//     message: req.flash('info')
//   });
// });

module.exports = router;

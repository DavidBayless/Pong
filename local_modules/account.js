var account = {
  update: function(req, res, user, submission, uniqueUsername, knex) {
    if (uniqueUsername === 2) {
      if (account.validUsername(req, res, user, submission.username) &&
        account.validName(req, res, user, submission.first_name) &&
        account.validName(req, res, user, submission.last_name)
      ) {
        if (submission.username) {
          knex('preferences').where({
            id: user.id
          }).update({
            username: submission.username
          }).then(function() {}).catch(function(error) {
            console.log(error);
          });
        }
        if (submission.first_name) {
          knex('preferences').where({
            id: user.id
          }).update({
            first_name: submission.first_name
          }).then(function() {}).catch(function(error) {
            console.log(error);
          });
        }
        if (submission.last_name) {
          knex('preferences').where({
            id: user.id
          }).update({
            last_name: submission.last_name
          }).then(function() {}).catch(function(error) {
            console.log(error);
          });
        }
        req.flash('info', 'Your Profile has Been Updated');
        res.render('profile', {
          message: req.flash('info'),
          title: 'Pong',
          user: user.username + "'s Profile",
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name
        });
      }
    } else if (uniqueUsername === 1) {
      req.flash('info', 'The Username '+submission.username+' is Taken');
      res.render('profile', {
        message: req.flash('info'),
        title: 'Pong',
        user: user.username + "'s Profile",
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name
      });
    } else {
      console.log('error');
    }
  },
  validName: function(req, res, user, name) {
    if (name.length < 17) {
      //checks if the name is only letters
      if (/^[a-zA-Z]+$/.test(name)) {
        console.log('valid name');
        return true;
      } else {
        console.log('names must contain only letters');
        req.flash('info', 'Names must contain only letters');
        res.render('profile', {
          message: req.flash('info'),
          title: 'Pong',
          user: user.username + "'s Profile",
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name
        });
      }
    } else {
      console.log('name is too long');
      req.flash('info', 'First or Last Name is too long');
      res.render('profile', {
        message: req.flash('info'),
        title: 'Pong',
        user: user.username + "'s Profile",
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name
      });
    }
  },
  validUsername: function(req, res, user, username) {
    if (username.length < 25 && username.length > 3) {
      return true;
    } else {
      req.flash('info', 'Invalid Username');
      res.render('profile', {
        message: req.flash('info'),
        title: 'Pong',
        user: user.username + "'s Profile",
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name
      });
    }
  },
  uniqueUsername: function(req, res, user, submission, knex, callback) {
    var unique;
    knex('preferences').where('username', submission.username).then(function(info) {
      if (info.length === 0) {
        unique = 2;
      } else {
        unique = 1;
      }
      callback(req, res, user, submission, unique, knex);
    }).catch(function(error) {
      console.log(error);
    });
  }
};

module.exports = account;

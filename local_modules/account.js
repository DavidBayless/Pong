var account = {
  update: function(user, submission, uniqueUsername, knex) {
    if (uniqueUsername === 2) {
      if (account.validUsername(submission.username) &&
        account.validName(submission.first_name) &&
        account.validName(submission.last_name)
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
      }
    } else if (uniqueUsername === 1) {
      console.log('username is not available');
    } else {
      console.log('error');
    }
  },
  validName: function(name) {
    if (name.length < 17) {
      console.log('valid name');
      return true;
    } else {
      console.log('name is too long');
    }
  },
  validUsername: function(username) {
    if (username && username.length < 25 && username.length > 3) {
      return true;
    }
  }
};

module.exports = account;

var account = {
  update: function(user, submission, knex) {
    if (account.validName(submission.first_name) &&
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
      return true;
    }
  },
  validName: function(name) {
    if (name.length < 17) {
      //checks if the name is only letters
      if (/^[a-zA-Z]+$/.test(name)) {
        return true;
      }
    }
  },
  validUsername: function(submission, user, matches) {
    if (!matches.length) {
      if (submission.username.length < 25 && submission.username.length > 3) {
        return true;
      }
    }
  },
  getMatchingUsernames: function(submission, knex) {
    return knex('preferences').where('username', submission.username);
  }
};

module.exports = account;

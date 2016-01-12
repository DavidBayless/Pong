var account = {
  update: function(user, submission, matches, knex) {
    return new Promise(function(resolve, reject){
      if(account.validUsername(submission, matches)) {
        console.log('validUsername');
        if(account.validName(submission.first_name)) {
          if(account.validName(submission.last_name)) {
            var updateUsername = function() {
              return knex('preferences').where({
                id: user.id
              }).update({
                username: submission.username
              });
            };
            var updateFirstName = function() {
              return knex('preferences').where({
                id: user.id
              }).update({
                first_name: submission.first_name
              });
            };
            var updateLastName = function() {
              return knex('preferences').where({
                id: user.id
              }).update({
                last_name: submission.last_name
              });
            };
            Promise.all([
              updateUsername(),
              updateFirstName(),
              updateLastName()
            ]).then(function(info){
              resolve(info);
            });
          } else {
            reject('Invalid Last Name');
          }
        } else {
          reject('Invalid First Name');
        }
      } else {
        reject('Invalid Username');
      }
    });
  },

    //   if (account.validName(submission.first_name) &&
    //     account.validName(submission.last_name) &&
    //     account.validUsername(userSubmission, user, matchingUsers)
    //   ) {
    //     var updateUsername = function() {
    //       return knex('preferences').where({
    //         id: user.id
    //       }).update({
    //         username: submission.username
    //       });
    //     };
    //     var updateFirstName = function() {
    //       return knex('preferences').where({
    //         id: user.id
    //       }).update({
    //         first_name: submission.first_name
    //       });
    //     };
    //     var updateLastName = function() {
    //       return knex('preferences').where({
    //         id: user.id
    //       }).update({
    //         last_name: submission.last_name
    //       });
    //     };
    //     Promise.all([
    //       updateUsername(),
    //       updateFirstName(),
    //       updateLastName()
    //     ]).then(function(info){
    //       resolve(info);
    //     });
    //   } else {
    //     reject('error');
    //   }
    // });
  validName: function(name) {
    if (name.length < 17) {
      //checks if the name is only letters
      if (/^[a-zA-Z]+$/.test(name)) {
        return true;
      }
    }
  },
  validUsername: function(submission, matches) {
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

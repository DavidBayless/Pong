var account = {
  update: function (res, user, submission, knex) {
    if (submission.username) {
      knex('preferences').where({id: user.id}).update({
        username: submission.username
      }).then(function () {
        console.log('success');
      }).catch(function (error) {
        console.log(error);
      });
    }
    if (submission.first_name) {
      knex('preferences').where({id: user.id}).update({
        first_name: submission.first_name
      }).then(function () {
        console.log('success');
      }).catch(function (error) {
        console.log(error);
      });
    }
    if (submission.last_name) {
      knex('preferences').where({id: user.id}).update({
        last_name: submission.last_name
      }).then(function () {
        console.log('success');
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
};

module.exports = account;

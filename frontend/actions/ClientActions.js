var ApiUtil = require('../util/apiUtil.js');

var ClientActions = {
  createUser: ApiUtil.createUser,
  createSession: ApiUtil.createSession
};

module.exports = ClientActions;

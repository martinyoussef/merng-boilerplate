const returnsResolvers = require('./returns');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...returnsResolvers.Query
  }
};
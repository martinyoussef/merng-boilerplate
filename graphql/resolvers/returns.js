const Return = require('../../models/Return');

module.exports = {
    Query: {
        async getReturns() {
            try {
              const returns = await Return.find();
              return returns;
            } catch (err) {
              throw new Error(err);
            }
          }
    }
}
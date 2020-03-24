const { model, Schema } = require('mongoose');

const ReturnSchema = new Schema({
  taxFileNumber: String,
  user: String,
  createdAt: String,
  income: [
    {
      type: String,
      amount: String,
      createdAt: String
    }
  ],
  expenses: [
    {
      type: String,
      amount: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Return', ReturnSchema);
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  timestamps: {
    createdOn: {
      type: Date,
      required: true,
      default: Date.now
    },
    modifiedOn: {
      type: Date,
      required: true,
      default: Date.now
    },
    completedOn: {
      type: Date,
      default: null
    }
  }
});

module.exports = mongoose.model('Todo', todoSchema);

const mongoose = require('../connection');

const CheerupSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  likedBy: [
    {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: false
    }
  ],
  createdBy: [
    {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: false
    }
  ]
});

const Cheerup = mongoose.model('Cheerup', CheerupSchema);

module.exports = Cheerup;

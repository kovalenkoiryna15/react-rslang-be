const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const StatisticsSchema = new Schema({
  _id: false,
  day: String,
  learnedWords: Number
});

const StatisticSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    learnedWords: {
      type: Number
    },
    statistics: [StatisticsSchema],
    optional: {
      type: Object,
      required: false
    }
  },
  { collection: 'statistic' }
);

addMethods(StatisticSchema);

module.exports = mongoose.model('Statistic', StatisticSchema);

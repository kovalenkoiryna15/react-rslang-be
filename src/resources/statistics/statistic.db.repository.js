const Statistics = require('./statistic.model');

const get = async userId => {
  let statistic = await Statistics.findOne({ userId });
  if (!statistic) {
    statistic = {
      learnedWords: 0,
      optional: {}
    };
    statistic = await upsert(userId, { ...statistic, userId });
  }
  return statistic;
};

const upsert = async (userId, statistic) =>
  Statistics.findOneAndUpdate(
    { userId },
    { $set: statistic },
    { upsert: true, new: true }
  );

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove };

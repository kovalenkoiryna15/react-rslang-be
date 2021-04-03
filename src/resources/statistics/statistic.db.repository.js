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

const upsertDailyStatistic = async userId => {
  const statistics = await Statistics.findOneAndUpdate(
    { userId },
    {
      $inc: {
        learnedWords: 1
      }
    },
    { upsert: true, new: true }
  );
  return statistics;
};

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove, upsertDailyStatistic };

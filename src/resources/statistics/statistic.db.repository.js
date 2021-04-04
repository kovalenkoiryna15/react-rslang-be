const Statistics = require('./statistic.model');

const get = async userId => {
  let statistic = await Statistics.findOne({ userId });
  if (!statistic) {
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

const upsertDailyStatistic = async (userId, statistic) => {
  const query = { _id: userId, 'statistics.day': statistic.optional.day };
  const result = await Statistics.exists(query);
  if (!result) {
    return Statistics.findByIdAndUpdate(
      userId,
      {
        $push: {
          statistics: {
            day: statistic.optional.day,
            learnedWords: statistic.optional.learnedWords
          }
        }
      },
      { upsert: true, new: true }
    );
  }
  return Statistics.findOneAndUpdate(
    query,
    {
      $set: {
        'statistics.$.day': statistic.optional.day,
        'statistics.$.learnedWords': statistic.optional.learnedWords
      }
    },
    { upsert: true, new: true }
  );
};

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove, upsertDailyStatistic };

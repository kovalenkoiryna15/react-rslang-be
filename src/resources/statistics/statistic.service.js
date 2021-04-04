const statisticRepo = require('./statistic.db.repository');

const get = async userId => statisticRepo.get(userId);

const upsertDailyStatistic = async (userId, statistic) =>
  statisticRepo.upsertDailyStatistic(userId, { ...statistic, userId });

const remove = async userId => statisticRepo.remove(userId);

module.exports = { get, upsertDailyStatistic, remove };

const configs = require('../config')
const Redis = require('ioredis')
const debug = require('debug')('ketchup-server-scaffold[redis]')
const logger = require('../plugins/logger')

const NONE_CACHED_SECOND = 90

function createRedisConnect(redisConfig) {
  const redis = new Redis(redisConfig)

  redis.on('connect', () => {
    logger.info(`connect to redis(${redisConfig.host}) success`)
  })

  redis.on('error', err => {
    logger.error(`connect to redis(${redisConfig.host}) failure, reason: ${err.toString()}`)
  })

  return redis
}

const redis = createRedisConnect(configs.redis)

module.exports = {
  createRedisConnect,
  redis,
  redisLoad: async ({
    asyncFn,
    rKey,
    exKey,
    exParam,
    isRebuild = false,
  }) => {
    debug('redis load:', rKey, exKey, exParam)

    let result
    if (!isRebuild) {
      result = await redis.get(rKey)
      if (result) {
        result = JSON.parse(result)
        debug('redis load: redis hit', result)
        return result
      }
      debug('redis load: redis miss')
    }

    result = await asyncFn()
    let rValue = JSON.stringify(result)
    if (!result) {
      await redis.setex(rKey, NONE_CACHED_SECOND, rValue)
      return result
    }

    if (exKey) {
      await redis.set(rKey, rValue, exKey, exParam)
    } else {
      await redis.set(rKey, rValue)
    }
    return result
  },
}

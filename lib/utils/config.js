module.exports = {
  loadMysqlConfigFromEnv: (envConfig) => {
    const CONFIG_FIELDS = {
      MYSQL_HOST: 'host',
      MYSQL_PORT: 'port',
      MYSQL_USER: 'user',
      MYSQL_PASSWORD: 'password',
      MYSQL_DATABASE: 'database',
      MYSQL_CHARSET: 'charset',
    }
    const OPTIONS_FIELDS = ['MYSQL_PORT', 'MYSQL_PASSWORD', 'MYSQL_CHARSET']

    const dbConfig = {}
    for (let item in CONFIG_FIELDS) {
      const key = CONFIG_FIELDS[item]
      if (!envConfig[item] && !OPTIONS_FIELDS.includes(item)) {
        return null
      }

      if (envConfig[item]) {
        dbConfig[key] = envConfig[item]
      }
    }
    return dbConfig
  },
}

const fs = require('fs')
const path = require('path')

const loadJsonConfig = (configPath) => {
  if (!fs.existsSync(configPath)) {
    return {}
  }
  var content = fs.readFileSync(configPath, 'utf8')
  try {
    return JSON.parse(content)
  } catch (err) {
    return {}
  }
}

// 检查config目录下的环境配置json文件
const loadEnvConfig = (basePath) => {
  const subList = fs.readdirSync(basePath)

  const envConfig = {}
  for (let file of subList) {
    const currentPath = path.join(basePath, file)
    const fileStat = fs.statSync(currentPath)
    if (fileStat.isDirectory() || !file.endsWith('.json')) {
      continue
    }

    const envName = file.split('.')[0]
    envConfig[envName] = loadJsonConfig(currentPath)
  }
  return envConfig
}

module.exports = {
  loadEnvConfig,
  loadJsonConfig,
}

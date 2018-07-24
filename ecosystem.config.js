module.exports = {
  apps : [
    {
      //general
      name      : 'bookmark',
      script    : 'server.js', //启动执行的初始脚本

      //advanced
      watch     : ['appsback','routes','ecosystem.config.js','server.js'],//监听文件变化
      ignore_watch: ['node_modules','apps','static'],//忽略监听的文件夹
      max_memory_restart: '500M',//内存达到多少会自动restart
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      },

      //log file
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',//日志格式

      //control
      min_uptime: 3000,
      listen_timeout: 3000,
      kill_timeout: 5000,
      max_restarts: 5,
    }
  ]
};

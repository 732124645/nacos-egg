"use strict";

/**
 * egg-nacos-egg default config
 * @member Config#nacosEgg
 * @property {String} SOME_KEY - some description
 */
exports.nacos = {
  register: {
    serverList: "127.0.0.1:8848", // Nacos 配置中心服务器地址
  },
  config: {
    dataId: "test",
    serverAddr: "127.0.0.1:8848",
    group: "DEFAULT_GROUP",
    namespace: "数据ID", // 配置的数据ID
  },
};

const os = require("os");
const { NacosConfigClient, NacosNamingClient } = require("nacos");
const logger = console;

function getLocalIPAddress() {
  const ifaces = os.networkInterfaces();
  let localIP = "";

  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if (iface.family === "IPv4" && !iface.internal) {
        localIP = iface.address;
      }
    });
  });

  return localIP;
}
class NacosConfigLoader {
  constructor(app) {
    this.app = app;
  }

  async loadRegister() {
    const nacosRegisterConfig = this.app.config.nacos.register;

    const client = new NacosNamingClient({
      logger,
      serverList: nacosRegisterConfig.serverList, // Nacos 配置中心服务器地址
      namespace: nacosRegisterConfig.namespace, // 配置的数据ID
    });

    try {
      const serviceName = nacosRegisterConfig.serviceName; // Assuming you have a serviceName in the config
      const instance = {
        ip: getLocalIPAddress(),
        port: this.app.config.cluster.listen.port,
      };

      await client.registerInstance(serviceName || "serviceName", instance);
      console.log("服务注册成功");
    } catch (error) {
      console.error("服务注册失败：", error);
    }
  }

  async loadConfig() {
    const nacosConfig = this.app.config.nacos.config;
    let count = 0;

    try {
      const configClient = new NacosConfigClient({
        serverAddr: nacosConfig.serverAddr,
        namespace: nacosConfig.namespace,
        refreshInterval: 5000,
      });

      // 启用配置监听
      configClient.subscribe(
        {
          dataId: nacosConfig.dataId,
          group: nacosConfig.group,
        },
        (content) => {
          // 处理配置变更，例如更新应用程序配置
          const updatedConfigData = JSON.parse(content);
          Object.assign(this.app.config, updatedConfigData);

          if (count === 0) {
            console.log("配置已成功加载：", updatedConfigData);
            console.log("配置监听已启动");
          } else {
            console.log("配置已修改：", updatedConfigData);
          }
          count++;
        }
      );
    } catch (error) {
      console.error("从 Nacos 获取配置时出错：", error);
    }
  }
}

module.exports = (app) => {
  const nacosConfigLoader = new NacosConfigLoader(app);

  app.beforeStart(async () => {
    await nacosConfigLoader.loadRegister(); // 注册服务
    await nacosConfigLoader.loadConfig(); // 加载配置
  });
};

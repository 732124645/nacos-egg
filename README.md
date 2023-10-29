# nacos-egg

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/nacos-egg.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nacos-egg
[travis-image]: https://img.shields.io/travis/eggjs/nacos-egg.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/nacos-egg
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/nacos-egg.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/nacos-egg?branch=master
[david-image]: https://img.shields.io/david/eggjs/nacos-egg.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/nacos-egg
[snyk-image]: https://snyk.io/test/npm/nacos-egg/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/nacos-egg
[download-image]: https://img.shields.io/npm/dm/nacos-egg.svg?style=flat-square
[download-url]: https://npmjs.org/package/nacos-egg

<!--
Description here.
-->

## Install

```bash
$ npm i nacos-egg --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.nacos = {
  enable: true,
  package: 'nacos-egg',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
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
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->
在应用中，你可以直接访问 app.config 来获取 NacosConfig 加载的配置。例如：

```js
// {app_root}/config/plugin.js
// 从 NacosConfig 获取配置示例
const configValue = app.config.yourConfigKey; // 替换 yourConfigKey 为你的配置键名
console.log('配置值：', configValue);

```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

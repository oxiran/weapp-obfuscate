# weapp-obfuscate

微信小程序加固配置文件生成工具，可以快速生成 `code_obfuscation_config.json` 文件。

## 背景

在 2022 年 7 月份，微信开发者工具上线了代码加固插件，可以对代码进行混淆加固，具体使用方法可以查阅 [官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/code_obfuscation.html)。

出于安全考虑，部分小程序可能会有代码加固的需要，但由于官方没有提供快速批量加固的功能，如果手动编写 `code_obfuscation_config.json` 文件需要耗费大量时间，毕竟有些小程序可能包含几十个甚至上百个页面，再加上组件，工作量会非常巨大。

## 安装
```shell
npm install weapp-obfuscate -D
```

## 使用

编辑 `package.json` 文件 `scripts`：
```json
{
  "scripts": {
    "obfuscate": "weapp-obfuscate"
  }
}
```
或者执行
```shell
npm pkg set scripts.obfuscate="weapp-obfuscate"
```

然后执行
```shell
npm run obfuscate
```

即可生成相应的 `code_obfuscation_config.json` 文件。

## CLI 参数

+ `--config` or `-C` 指定对应的配置文件，比如指定 `obfuscate.config.js`
  ```json
  {
    "scripts": {
      "obfuscate": "weapp-obfuscate --config obfuscate.config.js"
    }
  }
  ```

## 配置文件
配置文件接受以下类型:
+  `.json` 文件，比如:
   ```json
   {
    "excludes": [
      "node_modules",
      "libs"
    ]
   }
   ```
+  `.js` 文件，需要对外暴露一个对象，比如:
   ```javascript
   module.exports = {
    excludes: ["node_modules", "libs"]
   }
   ```

## 配置选项

### **entry**

type: `string`

入口目录，会生成该目录下的所有 `js` 文件的加固配置。默认为项目的根目录。

如果想只对分包 package 目录下的 js 进行加固，可以修改该配置:
```javascript
module.exports = {
  entry: "./package"
}
```

### **excludes**

type: `array`

排除的目录名或者文件名。默认为 `["node_modules"]`
> 如果是**目录**名称，则该目录下的所有文件都不会生成对应的加固配置。

### **desc**

type: `string`

`code_obfuscation_config.json` 文件的 `desc` 字段。

### **switch**

type: `boolean`

`code_obfuscation_config.json` 文件的 `switch` 字段。

## License
[MIT License](LICENSE)

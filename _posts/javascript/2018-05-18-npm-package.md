---
layout: post
title: 开发npm包
category: javascript
description: Javascript
disqus: false
---

## 目录构建
* npm init
* 项目结构：

```
.
├── bin           //命令配置
├── README.md     //说明文档
├── index.js      //主入口
├── src           //功能文件
├── package.json  //包信息
└── test          //测试用例
```

## 开发模块
* 入口index.js模块 非全局安装(npm install xxx)，则所有的函数接口都通过index.js暴露给外部调用

```
/**
* Hello World
* @function hello
**/
const hello = function(key){
    console.log('Hello World!');
};

exports.hello     = hello;
```

* src/init.js模块

```
const exec = require('child_process').exec;

exports.run = function(name) {
    //初始化一个空文件夹
    exec('mkdir ' + name,function() {
        console.log('king init命令已执行...');
    });
};
```

* src/start.js模块

```
const express = require('express');
const app     = express();

exports.run = function(options) {
    const port = options.port || 3000;
    app.listen(port);
    console.log('服务已启动，正在监听' + port + '端口...');
};
```

## 配置全局命令
* bin目录下写配置代码
* cli.js自定义命令，主要通过引入commander模块去处理，包括命令描述、参数及执行动作
* king.js文件名称应与全局命令king保持一致，做命令的入口，具体看demo

## 发布npm包
* npm login
* npm publish

## 局部安装
* 所有的函数功能接口都由index.js暴露给外部
* src里面可以放功能代码，src --> index.js只做output，暴露给外部调用

## 全局安装
* 包全局安装的情况，一般是做自动化工具，关键在于配置全局命令，与index.js无关
* 通过bin目录下与全局命令相同的js文件(如king.js)处理command的输入【如：king start】





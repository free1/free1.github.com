---
layout: post
title: Linux常见问题
category: linux
description: 操作系统
disqus: false
---

## linux语言设置
* 安装localepurge管理语言文件: `sudo apt-get install localepurge`
* 进行配置: `sudo dpkg-reconfigure localepurge`
* 生成语言: `sudo locale-gen zh_CN.UTF-8 en_US.UTF-8`
* 打印出当前的配置信息: `locale`

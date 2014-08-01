---
layout: post
title: memcached常用操作
category: notes
description: 缓存
disqus: false
---

## 启动

```
memcached -d
```

## 检查是否启动

```
telnet 127.0.0.1 11211
ps -ef|grep 11211
查看状态:
stats
退出:
control + ]
清除所有缓存:
flush_all
```
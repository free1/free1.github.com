---
layout: post
title: Rails model基础
category: rails
description: Rails
disqus: false
---

## [sql转ActiveRecord工具](http://www.scuttle.io/)

## Record查询中joins和include的区别
* includes会把一起连接表的所有字段都查询出来，放到内存里面。当你想取连接表的数据的时候，无须再查询数据库了。
* joins只会把主表的数据查询出来放在内存，如果需要查询连接表的数据，还必须再次查询数据库。
* 当需要立即使用时使用includes，否则使用joins节省资源消耗。
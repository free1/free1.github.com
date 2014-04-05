---
layout: post
title: Rails优化
category: ruby
description: Rails
disqus: false
---

## 常见的:

* 合理的给数据库加上索引
* 尽可能的减少数据的访问，避免 N+1 查询，避免 Join
* 避免重复执行的代码
* 避免在循环里面再次调用数据库查询
* 重的 IO 请求 (Email 发送, 调用远程 API...) 等动作尽量用异步的方式实现
* 多多利用内存，减少磁盘 IO
* 用 id desc 代替 created_at desc 来实现最新记录的排序

[最佳實踐如何變成了最慢實踐](http://blog.xdite.net/posts/2012/11/20/rubyconf-china-2012-ten-slow-things-you-dont-know/)
[ruby-off-rails](http://robbinfan.com/blog/40/ruby-off-rails)

[New Relic](https://rpm.newrelic.com/accounts/646781/applications/setup?destination=web)

[Web应用的缓存设计模式](http://robbinfan.com/blog/38/orm-cache-sumup)
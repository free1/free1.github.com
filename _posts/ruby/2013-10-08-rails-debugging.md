---
layout: post
title: Rails中调试技巧
category: ruby
description: Rails
disqus: false
---

## 发送post请求时使用可以去掉参数验证
  `skip_before_filter :verify_authenticity_token, :only => [:create]`

## [模拟post请求](https://www.runscope.com/)

## 模拟post方法
* [Uploadify, Flash Sessions, and Rails 2.3.8](http://stackoverflow.com/questions/5366253/uploadify-flash-sessions-and-rails-2-3-8/15456801#15456801)

* [WARNING: Can't verify CSRF token authenticity rails](http://stackoverflow.com/questions/7203304/warning-cant-verify-csrf-token-authenticity-rails)

## [Rails中使用uploadify 插件](http://www.siwei.me/blog/posts/uploadify-in-rails)
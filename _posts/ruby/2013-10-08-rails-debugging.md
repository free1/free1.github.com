---
layout: post
title: Rails中调试技巧
category: ruby
description: Rails
disqus: false
---

## 发送post请求时使用可以去掉参数验证
  `skip_before_filter :verify_authenticity_token, :only => [:create]`
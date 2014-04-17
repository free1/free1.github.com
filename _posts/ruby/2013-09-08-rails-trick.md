---
layout: post
title: Rails好用的技巧
category: ruby
description: Rails
disqus: false
---

## View开发技巧
* [表单中的虚拟属性](http://cn.asciicasts.com/episodes/16-virtual-attributes)   
  视图使用的属性不对应数据库中的字段。

* [非数据库数据模型](http://cn.asciicasts.com/episodes/219-active-model)   
  不依赖于后端数据库的表单。

* [嵌套模型的form第一部分](http://cn.asciicasts.com/episodes/196-nested-model-form-part-1)，[嵌套模型的form第二部分](http://cn.asciicasts.com/episodes/197-nested-model-form-part-2)   
  `accepts_nested_attributes_for`:   
  需要`has_one/has_many`这样的从属关系，但是又不想再单独为被包含的对象建一个表的时候用。   
  比如`user has_one profile`，`profile`包括`name，address，phone`等等。
  不想单独建一个profile表，但是全部作为User的属性又显得很乱，就可以把profile嵌入到user里面，实际上还在user表里，但是有了`has_one/has_many`这样的从属关系，逻辑上更清晰。

* [多步骤表单](http://railscasts.com/episodes/217-multistep-forms)
  将表单的填写分成多个页面，类似支付，可以下一步和上一步。


## Model开发技巧
* [Rails 3中的Active Record的查询](http://cn.asciicasts.com/episodes/202-active-record-queries-in-rails-3)   
  model中的查询和scope的使用。

* [Rails 3 中的高级查询](http://cn.asciicasts.com/episodes/215-advanced-queries-in-rails-3)   
  用类方法代替Scopes等高级查询。

* [Include vs Joins](http://cn.asciicasts.com/episodes/181-include-vs-joins)   
  modle查询中include和joins的区别。

* [多态关联](http://cn.asciicasts.com/episodes/154-polymorphic-association)   
  多个model对应同一个model，减少关联关系复杂性。
  
* [嵌入关联](http://cn.asciicasts.com/episodes/189-embedded-association)   
  角色的权限验证系统Role。

## 路由开发技巧
* [Routing in Rails 3](http://cn.asciicasts.com/episodes/203-routing-in-rails-3)   
  :as具名路由，可选参数，Constraints限定等用法。


## 功能开发技巧
* [发送email](http://cn.asciicasts.com/episodes/206-actionmailer-in-rails3)   
  系统自动发送email功能。
* [给文章打标签(虚拟属性)](http://cn.asciicasts.com/episodes/167-more-on-virtual-attributes)   
  增加标签功能。
* [自引用关联](http://cn.asciicasts.com/episodes/163-self-referential-association)   
  用户关注功能。
* [Seed Data](http://cn.asciicasts.com/episodes/179-seed-data)   
  初始化数据(seeds.rb)显示用户使用的操作系统等。
* [Trees with Ancestry](http://railscasts.com/episodes/262-trees-with-ancestry?view=asciicast)
  类似新闻评论上的楼中楼。
* [Tree Based Navigation](http://railscasts.com/episodes/162-tree-based-navigation)
  树形导航,面包屑。


## 开发好用的gem
* [Bundler使用](http://cn.asciicasts.com/episodes/201-bundler)
* [订阅点解析](http://cn.asciicasts.com/episodes/168-feed-parsing)
* [图片处理](http://cn.asciicasts.com/episodes/134-paperclip)
* [图片裁减](http://cn.asciicasts.com/episodes/182-cropping-images)
* [后台运行任务](http://cn.asciicasts.com/episodes/171-delayed-job)
* [找到没有用到的CSS样式](http://cn.asciicasts.com/episodes/180-finding-unused-css)
* [错误通知Testing Exceptions](http://cn.asciicasts.com/episodes/187-testing-exceptions)
* [语法高亮](http://cn.asciicasts.com/episodes/207-syntax-highlighting)
* [用户系统Devise1](http://cn.asciicasts.com/episodes/209-introducing-devise)，[用户系统Devise2](http://cn.asciicasts.com/episodes/210-customizing-devise)

## 数据抓取
* [使用Nokogiri进行页面抓取](http://cn.asciicasts.com/episodes/190-screen-scraping-with-nokogiri)
* [Mechanize](http://cn.asciicasts.com/episodes/191-mechanize)

## Ajax技巧
* [用AJAX进行分页](http://cn.asciicasts.com/episodes/174-pagination-with-ajax)
* [AJAX的历史记录状态](http://cn.asciicasts.com/episodes/246-ajax-history-state)

## 数据库
* [MongoDB 和 MongoMapper的示例用法简介](http://cn.asciicasts.com/episodes/194-mongodb-and-mongomapper)

## 安全
* [七个安全技巧](http://cn.asciicasts.com/episodes/178-seven-security-tips)
* [XSS Protection in Rails 3](http://cn.asciicasts.com/episodes/204-xss-protection-in-rails-3)

## 缓存
* [动态页面缓存](http://cn.asciicasts.com/episodes/169-dynamic-page-caching)

## 测试好用的gem
* [Cucumber](http://cn.asciicasts.com/episodes/155-beginning-with-cucumber)
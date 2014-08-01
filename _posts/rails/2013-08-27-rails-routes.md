---
layout: post
title: Rails Routes
category: rails
description: Rails(转载)
disqus: false
---

[Rails3 Route 用法集锦](http://blog.sina.com.cn/s/blog_6721c4c70100ooeb.html)
[Rails Routes 中的两件事](http://ruby-china.org/topics/15270)

## 使用命名空间
Account 进行 devise:   
routes.rb   

`devise_for :accounts, :controllers => { :sessions => "admin/sessions" }`

然后将sessions_controller.rb拷贝到如下目录:   

`app/controllers/admin/`

同时新建以下view:   

`app/views/admin/sessions/new.html.erb   #登陆页面`

## devise路由

写在前面：在看devise的源码过程中，发现Devise在做Routes Mapping时，使用了Rails自己的@constraints。于是查查文档，笔记两件事。

以下内容粗略翻译自Ruby on Rails 4.0.1， ActionDispatch::Routing::Mapper::Scoping 。

位置：actionpack/lib/action_dispatch/routing/mapper.rb
第一件事，通过routes访问资源。

这种写法很熟悉的。

namespace "admin" do
  resources :posts, :comments
end

那么，访问/posts，调用 Admin::PostsController 时，如何写呢？

scope module: "admin" do
  resources :posts
end

或者

resources :posts, module: "admin"

当然，反过来，访问 /admin/posts 时，调用 PostsController，就这么写：

scope "/admin" do
  resources :posts
end

或者

resources :posts, path: "/admin/posts"

第二件事，限制访问。

比如允许 /posts/1.1 访问，而禁止 /posts/1，那么代码如下：

constraints(id: /\d+\.\d+/) do
  resources :posts
end

在其他的资源引用上，也可以做如下限制：

resources :posts do
  constraints(post_id: /\d+\.\d+/) do
    resources :comments
  end
end

限制ip访问，比如 只允许 192.168.* 访问资源：

constraints(ip: /192\.168\.\d+\.\d+/) do
  resources :posts
end

动态请求时的匹配，比如下面的这个限制：

constraints(lambda { |req| req.env["HTTP_USER_AGENT"] =~ /iPhone/ }) do
  resources :iphones
end

当然你也可以把它放到model里：

class Iphone
  def self.matches?(request)
    request.env["HTTP_USER_AGENT"] =~ /iPhone/
  end
end

下面这句话有待验证，暂时不译：

An expected place for this code would be lib/constraints.

This class is then used like this:

constraints(Iphone) do
  resources :iphones
end

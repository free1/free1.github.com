---
layout: post
title: Rails Route基础
category: rails
description: Rails(转载)
disqus: false
---

## 路由中member与collection区别:
* member 方法作用是，设置这两个动作对应的 URL 地址中应该包含用户的 id，例如: /users/1/following生成 `following_user_path(1)`
* 如果是show edit这种只处理一个。　就是member。
* collection 方法，但 URL 中就没有用户 id 了，例如: /users/tigers生成 `tigers_users_url`
* 如果index　`bulk_edit` 这样一次操作多个。就是collection。


## restful路由规则

```
HTTP 请求   URI   动作                   具名路由   作用   
GET         /users  index                  users_path   显示所有用户的页面
GET         /users/1  show                 user_path(user) 显示某个用户的页面
GET       /users/new  new                  new_user_path  创建（注册）新用户的页面
POST       /users   create                users_path  创建新用户
GET    /users/1/edit  edit            edit_user_path(user) 编辑 id 为 1的用户页面
PUT       /users/1  update            user_path(user) 更新用户信息
DELETE     /users/1   destroy        user_path(user)  删除用户
```


## 使用命名空间

```
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

```

## 限制访问。

```
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

constraints(Iphone) do
  resources :iphones
end
```
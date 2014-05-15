---
layout: post
title: Rails小技巧
category: rails
description: Rails
disqus: false
---

## 视图中ERB 里面 `-%>` 的用法   
忽略后面的空格和换行符, 使输出更紧凑。另外 <%= expr =%> 相当于 <%= expr -%> 。  

erubis 默认支持的   
erb 要设置 trim mode

```
$ erb -T -
<div><%= 1 -%> </div>
^D
<div>1</div>
```

## 建立单独页面，而不使用通用页面(全局页面)
* 在要使用的`controller`中加入`layout "xxx_xx"`。
* 建立xxx.css，在application.css中加入`require xxx`。
* 在xxx_xx.erb中编写页面，其中需要带有整个普通页面的写法，并包含stylesheet_link_tag "xxx"等。

## 外部有post请求时，出现Authenticity Token

[Rails 4 Authenticity Token](http://stackoverflow.com/questions/16258911/rails-4-authenticity-token)

* 不太好的实现。

```
protect_from_forgery with: :exception
改为
protect_from_forgery with: :null_session
```

* 好的实现on rails 3.2

`request_forgery_protecton.rb`

```
# This is the method that defines the application behavior when a request is found to be unverified.
# By default, \Rails resets the session when it finds an unverified request.
def handle_unverified_request
  reset_session
end
```

* 好的实现on rails 4

`request_forgery_protecton.rb`

```
def handle_unverified_request
  forgery_protection_strategy.new(self).handle_unverified_request
end
```
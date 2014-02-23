---
layout: post
title: Rails中使用命名空间
category: ruby
description: Rails
disqus: false
---

## 路由中的写法

```
namespace :xxx do
  ...
end
```
xxx为controllers下命名空间的文件夹，xxx全小写

## 控制器中的写法

```
class Xxx::AaController < xxxxx
end
```
Xxx为controllers下命名空间的文件夹(它归属的文件夹)，Xxx开头字母大写

## 视图中的写法

* 使用具名路由时加上命名空间，`xxx_aa_path`，`new_xxx_aa_path`
* 使用link_to或者form_for时，参数使用[:xxx, @aa]

```
<%= form_for([:xxx, @aa]) do |f| %>
 ...
<% end %>
```
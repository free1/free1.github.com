---
layout: post
title: Rails中使用命名空间
category: rails
description: Rails
disqus: false
---

## 路由中的写法

* xxx为controllers下命名空间的文件夹，xxx全小写:

```
namespace :xxx do
  ...
end
```
* 路由不以/xxx作为前缀，匹配到Xxx::AaController时:

```
scope :module => "xxx" do
  resources :posts, :comments
end
```
* 把路由/xxx/aa匹配到AaController(控制器中没有 Xxx:: 这个模块作为前缀)时:

```
scope "/xxx" do
  resources :posts, :comments
end
```

## 控制器中的写法

* Xxx为controllers下命名空间的文件夹(它归属的文件夹)，Xxx开头字母大写:

```
class Xxx::AaController < xxxxx
end
```

## 视图中的写法

* 使用具名路由时加上命名空间，`xxx_aa_path`，`new_xxx_aa_path`
* 使用link_to或者form_for时，参数使用[:xxx, @aa]

```
<%= form_for([:xxx, @aa]) do |f| %>
 ...
<% end %>
```
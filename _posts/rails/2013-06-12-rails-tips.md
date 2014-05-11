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

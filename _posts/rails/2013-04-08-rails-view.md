---
layout: post
title: Rails View基础
category: rails
description: Rails
disqus: false
---

## 视图中ERB 里面 `-%>` 的用法      
忽略后面的空格和换行符, 使输出更紧凑。另外 <%= expr =%> 相当于 <%= expr -%> 。  


## 建立单独页面，而不使用通用页面(全局页面)
* 在要使用的`controller`中加入`layout "xxx_xx"`。
* 建立xxx.css，在application.css中加入`require xxx`。
* 在xxx_xx.erb中编写页面，其中需要带有整个普通页面的写法，并包含stylesheet_link_tag "xxx"等。


## 使用link_to时传递后面的参数: 

```
在path的括号中加入:
<%= link_to "删除", delete_list_subject_path(correlation_id: list.id), method: :delete, data: { confirm: "确定要删除吗?" } %> <br/>
```
---
layout: post
title: Rails小技巧
category: ruby
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

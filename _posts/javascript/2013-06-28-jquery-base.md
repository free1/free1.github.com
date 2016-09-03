---
layout: post
title: jquery常识
category: javascript
description: jquery
disqus: false
---

## input select选择框
* 判断选择框是否被选中: `$("select").is(':checked')`
* 自动选中选择框: `$("select").prop('checked', true)`
* 选中所有元素:  `$("select")`
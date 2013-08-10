---
layout: post
title: 常用表格设置
category: designs
description: HTML
disqus: false
---

## input中text设置不可修改   
* `<input type="text" name="haha1" value="free" readonly>`   
<input type="text" name="haha1" value="free" readonly> 
 //文本域可点击但无法输入  

* `<input type="text" name="haha3" value="free" disabled>`  
<input type="text" name="haha3" value="free" disabled> 
//文本变成灰色不可修改


* `<input type="text" name="haha2" onfocus="this.blur()"`   
<input type="text" name="haha2" onfocus="this.blur()">  //点击文本框没反应
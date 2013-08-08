---
layout: post
title: 常用布局问题
category: designs
description: CSS
disqus: false
---

* body 中加入 font-family: 'Helvetica Neue', Arial, 'liberation Sans', FreeSans, 'Hiragino Sans GB', sans-serif; 字体会从第一个开始往后寻找浏览器能够识别的字体。

* 在html中加入 
	<div class="clear"></div> 
	在css中加入
	.class{ clear: both; } 
	可以清除前面的浮动。

* 导航的常见设置
	ul { list-style: none; }   去掉下划线
	ul li { display: inline-block; }   导航横向排列(不要使用浮动)
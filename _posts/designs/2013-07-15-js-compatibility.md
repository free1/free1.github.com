---
layout: post
title: JS浏览器兼容
category: designs
description: Javascript
disqus: false
---

## 获取元素第一个节点

```
	//IE6-8
	//oUl.firstChild.style.background='red';
	
	//高级浏览器
	//oUl.firstElementChild.style.background='red';
	
	if(oUl.firstElementChild)
	{
		oUl.firstElementChild.style.background='red';
	}
	else
	{
		oUl.firstChild.style.background='red';
	}
```
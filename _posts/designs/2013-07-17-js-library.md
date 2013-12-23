---
layout: post
title: 编写简单js库
category: designs
description: Javascript
disqus: false
---

## 简单模式:

```
(function(){
	// 创建一个对象
	window.FL = {};
	// 添加函数
	function xx()
	{
		// 代码
	}
	// 将函数xx挂载到对象window.FL上
	window.FL.xx = xx;
})();

// 调用:
FL.xx();
```

## 例子:

```
// 查找元素

// 查找ID元素
// FL.$("testId") or FL.$("testId", "testId2")

// 支持IE9以下的查找元素为class的方法
// FL.getElementsByClassName("testClass", "input")
(function(){
	// 创建FL对象
	window.FL = {};

	// 查找ID元素
	function $()
	{
		var elements = [];
		
		for(var i=0; i<arguments.length; i++)
		{
			var element = arguments[i];
			// 如果参数为string,循环取出元素
			if(typeof element == 'string')
			{
				element = document.getElementById(element);
			}
			// 一个参数直接返回
			if(arguments.length == 1)
			{
				return element;
			}
			// 多个参数放入数组
			elements.push(element);
		}
		// 返回数组
		return elements;
	}
	// 将$放入FL对象中
	window.FL.$ = $;
	
	
	// 支持IE9以下的查找元素为class的方法
	function getElementsByClassName(className, tag)
	{
		var allTags = document.getElementsByTagName(tag);
		var matchingElements = [];
		
		className = className.replace(/\-/g, "\\-");
		var reger = new RegExp("('|\\s)" + className + "(\\s|$)");
		
		var element;
		
		for(var i=0; i<allTags.length; i++)
		{
			element = allTags[i];
			if(reger.test(element, className))
			{
				matchingElements.push(element);
			}
		} 
		
		return matchingElements;
	}
	window.FL.getElementsByClassName = getElementsByClassName;
})();
```
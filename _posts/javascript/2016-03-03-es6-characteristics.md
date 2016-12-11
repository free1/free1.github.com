---
layout: post
title: ECMAScript 6
category: javascript
description: Javascript
disqus: false
---

## let和const声明
* let只在代码块内有效, var全局范围内都有效
* let不存在变量提升(所以存在暂时性死区), var会变量提升
* let不允许在相同作用域内重复声明同一个变量
* const声明常量(需初始化), 其他与let类似
* const声明只会保证地址不变, 为其赋值一个对象时可以添加新属性, 将对象冻结应该使用Object.freeze方法
* 全局变量与顶层对象的属性不再等价
* let和块级作用域可以代替立即执行函数表达式(IIFE)

```
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```


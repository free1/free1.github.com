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

## 模板字符串(`string ${var}`)


## Array.from可以将Iterator接口的对象转换为数组


## 判断相等
* 相等运算符(==): 会自动转换数据类型
* 严格相等运算符(===): NaN不等于自身, +0等于-0
* Object.is: 与===相似, 严格相等


## Proxy代理
* 拦截和监视外部对对象的访问
* 降低函数或类的复杂度
* 在复杂操作前对操作进行校验或对所需资源进行管理


## 模块化(export和import)
* 使用export关键字定义导出对象, 这个关键字可以无限次使用
* 使用import关键字引入导入对象, 这个关键字可导入任意数量的模块
* export: name1… nameN－导出的“标识符”。导出后，可以通过这个“标识符”在另一个模块中使用import引用
default－设置模块的默认导出。设置后import不通过“标识符”而直接引用默认导入
*－继承模块并导出继承模块所有的方法和属性
as－重命名导出“标识符”
from－从已经存在的模块、脚本文件…导出


## Promise
function getPosts() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(posts);
    } , 3000);
  });
}



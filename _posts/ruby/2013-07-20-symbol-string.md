---
layout: post
title: Symbol与String
category: ruby
description: Ruby(转载)
disqus: false
---

[理解 Ruby Symbol](http://www.ibm.com/developerworks/cn/opensource/os-cn-rubysbl/index.html)

[Symbol 内幕](http://www.ibm.com/developerworks/cn/opensource/os-cn-rubysbl2/index.html)   

* 每个 String 对象都是不同的，即便他们包含了相同的字符串内容；而对于 Symbol 对象，一个名字（字符串内容）唯一确定一个 Symbol 对象。
* 使用 Symbol 处理名字可以降低 Ruby 内存消耗，提高执行速度。   
* Symbol内容不可改变，String内容可以改变。

* Symbol 转化为 String：使用 to_s 或 id2name 方法将 Symbol 转化为一个 String 对象。
* String 转化为 Symbol：除了在字符串前面加冒号，还可以使用 to_sym 或 intern 方法将 String 转化为 Symbol ，如果该 Symbol 已经存在，则直接返回。

* 如果使用字符串的内容，这个内容可能会变化，使用 String   
  如果使用固定的名字或者说是标识符，使用 Symbol   
---
layout: post
title: 常用迭代起详解
category: ruby
description: Ruby(转载)
disqus: false
---

## 最常用的迭代器:
* `each` 迭代取出(元素)，返回原对象
* `each_with_index` 迭代取出(元素,索引)，返回原对象
* `map`和`collect` 迭代取出(元素)，返回代码块处理后新数组［加上！返回修改后原数组］
* `to_a` 无代码块，返回数组对象
* `find` 迭代取出满足代码块(元素)，返回元素或nil
* `select`和`find_all` 迭代取出代码块要求的(元素)，返回元素数组
* `reject` 迭代丢弃代码块要求的元素，返回剩下的数组

## 迭代器详解:   

![Alt text](/images/iteration.png)
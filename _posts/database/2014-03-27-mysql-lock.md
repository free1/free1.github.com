---
layout: post
title: mysql加锁机制
category: database
description: mysql
disqus: false
---

## select for update      
"select * from where xxx for update" 时，在 repeat read的隔离级别下
* 如果name没有索引, 则锁全表(表锁)
* 如果name有普通索引, 则锁一个区间 - range lock
* 如果name是唯一索引, 仅仅锁一行(行级锁)
* 如果name是主键, 仅仅锁一行

## 隔离级别
* 设置级别: `set transaction isolation level`
* 隔离类型: read uncommitted(未提交读), Read committed(提交读脏读问题), Repeatable read(重复读默认), Serializable(可串行化)


---
layout: post
title: Rails中复杂查询
category: ruby
description: Rails
disqus: false
---

[Active Record 查询](http://docs-china.com/rails/active_record_querying.html#joining-tables)

## 一对多数量查询

表1：users，表2：books。
每个user对应若干books，

查每个user在一个时间段的books数量:

```
Book.where("created_at > ?", 1.day.ago).group(:user_id).select("user_id, count(*) AS books_count").order("books_count DESC")
```
排序每个user的books数量排名:

```
belongs_to :user, counter_cache: true
在user表中加入books_count字段
Book.order("books_count DESC")
```

## 关联表查询
* includes
在需要用到第二张表的很多字段时使用，可以防止N+1多次查询数据库问题，懒加载。   
用数组指定多个关联: Post.includes(:category, :comments)
使用 Hash 指定嵌套关联: Category.includes(posts: [{ comments: :guest }, :tags])
按需加载关联上的条件: Post.includes(:comments).where("comments.visible" => true)
* joins
只需要用到第二张表的某个字段时使用，节省内存空间。   
连接单个关联: Category.joins(:posts)   
连接一层嵌套关联: Post.joins(comments: :guest)   
连接多层嵌套关联: Category.joins(posts: [{ comments: :guest }, :tags])
* where
按连接表的条件查询: Opu.joins(user: :merchant).where(merchants: { business_scope: "#{params[:business_scope]}" })

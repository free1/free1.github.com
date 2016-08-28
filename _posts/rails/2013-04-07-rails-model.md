---
layout: post
title: Rails Model基础
category: rails
description: Rails
disqus: false
---

## 约定column不可用字段
* `id`:  主键
* `{tablename}_id`:  外键
* `created_at,updated_at,created_on,updated_on`:  时间
* `{tablename}_count`: Counter cache功能使用
* `type`:  STI功能(单表继承)
* `lock_version`:  乐观锁功能


## Model常见方法
* `find` 查找
* `order("published_at desc")` 排序(接收sql语句)
* `limit(10)` 限制纪录数量(数字)
* `where("published_at <= ?", Time.now)`  查找纪录条件(接收sql语句，问号中的内容)
比如查询昨天到今天一天的数据: `where(created_at: (Time.now.midnight - 1.day)..Time.now.midnight)`   
今天的数据: `Time.now.midnight..Time.now.midnight +  1.day`
* `group` 分组
* `offset` 偏移量(数字从第几个开始)
* `preload(:模型名)` 使用一条附加的查询语句来加载关联数据             
* `eager_load(:模型名)` 使用 LEFT OUTER JOIN 进行单次查询，并加载所有的关联数据
* `includes(:模型名)` 动态选择preload或eager_load                   
* `joins(:模型名)` 使用 INNER JOIN 来加载关联数据
* `scope` 定义一个类方法完成查询，使用lambda可以使方法传递参数，真正使用时才执行(延迟执行)


## Record查询中joins和include的区别
* includes会把一起连接表的所有字段都查询出来，放到内存里面。当你想取连接表的数据的时候，无须再查询数据库了。
* joins只会把主表的数据查询出来放在内存，如果需要查询连接表的数据，还必须再次查询数据库。
* 当需要立即使用时使用includes，否则使用joins节省资源消耗。


## 关联表排行榜统计例子

```
Model.where_time(self.start_end_time(time))
          .where_records(type_id)
          .group(:user_id)
          .select("user_id, sum(column_name) as rank")
          .order("rank desc")
          .map(&:user_id)
```

## `Mysql2::Error: Data too long for column` 的解决方案(使用utf8mb4)
[MySQL utf8mb4 字符集](http://www.linuxidc.com/Linux/2013-05/84360.htm)
修改database、table和column字符集   

```
For each database: 
ALTER DATABASE database_name CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
For each table: 
ALTER TABLE table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
For each column: 
ALTER TABLE table_name CHANGE column_name column_name VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```


## Rails使用mysql存储大字段
* database.yml中加入

`collation: utf8mb4_unicode_ci`


## save和new区别      
save：rails中的save其实是 `create_or_update` ，新建或修改记录！不一定是新建。   
new ：只是在内存中新建一个对象，操作数据库要调用save方法。   
create = new + 执行sql。   
build：与new基本相同，多用于一对多情况下。   
!：new!, create!, build!与new, create,    build的区别是带!的方法会显示validate的错误信息，如果验证失败会抛出导常(主要的是不跳过验证)。    
save是实例方法，而create, build, new是模型类的类方法      
`before_save和before_create` 最大的一个区别就是，`update` 也算是 `before_save` 。 


## model中验证唯一性
`validates :comicid , :uniqueness=>{:scope => [:orderid]}`
comicid, orderid的组合唯一

## 当model缓存不对时reload

```
info = error_offline.info
puts info.id
error_offline.destroy
# info.offline.destroy
# info.reload
```
当记录查找出来赋值时，对象信息被缓存，需要reload


## where和like例子
`Offline.where("file_url LIKE ? ","%2173681a888870928888a15234.zip%").first.file_url`


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
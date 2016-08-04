---
layout: post
title: Rails基础
category: rails
description: Rails
disqus: false
---

## 常用rails命令例子
* 创建rails程序并不带自身测试： rails new sample_app --skip-test-unit
* 指定rails版本创建项目：`rails  _版本号_ new` 项目名称   
* 创建脚手架：rails generate scaffold User name:string email:string
* 生成控制器代码：rails generate controller FooBars baz quux  (--no-test-framework加上不生成测试所用代码)
* 撤销控制器代码：rails destroy  controller FooBars baz quux
* 生成模型代码：rails generate model Foo bar:string baz:integer
* 撤销模型代码：rails destroy model Foo
* 查看关于数据库的rake任务：bundle exec rake -T db
* 查看所有rake任务：bundle exec rake -T
* 迁移数据库：rake db:migrate
* 在命令行使用开发数据库：sqlite3 -line db/development.sqlite3
* 离开开发数据库：.quit
* 撤销迁移数据库：rake db:rollback
* 安装gem：bundle install --without production 不包括生产环境
* 开启开发环境的服务器：rails s
* 开启生产环境的服务器：rails s -e production
* 添加字段到已有表中：rails generate migration AddxxxToxxs price:decimal{5,2} 
* 在生产环境下进入控制台：bundle exec rails c production
* 在生产环境下进入控制台：RAILS_ENV=production rails c
* 格式化时间：strftime("%Y-%m-%d %H:%M:%S")
* rails c不生效：rake rails:update:bin
* rails runner "Post.crawl_post" -e production
* 本地使用80端口打开(rvm)server `rvmsudo rails s -p 80`
* ar执行sql语句: `ActiveRecord::Base.connection.execute("TRUNCATE table multilevel_categories")`
* echo $GEM_HOME   
* echo $GEM_PATH     


## 控制台技巧(rails c)
* 输出实例的属性: `y _`
* 重新加载: `reload!`   


## gemfile中版本选择         
* >= 总会升级到最新版；
* ~> 3.2.2 只会升级补丁版本的更新（例如从 3.2.1 到 3.2.2），而不会升级到次版本或主版本的更新（例如从 3.2 到 3.3）   


## 整理复杂的migrate文件   
直接新建一个 migration，把 schema.rb 里的内容拷到 setup 里，然后把老的所有 migration 文件删掉。重新 migrate 一下更新 schema.rb。  


## 关于判定布尔值(blank?, empty?, nil?, any?)
* blank?和empty?(没有内容返回 true, 有内容返回false)

```
>> " ".blank?    # =>   true
>> " ".empty?     # =>   false
```
* nil?(有一个特殊的方法可以测试对象是否为空)

```
>> "foo".nil?
=> false
>> "".nil?
=> false
>> nil.nil?
=> true
```
* any?(any? 和 empty? 的作用相反，有内容返回 true, 没有内容返回 false, 字符串空格属于有内容，返回 true)

```
>> a = ["free ", "qq "]
>> a.any?
 # =>   true

>> a = []
>> a.any?
 # =>   false

>> a = [ ]
>> a.any?
 # =>   false

>> a = [" "]
>> a.any? # =>   true
```
* present? (检查对象是否存在) 


## 常见问题
* 当用户权限不够时可以使用root用户登录或者使用 `chmod` 命令修改权限: `chmod 600 authorized_keys` 。
* 当进入项目安装rails时提示gem不兼容就要指定rails版本: `gem install rails -v=4.0.2` 。
* 当使用rvm时，有时sudo不能获取权限就要使用rvmsudo。
* chown 命令可以更改拥有者。
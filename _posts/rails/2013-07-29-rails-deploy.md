---
layout: post
title: 在生产环境VPS中部署
category: rails
description: 部署
disqus: false
---

## [Ubuntu 12.04 上使用 Nginx Passenger 部署 Ruby on Rails](https://github.com/ruby-china/ruby-china/wiki/Ubuntu-12.04-%E4%B8%8A%E4%BD%BF%E7%94%A8-Nginx-Passenger-%E9%83%A8%E7%BD%B2-Ruby-on-Rails)

* [问题: -bash: /etc/apt/sources.list.d/passenger.list: Permission denied](https://ruby-china.org/topics/18987)


## [Passenger/Nginx/Ubuntu快速部署Rails 3.1](https://hisea.me/p/rails31-ubuntu-passenger-nginx-quick-deploy)


## [Setup Ruby On Rails on Ubuntu 14.04 Trusty Tahr](https://gorails.com/setup/ubuntu/14.04)


## 使用Capistrano自动完成部署(rails 101书上)


## [如何在 Linode 上搭建 Discourse 论坛](http://lvguoning.com/posts/175948/how-to-build-a-discourse-on-linode-forums)


## [在阿里云 (aliyun) 服务器上搭建Ruby On Rails生产环境](http://zhifangzi.com/posts/dingnAn/built_ruby_on_rails_production_environment_on_aliyun)


## mysql远程访问。

* 进入远程数据库输入: `grant all PRIVILEGES on 数据库.表名(所有表*) to root(用户名)@'%(ip)' identified by '密码';` 。
* 进入远程数据库输入: `netstat -an |grep 3306` 查看mysql状态。
* 确认防火墙的3306端口开着(本地输入): `ufw status`。
* 确认本地可以访问远程数据库: `telnet ip 3306`
* `/etc/mysql/my.cnf` 数据库配置文件中 `bind-address=127.0.0.1` 改为 `0.0.0.0`
* 重启: `sudo/etc/init.d/mysql restart(stop,start)`, `sudo restart mysql`, `sudo service mysql restart`
* [iptables防火墙](http://www.jb51.net/os/Ubuntu/45291.html)


## 常见问题

* 当用户权限不够时可以使用root用户登录或者使用 `chmod` 命令修改权限: `chmod 600 authorized_keys` 。

* 当进入项目安装rails时提示gem不兼容就要指定rails版本: `gem install rails -v=4.0.2` 。

* 当使用rvm时，有时sudo不能获取权限就要使用rvmsudo。

* chown 命令可以更改拥有者。

* `Mysql2::Error: Data too long for column` 的解决方案(使用utf8mb4)

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


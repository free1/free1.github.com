---
layout: post
title: mysql主从复制
category: database
description: mysql
disqus: false
---

## 概念   
master将改变记录到二进制日志(binary log)中, slave将master的binary log events拷贝到它的中继日志(relay log), slave重做中继日志中的事件。

## 复制类型
* Statement: 在主服务器上执行的SQL语句, 在从服务器上执行同样的语句。MySQL默认采用基于语句的复制, 效率比较高, 但基于系统的计算可能会出现误差。
* Row: 把改变的内容复制过去。会造成数据量过大。
* Mixed: 默认采用基于语句的复制，一旦发现基于语句的无法精确的复制时，就会采用基于行的复制。


## 主从复制命令
* 建立新用户:  `create user 'dba'@'ip' identified by '123456';`
* 授权从数据库:  `grant replication slave on *.* to dba@'ip';`
* 备份主数据库数据:  `mysqldump --single-transaction --master-data=2 --triggers --routines --all-databases -uroot -p > xx.sql`
* 数据导入从数据库:  `mysql -uroot -p < xx.sql`
* 在主数据库中配置从数据库:  `change master to master_host='ip', master_user='dba', master_password='111', master_log_file='mysql-bin.000001', master_log_pos=recorded_log_position;`
* 查看从数据库状态:  `show slave status;`
* 关闭打开从数据库状态:  `stop slave;start slave;`






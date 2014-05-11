---
layout: post
title: Rails时区设置问题
category: rails
description: Rails
disqus: false
---

## 首先： 时区时间换算关系
UTC时间 + 时差 = 当地时间

## 其次：确认服务器时间正确
保证你服务上时间及时区正确无误，特别是时区.

## 最后了解Rails中的时间设定机制
Rails3、4中，默认采用UTC时间进行存储，不管你服务器上设定的是那个时区，当前什么时间，默认情况下，Rails都会将其转换为UTC时间，然后再存在数据库中，在页面中显示也是如此。

比如   
Local Time: 2013-12-13 18:00 (北京时间 +800 )   
那么   
UTC Time：2013-12-13 10:00   

如果在这个时间点，往DB中存了一条数据，Rails默认情况下，存在DB中的时间是   
2013-12-13 10:00， UTC时间   

通过`created_at`获得的时间并且在页面显示，也将是 2013-12-13 10:00 UTC时间。   

以上是Rails默认对时间的处理方式，也是鼓励这么做。   

这对我们开发者或者是很清楚时区换算关系的人来说，不是什么大问题，但对一般用户来说，这绝对不能接受。   

解决方式：   
在application.rb中添加以下两条配置, (以北京时间为例)   

```
config.time_zone = 'Beijing'   
config.active_record.default_timezone = :local   
```

通过添加这两条配置之后，你DB中的时间将以本地时间方式存储，在页面中显示的也将是本地时间。问题解决。   

延伸

```
config.time_zone = 'Beijing'
config.active_record.default_timezone = :local
```
这两条配置到底分别起到什么作用，我上周做过一组测试：   

Test One:   
默认配置，即：   

```
config.time_zone
config.active_record.default_timezone
```
均不做配置   

存储数据到DB时间：2013-12-07 10:54:57 (北京时间)   

```
DB时间                        2013-12-07 02:54:57   
created_at                    2013-12-07 02:54:57 UTC   
created_at.localtime          2013-12-07 10:54:57 CST   
created_at.utc                2013-12-07 02:54:57 UTC   
```
可以看出数据库时间是UTC时间，`created_at`也是UTC时间，`created_at.localtime`是北京时间   

Test Two:   
配置：   

```
config.time_zone = 'Beijing'

config.active_record.default_timezone不做配置
```

存储数据到DB时间：2013-12-07 10:57:55 (北京时间)   

```
DB时间                        2013-12-07 02:57:55   
created_at                    2013-12-07 10:57:55 +0800 CST   
created_at.localtime          2013-12-07 10:57:55 CST   
created_at.utc                2013-12-07 02:57:55 UTC   
```
可见`config.time_zone = 'Beijing'`配置的作用，是在ActiveRecord中取时间的时候，将UTC时间转换成Local时间，也就是通过`created_at`等方法获取到的将直接是Local时间。而存储在DB中的时间仍然是UTC时间。   

Test Three:   
配置：   

```
config.time_zone = 'Beijing'
config.active_record.default_timezone = :local
```

存储数据到DB时间：2013-12-07 11:02:56 (北京时间)   

```
DB时间                        2013-12-07 11:02:56   
created_at                    2013-12-07 11:02:56 +0800   
created_at.localtime          2013-12-07 11:02:56 CST   
created_at.utc                2013-12-07 03:02:56 UTC   
```
可见`config.active_record.default_timezone = :local`配置的作用，是在ActiveRecord中往数据库存放数据时，将按Local时间进行存储，通过添加这两项配置，就可以实现数据库存放时间以及通过`created_at`等方法取到的时间均为Local时间。   

另外可以看出，只要你的服务器时区及时间设置正确，任何配置情况下，`created_at.localtime`输出的时间均是正确的Local时间。   

`created_at.localtime(:db).to_s`   
如果不想在页面中显示本地时区及时差的话，可以通过created_at.localtime(:db).to_s去掉，   
如   
2013-12-07 11:02:56 CST   
通过调用`created_at.localtime(:db).to_s`得到的将是:    
2013-12-07 11:02:56
---
layout: post
title: ActiveRecord资料表关系
category: ruby
description: Rails(转载)
disqus: false
---

[ActiveRecord 資料表關係](http://ihower.tw/rails3/activerecord-relationships.html)

## 一对一关联one-to-one

model:

```
class Event < ActiveRecord::Base
    has_one :location # 单数
    #...
end

class Location < ActiveRecord::Base
    belongs_to :event # 单数
end


```

操作1: 建立Location(从属)模型并关联到Event(拥有)模型(new时把Event本体传进参数)

```
e = Event.first
l = Location.new( :name => 'Hsinchu', :event_id => e.id )
l.save
e.location
l.event
```

操作2: 从Event(拥有)模型中建立一个Location(从属)模型(`create_location`可以直接创建，`build_location`需要save)

```
e = Event.first
l = e.build_location( :name => 'Hsinchu' )
l.save
e.location
l.event
```

## 一对多关联one-to-many

model:

```
class Event < ActiveRecord::Base
    has_many :attendees # 复数
    #...
end

class Attendee < ActiveRecord::Base
    belongs_to :event # 单数
end
```

操作1: 建立Attendee(从属)模型并关联到Event(拥有)模型

```
e = Event.first
a = Attendee.new( :name => 'ihower', :event_id => e.id )
a.save
e.attendees # 数组
e.attendees.size
Attendee.first.event
```

操作2: 从Event(拥有)模型中建立一个Attendee(从属)模型

```
e = Event.first
a = e.attendees.build( :name => 'ihower' )
a.save
e.attendees
```

[之后内容详见链接](http://ihower.tw/rails3/activerecord-relationships.html)
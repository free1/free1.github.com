---
layout: post
title: Rails常见方法
category: ruby
description: Rails
disqus: false
---

## 字符串操作

* split: 字符串分割
* slice: 字符串截取
* insert: 字符串插入
* delete: 字符串删除
* sub, gsub, replace: 字符串替换
* include?: 判断是否包含
* reverse: 字符串反转
* chomp: 去掉字符串末尾的\n或\r, chop: 去掉字符串末尾的最后一个字符
* scan: 字符串匹配
* strip: 去掉空格
* length, size: 字符串长度


## 数组操作

* <<: 添加元素
* at, fetch: 获取元素
* compact: 去掉nil的元素
* concat: 附加元素到后面
* count: 数组元素数量
* cycle: 元素循环
* delete: 删除指定元素
* drop: 删除指定元素前面的元素
* each: 迭代取出每个元素
* empty?: 判空
* fill: 填充元素
* include?: 是否包含指定元素
* index: 元素索引位置
* insert: 指定位置添加元素
* inspect, to_s: 转换为字符串
* join: 将数组按指定符号连接成字符串
* length: 数组元素个数
* pop: 移除最后一个元素
* push: 向最后添加元素
* replace: 替换成指定数组元素
* reverse: 数组元素倒转
* shuffle: 元素洗牌
* slice: 切出指定元素
* sort: 排序
* take: 选出前n个元素
* uniq: 把重复元素去掉
* unshift: 在数组第一个元素前添加元素


1.返回字符串的长度 (length)

str.length => integer


2.判断字符串中是否包含另一个串 (include?)

str.include? other_str => true or false

"hello".include? "lo" #=> true

"hello".include? "ol" #=> false

"hello".include? ?h #=> true

 

3.字符串插入 (insert)

str.insert(index, other_str) => str

"abcd".insert(0, 'X') #=> "Xabcd"

"abcd".insert(3, 'X') #=> "abcXd"

"abcd".insert(4, 'X') #=> "abcdX"

"abcd".insert(-3, 'X') #=> "abXcd"

"abcd".insert(-1, 'X') #=> "abcdX"

 

4.字符串分割,默认分隔符为空格 (split)

str.split(pattern=$;, [limit]) => anArray

" now's the time".split #=> ["now's", "the", "time"]

"1, 2.34,56, 7".split(%r{,\s*}) #=> ["1", "2.34", "56", "7"]

"hello".split(//) #=> ["h", "e", "l", "l", "o"]

"hello".split(//, 3) #=> ["h", "e", "llo"]

"hi mom".split(%r{\s*}) #=> ["h", "i", "m", "o", "m"]

"mellow yellow".split("ello") #=> ["m", "w y", "w"]

"1,2,,3,4,,".split(',') #=> ["1", "2", "", "3", "4"]

"1,2,,3,4,,".split(',', 4) #=> ["1", "2", "", "3,4,,"]

 

5.字符串替换 (gsub, replace)

str.gsub(pattern, replacement) => new_str

str.gsub(pattern) {|match| block } => new_str

"hello".gsub(/[aeiou]/, '*') #=> "h*ll*" #将元音替换成*号

"hello".gsub(/([aeiou])/, '') #=> "h<e>ll<o>" #将元音加上尖括号,\1表示保留原有字符???

"hello".gsub(/./) {|s| s[0].to_s + ' '} #=> "104 101 108 108 111 "字符串替换二:

str.replace(other_str) => str

s = "hello" #=>"hello"

s.replace "world" #=>"world"

 

6.字符串删除 (delete)

str.delete([other_str]+) => new_str

"hello".delete "l","lo" #=> "heo"

"hello".delete "lo" #=> "he"

"hello".delete "aeiou", "^e" #=> "hell"

"hello".delete "ej-m" #=> "ho"

 

7.去掉前和后的空格 (lstrip)

str.lstrip => new_str

" hello ".lstrip #=> "hello "

"hello".lstrip #=> "hello"

 

8.字符串匹配str.match(pattern) => matchdata or nil

 

9.字符串反转 (reverse)

str.reverse => new_str

"stressed".reverse #=> "desserts"

 

10.去掉重复的字符 (squeeze)

str.squeeze([other_str]*) => new_str

"yellow moon".squeeze #=> "yelow mon" #默认去掉串中所有重复的字符

" now is the".squeeze(" ") #=>" now is the" #去掉串中重复的空格

"putters shoot balls".squeeze("m-z") #=> "puters shot balls" #去掉指定范围内的重复字符

 

11.转化成数字 (to_i)

str.to_i=&gt; str "12345".to_i #=> 12345


12.chomp和chop的区别:chomp:去掉字符串末尾的\n或\r chop:去掉字符串末尾的最后一个字符,不管是\n\r还是普通字符"hello".chomp #=> "hello"

"hello\n".chomp #=> "hello"

"hello\r\n".chomp #=> "hello"

"hello\n\r".chomp #=> "hello\n"

"hello\r".chomp #=>"hello"

"hello".chomp("llo") #=>"he"

"string\r\n".chop #=> "string"

"string\n\r".chop #=> "string\n"

"string\n".chop #=> "string"

"string".chop #=> "strin"

"x".chop.chop #=> ""</o></e>

---
layout: post
title: 方法规则
category: ruby
description: Ruby
disqus: false
---

## 方法返回值
* 如果return后面没有任何表达式，返回值为nil。
* 方法的最后一行可以省略return关键字。
* 方法可以返回多个值，显式使用return语句，并把返回值用逗号隔开；或者直接用一个数组作为返回值(并行赋值时采用这种方法定义)。


## 单键方法
* 在def关键字后加上一个求值结果为对象的表达式，表达式之后一个句点符号和要定义的方法名。


## 方法名
* 通常以小写字母打头，超过一个单词使用下划线。
* 命名习惯1：方法名以问号结尾表示一个判断的方法，通常返回true或false。
* 命名习惯2：方法名以感叹号结尾，比如Array对象又一个sort方法，这个方法产生一个该数组的拷贝，然后在这个拷贝上进行排序；还有一个sort！方法，它对这个数组本身排序。


## 方法别名
* alias aka also_known_as，执行完后，aka标示符与also_known_as引用同一方法(可为一个方法增加新的功能)。


## 参数默认值
* 在参数名后加入等号和默认值。(参数默认值可以是常量，表达式，实例变量的引用，前面定义参数的引用)
	def prefix(s, len=1)
		s[0,len]
	end


## 可变长度参数列表和数组(*,&在参数列表中只能有一个)
* 接收任意参数，在参数前加*符：(*打头的参数要放在带有默认值参数的后面，其后可以再指定普通参数，但该普通参数需要放在&打头参数之前，&参数必须在最后)。
	def max(first, *rest)
		max = first
		rest.each { |x| max = x if x > max }
		max
	end



## 代码块参数
* yield方式：
	def s(n, m, c)
		i = 0
		while(i < n)
			yield i*m+c
			i += 1
		end
	end

	s(5,3,3) {|x| puts x}
* Proc的call方式：
	def s(n, m, c，&b)
		i = 0
		while(i < n)
			b.call(i*m+c)
			i += 1
		end
	end
	s(5,3,3) {|x| puts x}


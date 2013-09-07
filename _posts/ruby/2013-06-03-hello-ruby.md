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


## 单键方法(给单个对象添加一个方法，与类方法差不多)
* 在def关键字后加上一个求值结果为对象的表达式，表达式之后一个句点符号和要定义的方法名。


## 方法名
* 通常以小写字母打头，超过一个单词使用下划线。
* 命名习惯1：方法名以问号结尾表示一个判断的方法，通常返回true或false。
* 命名习惯2：方法名以感叹号结尾，比如Array对象又一个sort方法，这个方法产生一个该数组的拷贝，然后在这个拷贝上进行排序；还有一个sort！方法，它对这个数组本身排序。


## 方法别名
* alias aka also_known_as，执行完后，aka标示符与also_known_as引用同一方法(可为一个方法增加新的功能)。
* 当新方法被重新定义时，老方法不会改变，这个特性可以用来使用环绕别名的技巧:   
   
   1. 给方法定义一个别名。      
   2. 重定义这个方法。   
   3. 在新的方法中定义老的方法。   


## 参数默认值
	在参数名后加入等号和默认值。
	(参数默认值可以是常量，表达式，实例变量的引用，前面定义参数的引用)   
	def prefix(s, len=1)   
		s[0,len]   
	end   


## 可变长度参数列表和数组(*,&在参数列表中只能有一个)
	接收任意参数，在参数前加*符：(打头的参数要放在带有默认值参数的后面，
	其后可以再指定普通参数，但该普通参数需要放在&打头参数之前，&参数必须在最后)。   

	def max(first, *rest)   
		max = first   
		rest.each { |x| max = x if x > max }   
		max   
	end   



## 代码块参数
  yield方式:    

	def s(n, m, c)   
		i = 0   
		while(i < n)   
			yield i*m+c   
			i += 1   
		end   
	end    
	s(5,3,3) {|x| puts x}   

  Proc的call方式:   
  
	def s(n, m, c，&b)   
		i = 0   
		while(i < n)   
			b.call(i*m+c)   
			i += 1   
		end   
	end   
	s(5,3,3) {|x| puts x}   


## 动态调用方法   
* 使用send：obj.send(:method, 3) ，第一个参数为方法名，剩下的参数直接传递给调用的方法。还有public_send()，前者可以调用私有方法。   

## 动态定义方法(使用 define_method )    
  事例代码:   

	class MyClass   
		define_method :my_method do |my_arg|   
			my_arg * 3   
		end   
	end   

	obj = MyClass.new   
	obj.my_method(2)   # => 6     













---
layout: post
title: Lambda和Proc的区别
category: ruby
description: Ruby
disqus: false
---

* proc的行为与代码块类似，而lambda的行为则与方法类似，它们都是Proc类的实例。用block，用lambda，不要用proc，让proc做好自己的幕后工作就好了(一般block可以代替proc)。

* lambda的 succ = lambda { |x| x+1 } 可以写成 succ = ->(x) { x+1 }

## 代码块，proc和lambda中的return语句。
	在一个代码块中的return语句不仅仅会从调用代码块的迭代器返回，
	它还会从调用迭代器的方法返回。

```ruby
	def text
		puts "ss"
		1.times { puts "aa"; return } (使text方法返回)
		puts "xxx" (没有执行)
	end
	text


	proc与代码块类似。

	def text
		puts "ss"
		p = Proc.new { puts "aa"; return }
		p.call     (调用proc使方法返回)
		puts "xxx" (没有执行)
	end
	text

	def procBuilder(message)
		Proc.new { puts message; return }
	end
	def text
		puts "ee"
		p = procBuilder("ss")
		p.call   (打印ss和LocalJumpError)
		puts "aa"  (没有执行)
	end
	text

```

	lambda的return语句仅从lambda自身返回，而不会从产生lambda的方法中返回。

```ruby

	def text
		puts "ss"
		p = lambda { puts "aa"; return }
		p.call    (调用lambda但不使方法返回)
		puts "xxx" (执行)
	end
	text

	def lambdaBuilder(message)
		lambda { puts message; return }
	end
	def text
		puts "ee"
		l = lambdaBuilder("ss")
		l.call   (打印ss)
		puts "aa"  (执行)
	end
	text
```

## 代码块，proc和lambda中的break语句。
	代码块中break语句的行为: 它使该代码块返回到它的迭代器，然后该迭代器再返回
	到调用它的方法。用Proc.new创建一个proc时，这个Proc.new就是break语句返
	回的地方，所以以下代码不正确:

```ruby
	def text
		puts "ss"
		proc = Proc.new { puts "aa"; break }
		proc.call    (LocalJumpError: iterator has already returned)
		puts "xxx"
	end
	text

	通过迭代器方法的&参数方式创建proc，可以调用它让迭代器方法返回:

	def iterator(&proc)
		puts "ss"
		proc.call
		puts "aa"  (没有执行)
	end

	def text
		iterator { puts "xx"; break }
	end
	text

	lambda类似方法，不出现在循环或迭代方法中则break行为类似return:

	def test
		puts "ss"
		lambda = lambda { puts "aa"; break; puts "xx" }
		lambda.call
		puts "xxx"
	end
	test
```

## 传递给proc和lambda的参数。
	lambda对参数有着严谨的检查，需要参数一致。proc则不需要。

	调用proc使用的是yield语意:

```ruby
	p = Proc.new { |x,y| print x,y }
	p.call(1)         # Prints 1nil
	p.call(1,2)		  # Prints 12
	p.call(1,2,3)	  # Prints 12
	p.call([1,2])	  # Prints 12
```

	proc处理参数可以抛弃多余参数，将nil赋给遗漏参数，拆开数组，
	当需要单个参数时可以把多个参数打包成数组。

	lambda则必须声明同样多的参数对它进行调用:

```ruby
	l = lambda { |x,y| print x,y }
	l.call(1,2)		 # 正常
	l.call(1)		 # Wrong number of arguments
	l.call(1,2,3)	 # Wrong number of arguments
	l.call([1,2])	 # Wrong number of arguments
	l.call(*[1,2])	 # 显式实现将数组解开
```





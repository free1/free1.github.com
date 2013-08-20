---
layout: post
title: 操作符和表达式
category: ruby
description: Ruby
disqus: false
---

## 未初始化的变量:

* 类变量(@@):        
	必须初始化，否则抛出NameError。      
* 实例变量(@):       
	引用未被初始化的实例变量会返回nil。
* 全局变量($):        
	同实例变量。
* 局部变量(下划线或小写字符开头):        
	如果未初始化，先去寻找有无这个名字的方法，没有就会抛出NameError。         
	一个古怪的行为:        
	`a = 0.0 if false`     _# 未执行_                    
	`print a`              _# 输出 nil_                
	`print b`			   _# NameError_                

## 常量引用(以大写字母开头，一般都是大写字母并使用下划线分割单词):
*	常量可以是复合表达式，用::将常量名和定义它的类或模块名分隔开，左侧操作数可以省略(将在全局域中查找右侧常数)。

## 展开操作符:    
	一个右值以*开头，代表是一个数组(或类似数组的对象):          
	x, y, z = 1, *[2,3]        就像 x,y,z = 1,2,3   

	左值出现*(只能出现一次*)，定义可展开类型可以使用`to_splat`方法。    
	x, *y = 1,2,3            输出:x=1;y=[2,3]     
	x, *y = 1,2              输出:x=1;y=[2]       
	x, *y = 1                输出:x=1;y=[]     
	Ruby 1.9 以上    
	*x, y = 1,2,3            输出:x=[1,2];y=3        
	*x, y = 1,2              输出:x=[1];y=2       
	*x, y = 1                输出:x=[]; y=1       

	x, y, *z = 1, *[2,3,4]   输出:x=1,y=2;z=[3,4]   

## 并行赋值中有圆括号的例子:
	x,y,z = 1,[2,3]          输出:x=1;y=[2,3];z=nil   
	x,(y,z) = 1,[2,3]        输出:x=1;y=2;z=3   
	a,b,c,d = [1,[2,[3,4]]]          输出:a=1;b=[2,[3,4]];c=nil    
	a,(b,(c,d)) = [1,[2,[3,4]]]       输出:a=1;b=2;c=3;d=4   

## ruby特有常用操作符:   
	**     求幂运算     
	<<     添加     
	=~     模式匹配(正则)   
	<=>    比较(左操作数小返回－1，大返回＋1，相等返回0，不可比较返回nil)   
	==     测试两个不同对象是否拥有同样的值   
	equal?方法   测试两个值是否引用同一对象   
	===    条件相等性操作符，一般被case语句隐式使用
	..     范围(包括右边的结束值)   
	...    范围(不包括右边的结束值)    
    defined?    测试变量的定义和类型   




















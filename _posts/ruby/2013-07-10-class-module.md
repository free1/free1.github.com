---
layout: post
title: 类，模块，闭包
category: ruby
description: Ruby
disqus: false
---

## 区别Ruby的require,load,和include
相同之处：三者均在kernel中定义的，均含有包含进某物之意。
不同之处：
1、requre,load用于文件，如.rb等等结尾的文件。
2、include则用于包含一个文件(.rb等结尾的文件)中的模块。
3、requre一般情况下用于加载库文件，而load则用于加载配置文件。
4、requre加载一次，load可加载多次。
(每当类包含一个模块时，该模块会被插入到祖先链中，位置在该类的正上方｛include两个模块时，上面的更接近根类｝)


## include与extend区别
在一个class中include一个模块的时候，模块方法将作为类实例方法，而extend模块的时候，模块方法会作为类方法。


## 不同情况选择类或者模块
* 希望它应该在别处被包含(include)时(或者当成命名空间)，使用模块。
* 希望它被实例化或者继承时，使用类。


## 对象和类
* 对象就是一组实例变量外加一个指向其类的引用。
* 类就是一个对象(Class类的一个实例)外加一组实例方法和一个对其超类的引用。Class类是Module类的子类，因此一个类也是一个模块。
* 实例变量(存放)在对象中，而方法(存放)在类中。
* 同一个类的对象共享同样的方法，但不共享实例变量的原因：一个对象的实例变量存在于对象本身，而一个对象的方法存在于对象自身的类。


## 创建类方法

```ruby
# 1
class Rubyist
  def self.who
    "Geek"
  end
end

# 2
class Rubyist
  class << self
    def who
      "Geek"
    end
  end
end

# 3
class Rubyist
end
def Rubyist.who
  "Geek"
end

#4
class Rubyist
end
Rubyist.instance_eval do
  def who
    "Geek"
  end
end
puts Rubyist.who # => Geek

# 5
class << Rubyist
  def who
    "Geek"
  end
end
```


## 私有(private)方法
* 私有规则：如果调用方法的接收者不是你自己，则必须明确指明一个接受者。私有方法只能被隐含接收者调用。
* 调用规则：如果对象x和对象y都是同一个类的对象，x不能调用y的私有方法。但能够调用超类中的私有方法。


## public, private, protect 区别
* public 可以被任何实例对象调用，不存在访问控制；
* protected 可以被定义它的类和其子类访问，可以在类中或子类中指定给实例对象；
* private 可以被定义它的类和其子类访问，不能被实例对象调用。
* 方法默认都是公有的（initialize方法除外，它永远是私有的）。

事例代码:

```ruby
# 实例对象不能访问private/protected方法

class Person
  def talk
    puts "public :talk,将调用speak"
    speak
  end

  protected
    def speak
      laugh
    end

  private
    def laugh
      puts "private:laugh"
    end
end
p1=Person.new
p1.talk

#p1.speak 实例对象不能访问protected方法
#p1.laugh 实例对象不能访问private方法

puts "-----------------------------------------------------"

# 子类可以访问private/protected方法

class Person
  protected
    def speak
      "protected:speak"
    end
  private
    def laugh
      "private:laugh"
    end
end

class Student < Person
  def useLaugh
    puts laugh
  end
  def useSpeak
    puts speak
  end
end

p2=Student.new
p2.useLaugh # => private:laugh
p2.useSpeak # => protected:speak

puts "----------------------------------------------------"

# protected方法可以在类和子类中指定给实例对象,private方法不可以

class Person
  protected
    def speak
      "protected:speak "
    end

  private
    def laugh
      "private:laugh"
    end

  def useLaugh(another)
    puts another.laugh #这里错误，私有方法不能指定对象
  end

  def useSpeak(another)
    puts another.speak
  end
end
p1=Person.new
p2=Person.new
p2.useSpeak(p1) # => protected:speak

#p2.useLaugh(p1)
```

## 闭包概念
* 在ruby中，proc和lambda都是闭包。
* 闭包表示一个对象既是一个可调用的函数，同时也是绑定在这个函数上的一个变量。
* 当创建一个proc或lambda时，得到的Proc对象不仅包含了可执行的代码块，也绑定了代码块中所使用的全部变量。
* 代码块可以使用在其外定义的局部变量和方法参数。

```ruby
def m(data, n)
  data.collect { |x| x*n }
end

puts m([1,2,3], 2)     #2,4,6
#collect迭代器关联的代码块使用了方法参数n
```

* 当代码块变成一个proc或lambda，它还可以在方法已经返回后继续访问n。

```ruby
def m(n)
  lambda { |data| data.collect{|x| x*n} }
end
d = m(2)
puts d.call([1,2,3])     #2,4,6
#这个lambda在定义它的范围外被使用，称之为一个闭包，这个闭包封装了所绑定的方法参数n。
```

## 闭包和共享变量
* lambda或proc在创建时，动态绑定使用变量，运行时才去查找变量的值。
* 在同样范围内创建的lambda会共享变量。

```ruby
def ac(i=nil)
  v = i
  g = lambda { v }
  s = lambda { |x| v = x }
  return g,s
end

gX,sX = ac(0)
puts gX[]   #0
sX[10]
pust gX[]   #10
```

## 闭包与绑定
* Proc定义了binding的方法，调用后返回Binding对象，它表示该闭包所使用的绑定。

[闭包深入理解](http://www.ibm.com/developerworks/cn/linux/l-cn-closure/)
[跨越边界: 闭包](http://www.ibm.com/developerworks/cn/java/j-cb01097.html)
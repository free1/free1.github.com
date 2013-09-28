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

```
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

如果是public方法，可以被随便调用。     
如果是protect方法，只能被定义这个方法的类自己的对象和子类的对象访问。     
如果是private方法，只能被对象自己访问。     

## 类实例变量

```
class MyClass
    @my_var = 1

    def self.read
        @my_var
    end

    def write
        @my_var = 2
    end

    def read
        @my_var
    end
end

obj = MyClass.new
obj.write
obj.read               # => 2
MyClass.read           # => 1
```

以上两个实例变量分别属于不同的作用域，并属于不同的对象。一个变量定义于obj充当self的时刻，它是obj对象的实例变量；另一个定义于MyClass充当self的时刻，它是MyClass的实例变量－－也就是类的实例变量。类也是对象。   

类实例变量只是属于Class类对象的普通实例变量。类实例变量仅仅可以被类本身访问－－不能被类的实例或子类访问。

## 闭包
* 在ruby中，proc和lambda都是闭包。
* 闭包表示一个对象既是一个可调用的函数，同时也是绑定在这个函数上的一个变量。

[闭包深入理解](http://www.ibm.com/developerworks/cn/linux/l-cn-closure/)
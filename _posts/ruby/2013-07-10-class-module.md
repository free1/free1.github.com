---
layout: post
title: 类和模块
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


## 不同情况选择类或者模块   
* 希望它应该在别处被包含(include)时(或者当成命名空间)，使用模块。   
* 希望它被实例化或者继承时，使用类。   


## 对象和类   
* 对象就是一组实例变量外加一个指向其类的引用。   
* 类就是一个对象(Class类的一个实例)外加一组实例方法和一个对其超类的引用。Class类是Module类的子类，因此一个类也是一个模块。   
* 实例变量(存放)在对象中，而方法(存放)在类中。   
* 同一个类的对象共享同样的方法，但不共享实例变量的原因：一个对象的实例变量存在于对象本身，而一个对象的方法存在于对象自身的类。   


## 私有(private)方法   
* 私有规则：如果调用方法的接收者不是你自己，则必须明确指明一个接受者。私有方法只能被隐含接收者调用。      
* 调用规则：如果对象x和对象y都是同一个类的对象，x不能调用y的私有方法。但能够调用超类中的私有方法。   

## public, private, protect 区别   

如果是public方法，可以被随便调用。
如果是protect方法，可以被自己或者子类调用。
如果是private方法，只能被自己调用。 

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
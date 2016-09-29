---
layout: post
title: java常用设计模式
category: java
description: Java
disqus: false
---

## 工厂模式(创建时将声明类型抽象, 用工厂统一管理)
* 使用时统一了类型和调用者, 在工厂类中决定具体的对象
* 定义一个单独创建对象的方法, 由子类实现这个方法来创建具体类型的对象
* 类似的对象, 不能预见需要哪些类的实例
* 静态工厂模式例子:

```
创建接口:
public interface Sender {  
    public void Send();  
} 
实现接口的类:
public class SmsSender implements Sender {  
    @Override  
    public void Send() {  
        System.out.println("this is sms sender!");  
    }  
}  
public class MailSender implements Sender {  
    @Override  
    public void Send() {  
        System.out.println("this is mailsender!");  
    }  
}  
创建工厂:
public class SendFactory {  
    public static Sender produceMail(){  
        return new MailSender();  
    }  
    public static Sender produceSms(){  
        return new SmsSender();  
    }  
} 
使用:
public class FactoryTest {
    public static void main(String[] args) {      
        Sender sender = SendFactory.produceMail();  
        sender.Send();  
    }
} 
```

## 抽象工厂模式
* 类似工厂模式, 使用接口抽象工厂使其可以多个,

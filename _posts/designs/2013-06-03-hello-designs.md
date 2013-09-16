---
layout: post
title: 常用布局问题
category: designs
description: CSS
disqus: false
---

body 中加入 font-family: 'Helvetica Neue', Arial, 'liberation Sans', FreeSans, 'Hiragino Sans GB', sans-serif; 字体会从第一个开始往后寻找浏览器能够识别的字体。   

## 清除浮动:   

	1. 有多余的div   

        <div class="clear"></div>    
        在css中加入   
        .class{ clear: both; }    

    2. 支持ie6以上浏览器   

       <div class="news clear"></div>   
       .clear:after {
           content: ".";
           height: 0;
           visibility: hidden;
           display: block;
           clear: both;
       }
   

## 导航的常见设置:   
	ul { list-style: none; }   去掉前面的点   
	ul li { display: inline-block; }   导航横向排列(不要使用浮动)   

## 常用元素   
* 布局定位: position
* 列表属性: list-style ( ul ol li )   
* 内容溢出元素框时: overflow   
* 透明度: opacity   
* 指针形状: cursor   
* 堆叠顺序: z-index (哪些元素优先显示)   
* 过滤器: filter   

## css选择器优先级   

* 类别选择器 1 
* 标签选择器 1
* ID选择器 1
* 后代选择器 1    #links a{}
* 子选择器 2    #links>a{}
* 伪类选择器  1或2  a:hover{}
* 通用选择器 2  *{}   
* 群组选择器 1  p,a,li{}
* 相邻同胞选择器 2    h1 + p{}
* 属性选择器 2   abbr[title]{} or  p[title='app']{}
* 部分属性选择器  2 a[rel~="friend"]{}
* 开始字符属性选择器 3 a[rel^="friend"]{}
* 结束字符属性选择器 3 a[rel$="friend"]{}
* 通配符字符属性选择器 3 a[href*="some"]{}
* 语言属性选择器 2 html[lang|="en"]{}
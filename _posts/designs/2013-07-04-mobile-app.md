---
layout: post
title: 手机网页版设计
category: designs
description: Webapp
disqus: false
---

[CSS3 Media Queries 实现响应式设计](http://www.cnblogs.com/lhb25/archive/2012/12/04/css3-media-queries.html)

## 关闭电话号码自动识别

```
<meta name="format-detection" content="telephone=no" />
```


## viewport 设置适应移动设备屏幕大小
* viewport 虚拟窗口是在 meta 元素中定义的,其主要作用是设置 Web 页面适应移动 设备的屏幕大小。

```
<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0" />
```

该代码的主要作用是自定义虚拟窗口,并指定虚拟窗口 width 宽度为 device-width, 初始缩放比例大小为 1 倍,同时不允许用户使用手动缩放功能。

代码中的 content 属性内共定义三种参数。实际上 content 属性允许设置 6 种不同的 参数,分别如下:
width 指定虚拟窗口的屏幕宽度大小。   
height 指定虚拟窗口的屏幕高度大小。   
initial-scale 指定初始缩放比例。   
maximum-scale 指定允许用户缩放的最大比例。   
minimum-scale 指定允许用户缩放的最小比例。   
user-scalable 指定是否允许手动缩放。   
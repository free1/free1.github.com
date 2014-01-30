---
layout: post
title: CSS命名规范 
category: designs
description: CSS
disqus: false
---

[CSS命名规范](http://m.baidu.com/from=2001a/bd_page_type=1/ssid=0/uid=0/pu=usm%400%2Csz%401320_1003%2Cta%40iphone_2_2.3_1_9.2/baiduid=2F20914A35E1050EFC7EF9D09F3777FA/w=0_10_css%E6%8A%80%E5%B7%A7/t=iphone/l=3/tc?baiduid=40C0FB4B1EFD94F61D90BEE0DD96A9A1&ref=www_iphone&lid=12906289273515140470&vit=osres&m=8&srd=1&cltj=cloud_title&dict=21&sec=35908&di=cd1eab301cbf72e1&src=http%3A%2F%2Fwww.divcss5.com%2Fjiqiao%2Fj4.shtml)   

头：header　　   
内容：content/container　　   
尾：footer　　   
导航：nav　　   
侧栏：sidebar   
栏目：column　　   
页面外围控制整体布局宽度：wrapper　　   
左右中：left right center　　   
登录条：loginbar　　   
标志：logo　　   
广告：banner　　   
页面主体：main　　   
热点：hot　　   
新闻：news   
下载：download　　   
子导航：subnav　　   
菜单：menu　　   
子菜单：submenu　　   
搜索：search　　   
友情链接：friendlink　　   
页脚：footer　　   
版权：copyright　　   
滚动：scroll　　   
内容：content   
标签页：tab   
文章列表：list   
提示信息：msg   
小技巧：tips   
栏目标题：title   
加入：joinus   
指南：guild   
服务：service   
注册：regsiter   
状态态：status   
投票：vote   
合作伙伴：partner   

注释的写法   

/* Footer */   
内容区   
/* End Footer */   

id的命名   
容器: container   
页头：header   
内容：content/container   
页面主体：main   
页尾：footer   
导航：nav   
侧栏：sidebar   
栏目：column   
页面外围控制整体布局宽度：wrapper   
左右中：left right center   


id的命名   

页面结构    

容器: container   
页头：header   
内容：content/container   
页面主体：main   
页尾：footer   
导航：nav   
侧栏：sidebar   
栏目：column   
页面外围控制整体布局宽度：wrapper   
左右中：left right center   

导航   

导航：nav   
主导航：mainbav   
子导航：subnav   
顶导航：topnav   
边导航：sidebar   
左导航：leftsidebar   
右导航：rightsidebar   
菜单：menu   
子菜单：submenu   
标题: title    
摘要: summary    

功能   
标志：logo   
广告：banner   
登陆：login   
登录条：loginbar   
注册：regsiter   
搜索：search   
功能区：shop   
标题：title   
加入：joinus   
状态：status   
按钮：btn   
滚动：scroll   
标签页：tab   
文章列表：list   
提示信息：msg   
当前的: current   
小技巧：tips   
图标: icon   
注释：note   
指南：guild   
服务：service   
热点：hot   
新闻：news   
下载：download   
投票：vote   
合作伙伴：partner   
友情链接：link   
版权：copyright   

class的命名   

(1)颜色:使用颜色的名称或者16进制代码,如   
.red { color: red; }   
.f60 { color: #f60; }   
.ff8600 { color: #ff8600; }   
   
(2)字体大小,直接使用"font+字体大小"作为名称,如   
.font12px { font-size: 12px; }   
.font9pt {font-size: 9pt; }   

(3)对齐样式,使用对齐目标的英文名称,如   

.left { float:left; }   
.bottom { float:bottom; }   

(4)标题栏样式,使用"类别+功能"的方式命名,如   
.barnews { }   
.barproduct { }   

注意事项

1.一律小写;   
2.尽量用英文;   
3.不加中杠和下划线;   
4.尽量不缩写，除非一看就明白的单词.   
主要的 master.css   
模块 module.css   
基本共用 base.css   
布局，版面 layout.css   
主题 themes.css   
专栏 columns.css   
文字 font.css   
表单 forms.css   
补丁 mend.css   
打印 print.css   
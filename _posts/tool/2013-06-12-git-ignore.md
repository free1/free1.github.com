---
layout: post
title: gitignore文件没有生效
category: tool
description: 版本控制
disqus: false
---

当gitigonre文件是commit以后才加(修改)的   

从索引中删除:   
git rm -r --cached .   

执行:    
git add .   

提交:    
git commit -m ".gitignore is now working"   



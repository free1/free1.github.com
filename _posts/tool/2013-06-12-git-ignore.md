---
layout: post
title: git常见问题
category: tool
description: 版本控制
disqus: false
---

## 当gitigonre文件是commit以后才加(修改)的   

```
从索引中删除:   
git rm -r --cached .   
执行:    
git add .   
提交:    
git commit -m ".gitignore is now working"   
```


## 更新.gitignore文件目标文件没删掉时          
`git update-index --assume-unchanged config/database.yml`


## error: Your local changes to the following files would be overwritten by merge:

```
git reset --hard
git pull
```


## 提交到代码库的代码回滚

```
取消当前版本之前的两次提交:
git reset --hard HEAD~2       
强制提交到远程版本库,删除之前的两次提交数据: 
git push origin HEAD --force 
or
git revert <SHA>
git push
```


## [删除远程仓库的错误提交](https://help.github.com/articles/remove-sensitive-data/)
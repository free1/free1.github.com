---
layout: post
title: typescript基础
category: javascript
description: Javascript
disqus: false
---

## 问题汇总
* [Duplicate identifier问题的解决](https://www.jianshu.com/p/2c24577fc50b)
  解决方案是在tsconfig.json的compilerOption中加入下面两项：
  ```
  "skipLibCheck": true,
  "allowSyntheticDefaultImports": true
  ```


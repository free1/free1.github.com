---
layout: post
title: 常见错误
category: notes
description: 笔记
disqus: false
---

[An error occurred while installing libv8 (3.16.14.3), and Bundler cannot continue.](http://stackoverflow.com/questions/22481435/fix-therubyracer-libv8-0-12-1-installation-on-mavericks)

* brew install v8
* gem install libv8 -v '3.16.14.3' -- --with-system-v8
* rm gemfile.lock
* bundle

[mac修改host文件](http://www.douban.com/group/topic/7726277/)
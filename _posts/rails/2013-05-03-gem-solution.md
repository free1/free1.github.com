---
layout: post
title: Gem使用常见问题
category: rails
description: Rails
disqus: false
---


## 全文搜索[Sunspot](https://github.com/sunspot/sunspot) 出现 RSolr::Error::Http - 500 Internal Server Error 解决方法:

log:   

RSolr::Error::Http - 500 Internal Server Error   
Error: Severe errors in solr configuration.   

Check your log files for more detailed information on what may be wrong.   

If you want solr to continue after configuration errors, change:    

 `<abortOnConfigurationError>false</abortOnConfigurationError>`  

in null   


The solution:   

*   rake sunspot:solr:stop  
*   Delete your /solr directory.
*   rake sunspot:solr:start
*   rake sunspot:solr:reindex


## 使用rvm安装gem出现权限错误 

* 1. 命令 gem install sqlite3
错误：ERROR:  While executing gem ... (Errno::EACCES)
    Permission denied - /Users/free/.rvm/gems/ruby-1.9.3-p327/cache/sqlite3-1.3.6.gem

解决方法：chown -R free ~/.rvm，然后再安装，sudo gem install sqlite3。


## gem libv8 install 出错

[therubyracer installation on windows with libv8 installed --with-system-v8](http://stackoverflow.com/questions/19126019/therubyracer-installation-on-windows-with-libv8-installed-with-system-v8)

---
layout: post
title: Gem使用常见问题
category: ruby
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

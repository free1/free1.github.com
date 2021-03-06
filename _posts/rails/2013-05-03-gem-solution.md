---
layout: post
title: Gem使用常见问题
category: rails
description: Rails
disqus: false
---

## rake

* [invalid byte sequence in US-ASCII](https://ruby-china.org/topics/19564)

```
将下面一行添加到.bashrc 就ok了
export RUBYOPT="-U -Ku -E utf-8:utf-8"

更新
source ~/.bashrc
```


## simple-form

`<%= f.input :is_private, as: :select, label: false, include_blank: false, priority: ["public", "仅团队成员可见"], collection: [["仅团队成员可见", "true"], ["公开可见", "false"]], label_html: { class: "select optional" } %>`   


## whenever

* You will have to execute
`whenever -i`
to add the jobs to crontab

* crontab -l


## sphinx

* mysql连不上
`rake ts:configure ts:restart`


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

## Sunspot

* sunspot等需要java环境，快速安装。

```
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java7-installer

bundle exec rake sunspot:solr:start
```

* mac install java

```
brew tap caskroom/cask
brew install brew-cask
brew cask install java
```


## 使用rvm安装gem出现权限错误 

* 1. 命令 gem install sqlite3
错误：ERROR:  While executing gem ... (Errno::EACCES)
    Permission denied - /Users/free/.rvm/gems/ruby-1.9.3-p327/cache/sqlite3-1.3.6.gem

解决方法：chown -R free ~/.rvm，然后再安装，sudo gem install sqlite3。


## gem libv8 install 出错

[therubyracer installation on windows with libv8 installed --with-system-v8](http://stackoverflow.com/questions/19126019/therubyracer-installation-on-windows-with-libv8-installed-with-system-v8)   
`gem install libv8 -v 3.16.14.3 -- --with-system-v8`



## rails s 出错

[rails s](http://stackoverflow.com/questions/17645041/why-doesnt-rails-s-work-from-the-app-directory)


## [An error occurred while installing libv8 (3.16.14.3), and Bundler cannot continue.](http://stackoverflow.com/questions/22481435/fix-therubyracer-libv8-0-12-1-installation-on-mavericks)
* brew install v8
* gem install libv8 -v '3.16.14.3' -- --with-system-v8
* rm gemfile.lock
* bundle


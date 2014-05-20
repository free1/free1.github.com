---
layout: post
title: Rails中使用缓存
category: rails
description: Rails
disqus: false
---

* [Rails中使用缓存：概述](http://guides.ruby-china.org/caching_with_rails.html)
* [Scaling Rails – 第八章 Memcached](http://wp.xdite.net/?p=1029)
* [Advanced Caching in Rails](http://hawkins.io/2011/05/advanced_caching_in_rails/)
* [屌丝程序员如何打造日PV百万的网站架构](https://speakerdeck.com/shiningray/diao-si-cheng-xu-yuan-ru-he-da-zao-ri-pvbai-mo-de-wang-zhan-jia-gou)
* [如何使用 memcached 做快取](http://ihower.tw/blog/archives/1768)
* [MAC OSX 环境下搭建 memcached 环境](http://www.blogways.net/blog/2013/05/01/demo-libmemcached-at-mac.html)
* [总结 web 应用中常用的各种 cache](http://ruby-china.org/topics/19389)
* [Varnish缓存服务器配置](http://www.360doc.com/content/10/1026/11/737570_64093653.shtml#)
* [Web应用的缓存设计模式](http://robbinfan.com/blog/38/orm-cache-sumup)

## 总结 web 应用中常用的各种 cache

总结web应用中常用的各种cache   

cache是提高应用性能重要的一个环节，写篇文章总结一下用过的各种对于动态内容的cache。
文章以Nginx，Rails，Mysql，Redis作为例子，换成其他web服务器，语言，数据库，缓存服务都是类似的。
以下是3层的示意图，方便后续引用： 

* 客户端缓存   
一个客户端经常会访问同一个资源，比如用浏览器访问网站首页或查看同一篇文章，或用app访问同一个api，如果该资源和他之前访问过的没有任何改变，就可以利用http规范中的304 Not Modified 响应头([http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.5](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.5))，直接用客户端的缓存，而无需在服务器端再生成一次内容。   
在Rails里面内置了`fresh_when`这个方法，一行代码就可以完成：   

```
class ArticlesController
  def show
    @article = Article.find(params[:id])
    fresh_when :last_modified => @article.updated_at.utc, :etag => @article
  end
end
```
下次用户再访问的时候，会对比request header里面的If-Modified-Since和If-None-Match，如果相符合，就直接返回304，而不再生成response body。   

但是这样会遇到一个问题，假设我们的网站导航有用户信息，一个用户在未登陆专题访问了一下，然后登陆以后再访问，会发现页面上显示的还是未登陆状态。或者在app访问一篇文章，做了一下收藏，下次再进入这篇文章，还是显示未收藏状态。解决这个问题的方法很简单，将用户相关的变量也加入到etag的计算里面：   

```
fresh_when :etag => [@article.cache_key, current_user.id]
fresh_when :etag => [@article.cache_key, current_user_favorited]
```

另外提一个坑，如果nginx开启了gzip，对rails执行的结果进行压缩，会将rails输出的etag header干掉，nginx的开发人员说根据rfc规范，对`proxy_pass`方式处理必须这样（因为内容改变了），但是我个人认为没这个必要，于是用了粗暴的方法，直接将`src/http/modules/ngx_http_gzip_filter_module.c`这个文件里面的这行代码注释掉，然后重新编译nginx：   

```
  //ngx_http_clear_etag(r);
```

或者你可以选择不改变nginx源代码，将gzip off掉，将压缩用Rack中间件来处理：   

```
config.middleware.use Rack::Deflater
```

除了在controller里面指定`fresh_when`以外，rails框架默认使用`Rack::ETag middleware`，它会自动给无etag的response加上etag，但是和`fresh_when`相比，自动etag能够节省的只是客户端时间，服务器端还是一样会执行所有的代码，用curl来对比一下。   

`Rack::ETag`自动加入etag：   

```
curl -v http://localhost:3000/articles/1
< Etag: "bf328447bcb2b8706193a50962035619"
< X-Runtime: 0.286958
curl -v http://localhost:3000/articles/1 --header 'If-None-Match: "bf328447bcb2b8706193a50962035619"'
< X-Runtime: 0.293798
```

用`fresh_when`：   

```
curl -v http://localhost:3000/articles/1 --header 'If-None-Match: "bf328447bcb2b8706193a50962035619"'
< X-Runtime: 0.033884
```

* Nginx缓存   
有一些资源可能会被调用很多，又无关用户状态，并且很少改变，比如新闻app上的列表api，购物网站上ajax请求分类菜单，可以考虑用Nginx来做缓存。   
主要有2种实现方法：   
A. 动态请求静态文件化   
在rails请求完成以后，将结果保存成静态文件，后续请求就会直接由nginx提供静态文件内容，用`after_filter`来实现一下：   

```
class CategoriesController
  after_filter :generate_static_file, :only => [:index]

  def index
    @categories = Category.all
  end

  def generate_static_file
    File.open(Rails.root.join('public', 'categories'), 'w') do |f|
      f.write response.body
    end
  end
end
```
另外我们需要在任何分类更新的时候，删除掉这个文件，避免缓存不刷新的问题： 

```
class Category < ActiveRecord::Base
  after_save :delete_static_file
  after_destroy :delete_static_file

  def delete_static_file
    File.delete Rails.root.join('public', 'categories')
  end
end
```

Rails 4之前，处理这种生成静态文件缓存可以用内置的`caches_page`， rails 4之后变成了一个独立`gem actionpack-page_caching`，和手工代码对比一下，   

```
class CategoriesController < ActionController::Base
  caches_page :index

  def update
    #...
    expire_page action: 'index'
  end
end
```

如果只有一台服务器，这个方法简单又实用，但是如果有多台服务器，就会出现更新分类只能刷新自己本身这台服务器缓存的问题，可以用nfs来共享静态资源目录解决，或者用第2种：   

B. 静态化到集中缓存服务   
首先我们得让Nginx有直接访问缓存的能力：   

```
upstream redis {
    server redis_server_ip:6379;
  }

  upstream ruby_backend {
    server unicorn_server_ip1 fail_timeout=0;
    server unicorn_server_ip2 fail_timeout=0;
  }

  location /categories {
    set $redis_key $uri;
    default_type   text/html;
    redis_pass redis;
    error_page 404 = @httpapp;
  }

  location @httpapp {
    proxy_pass http://ruby_backend;
  }
```

Nginx首先会用请求的uri作为key去redis里面获取，如果获取不到（404）就转发给unicorn进行处理，然后改写`generate_static_file`和`delete_static_file`方法：   

```
  redis_cache.set('categories', response.body)
  redis_cache.del('categories')
```
这样除了集中管理以外，还能够设置缓存的失效时间，对于一些更新无时效性要求的数据，就可以不用处理刷新机制，简单地固定时间刷新一次：   

```
  redis_cache.setex('categories', 3.hours.to_i, response.body)
```

* 整页缓存   
Nginx缓存在处理带参数资源或者有用户状态的请求时候，就非常难以处理，这个时候可以用到整页缓存。   
比如说分页请求列表，我们可以将page参数加入到cache_path：      

```
class CategoriesController
  caches_action :index, :expires_in => 1.day, :cache_path => proc {"categories/index/#{params[:page].to_i}"}
end
```

比如说我们只需要针对rss输出进行缓存8小时：   

```
class ArticlesController
  caches_action :index, :expires_in => 8.hours, :if => proc {request.format.rss?}
end
```

再比如说对于非登陆用户，我们可以缓存首页：   

```
class HomeController
  caches_action :index, :expires_in => 3.hours, :if => proc {!user_signed_in?}
end
```

* 片段缓存   
如果说前面2种缓存能够用到的场景有限，那么片段缓存是适用性最广的。     

场景1：我们需要在每个页面一段广告代码，用来显示不同广告，如果没有使用片段缓存，那么每个页面都会要去查询广告的代码，并且花费一定时间去生成html代码：   

```
- if advert = Advert.where(:name => request.controller_name + request.action_name, :enable => true).first
  div.ad
    = advert.content
``` 

加了片段缓存以后，就可以少去这个查询：    

```
- cache "adverts/#{request.controller_name}/#{request.action_name}", :expires_in => 1.day do
  - if advert = Advert.where(:name => request.controller_name + request.action_name, :enable => true).first
    div.ad
      = advert.content
```

场景2：阅读文章，文章的内容可能比较长时间都不会改变，经常变化可能是文章评论，就可以对文章主体部分加上片段缓存：   

```
- cache "articles/#{@article.id}/#{@article.updated_at.to_i}" do
  div.article
    = @article.content.markdown2html
```


节约了生成markdown语法转换到html时间，这里用文章最后更新时间作为cache key的一部分，文章内容如果有改变，缓存自动失效，默认activerecord的`cache_key`方法也是用`updated_at`，你也可以加入更多的参数，比如article上有评论数的counter cache，更新评论数的时候不会更新文章时间，可以将这个counter也加入到key的一部分   

场景3：复杂页面结构的生成   
数据结构比较复杂的页面，在生成的时候避免不了大量的查询和html渲染，用片段缓存，可以将这部分时间大大地节约，以我们网站游记页面 http://chanyouji.com/trips/109123 （请允许小小地打个广告，带点流量）来说：   
需要获取天气数据，照片数据，文本数据等，同时还要生成meta，keyword等seo数据，而这些内容又是和其他动态内容交叉，片段缓存就可以分开多个：   

```
- cache "trips/show/seo/#{@trip.fragment_cache_key}", :expires_in => 1.day do
  title #{trip_name @trip}
  meta name="description" content="..."
  meta name="keywords" content="..."

body
  div
    ...
- cache "trips/show/viewer/#{@trip.fragment_cache_key}", :expires_in => 1.day do
  - @trip.eager_load_all
```

小贴士，我在trip对象里面加了一个`eager_load_all`方法，缓存没有命中的时候，查询的时候避免出现n+1问题：   

```
  def eager_load_all
    ActiveRecord::Associations::Preloader.new([self], {:trip_days => [:weather_station_data, :nodes => [:entry, :notes => [:photo, :video, :audio]]]}).run
  end
```

小技巧：带条件的片段缓存   
和`caches_action`不同，rails自带的片段缓存是不支持条件的，比如说我们想未登陆用户给他用片段缓存，而登陆用户不使用，写起来就很麻烦，我们可以改写一下helper就可以了：   

```
 def cache_if (condition, name = {}, cache_options = {}, &block)
    if condition
      cache(name, cache_options, &block)
    else
      yield
    end
  end

- cache_if !user_signed_in?, "xxx", :expires_in => 1.day do
```

* 数据查询缓存

* 数据库缓存
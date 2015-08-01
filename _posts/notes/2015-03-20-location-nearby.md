---
layout: post
title: 搜索
category: notes
description: search
disqus: false
---

## 附近的人(sunspot)

* [查找附近的xxx 球面距离以及Geohash方案探讨](http://www.wubiao.info/372)
* [微信、陌陌 架构方案分析](http://www.wubiao.info/401)
* [sunspot Geospatial](https://github.com/sunspot/sunspot)
* [sunspot简单使用](http://gogojimmy.net/2012/01/25/full-text-search-in-rails-with-solr/)
* [sunspot schema.xml](http://wiki.apache.org/solr/AnalyzersTokenizersTokenFilters)

## elasticsearch

* [简单使用](http://es.xiaoleilu.com/010_Intro/10_Installing_ES.html)
* 先安装java, mac 安装直接用homebrew
* linux: `sudo apt-get install -y openjdk-7-jre-headless` [安装](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-repositories.html)   
* 命令行基本命令   
打开:   
`elasticsearch --config=/usr/local/opt/elasticsearch/config/elasticsearch.yml`   
关闭:    
`curl -XPOST 'http://localhost:9200/_shutdown'`   
* [gem](https://github.com/elastic/elasticsearch-rails)  
建立索引:   
`Product.import force:true`   
`bundle exec rake environment elasticsearch:import:model CLASS:'Product' FORCE=y`   
搜索:    
`Product.search('xxx').results.map { |r| r._source }`   
`Product.search(query: {multi_match: {query: '裤', fields: ['title']}}).results.map { |r| r._source }`
```
Topic.search(
      query: {
        more_like_this: {
          fields: ['title', 'body'],
          like_text: title + '\n' + body
        }
      },
      filter: {
        and: [
          { term: { trashed: false } },
          { not: { term: { id: id } } }
        ]
      }
    ).limit(num).records.to_a rescue []
```
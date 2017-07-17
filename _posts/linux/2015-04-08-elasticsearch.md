---
layout: post
title: ElasticSearch
category: linux
description: 搜索
disqus: false
---

## [简单安装](https://www.elastic.co/downloads/elasticsearch)
* 安装java8:

```
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```
* 下载:  `wget elasticsearch-2.4.0.deb`
* 安装:  `sudo dpkg -i elasticsearch-2.4.0.deb`
* 放入init.d中:  `sudo update-rc.d elasticsearch defaults 95 10`
* 启动:  `sudo /etc/init.d/elasticsearch start`


## 基本概念
* 和关系型数据库区别

```
Relational DB(一般是以文档ID作为索引，以文档内容作为记录。) -> Databases(数据库) -> Tables(表) -> Rows(行) -> Columns(列)
Elasticsearch(倒排索引将单词或记录作为索引，将文档ID作为记录) -> Indices(索引)   -> Types(类型)  -> Documents(文档) -> Fields(字段)
```
* 分析器(analyzer)处理: 字符过滤器(字符过滤器能够去除HTML标记，或者转换"&"为"and"), 分词器, 标记过滤等


## 基本命令

* 查看es：`curl -XGET http://ip-172-31-15-169.cn-north-1.compute.internal:9200/products-production/product/_search?pretty`
* 关闭索引：`curl -X POST 'http://localhost:9200/products/_close'`
* 打开索引：`curl -X POST 'http://localhost:9200/products/_open'`
* 删除mapping：`curl -X DELETE 'http://localhost:9200/products/product/_mapping'`
* 更新数据：`curl -X PUT http://ip-172-31-15-169.cn-north-1.compute.internal:9200/products/product/1`
* 查看index: `http://localhost:9200/_cat/indices?pretty`


## 参考资料
* [分布式搜索技术](http://www.searchtech.pro/)
* [基本用法](http://es.xiaoleilu.com/030_Data/05_Document.html)

## [elasticsearch-rails]()
* 先建立索引(Model.__elasticsearch__.create_index! force: true)再导入数据(Model.import)


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

```
def as_indexed_json(options={})
    {
      title: title,
      product_categories:   product_categories.as_json(only: [:describe]),
      categories: categories.map(&:name)
    }
    # self.as_json(
    #   include: {
    #     product_details: {
    #       only: :describe
    #     }
    #   },
    #   categories: categories.map(&:name)
    # )
  end

  def as_indexed_json(options={})
    as_json(
      only: [:id, :full_name, :email],  # mysql字段
      include: [:phone_numbers],
      methods: [:full_name]  # 虚拟属性
    )
  end
```

```
search(
        query: {
          bool: {
            should: [
              {
                nested: {
                  path: 'product_details',
                  query: {
                    bool: {
                      must: [
                        { match: { 'product_details.describe' => q } }
                      ]
                    }
                  }
                }
              },
            filtered: {
              query: {
                multi_match: {
                  fields: ['title'],
                  query: q
                }
              },
              filter: {
                terms: {
                  categories: category.split
                }
              }
            }
          ]
        }
      })
```


```
module ArticleImport
  def self.import
    Article.includes(:author, :tags).find_in_batches do |articles|
      bulk_index(articles)
    end
  end

  def self.prepare_records(articles)
    articles.map do |article|
      { index: { _id: article.id, data: article.as_indexed_json } }
    end
  end

  def self.bulk_index(articles)
    Article.__elasticsearch__.client.bulk({
      index: ::Article.__elasticsearch__.index_name,
      type: ::Article.__elasticsearch__.document_type,
      body: prepare_records(articles)
    })
  end
end
```
---
layout: post
title: ElasticSearch
category: notes
description: db
disqus: false
---

## 基本命令

* 查看es：`curl -XGET http://ip-172-31-15-169.cn-north-1.compute.internal:9200/products-production/product/_search?pretty`
* 关闭索引：`curl -X POST 'http://localhost:9200/products/_close'`
* 打开索引：`curl -X POST 'http://localhost:9200/products/_open'`
* 删除mapping：`curl -X DELETE 'http://localhost:9200/products/product/_mapping'`
* 更新数据：`curl -X PUT http://ip-172-31-15-169.cn-north-1.compute.internal:9200/products/product/1`

## [elasticsearch-rails]()
* 先建立索引(Model.__elasticsearch__.create_index! force: true)再导入数据(Model.import)

* [简单搭建使用](http://www.cnblogs.com/lishouguang/p/4560930.html)

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
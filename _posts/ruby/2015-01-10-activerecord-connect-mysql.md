---
layout: post
title: activerecord链接数据库导数据
category: ruby
description: Ruby
disqus: false
---

* 代码例子

```ruby
#!/usr/bin/env ruby
require 'active_record'

class Product1 < ActiveRecord::Base
	self.table_name = "products"
	has_many :product_details1, class_name: 'ProductDetail1', foreign_key: 'product_id'

	db1_config = {
		:adapter  => "mysql2",
	  :encoding => 'utf8',
	  :host     => "54.223.188.18",
	  :username => "root",
	  :password => "password",
	  :database => "makehave_development"
	}

	establish_connection(db1_config)
end

class ProductDetail1 < ActiveRecord::Base
	self.table_name = 'product_details'
	belongs_to :product

	db1_config = {
		:adapter  => "mysql2",
	  :encoding => 'utf8',
	  :host     => "54.223.188.18",
	  :username => "root",
	  :password => "password",
	  :database => "makehave_development"
	}

	establish_connection(db1_config)
end

class Product2 < ActiveRecord::Base
	self.table_name = "products"
	validates :original_site_id, :uniqueness => true

	db2_config = {
		:adapter  => "mysql2",
	  :encoding => 'utf8',
	  :host     => "54.223.206.25",
	  :username => "root",
	  :password => "123",
	  :database => "makehave_development"
	}

	establish_connection(db2_config)
end

class ProductDetail2 < ActiveRecord::Base
	self.table_name = 'product_details'

	db2_config = {
		:adapter  => "mysql2",
	  :encoding => 'utf8',
	  :host     => "54.223.206.25",
	  :username => "root",
	  :password => "123",
	  :database => "makehave_development"
	}

	establish_connection(db2_config)
end

Product1.find_each.each do |product1|
	product2 = Product2.new
	product2.title = product1.name
	product2.original_site_id = product1.origin_id
	product2.source_site = "http://www.farfetch.com#{product1.item_url}"
	product2.images_path = product1.image_url
	product2.watch_count = 0
	product2.status = 1

	product1.product_details1.find_each do |product_details1|
		product_details2 = ProductDetail2.new
		product_details2.currency_kind = product_details1.currency_id
		product_details2.product_id = product_details1.product_id
		product_details2.price = product_details1.price

		if product2.save
			p 'product success'
			if product_details2.save
				p 'product_details success'
			else
				p 'product_details error'
			end
		else
			p 'product error'
		end
	end
end
```
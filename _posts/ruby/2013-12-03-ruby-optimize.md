---
layout: post
title: Ruby 优化技巧
category: ruby
description: Ruby
disqus: false
---

## 常用技巧总结
* 根据测定，发现瓶颈。
* 减少对象。
* 减少方法调用。
* 避开用ruby实现的方法。
* 使用立即值。
* 瓶颈部分使用C语言。
* 以空间换时间。
* 过早优化是万恶之源。

## [refactoring-ruby-with-monads](http://codon.com/refactoring-ruby-with-monads)

## [Ruby中的性能差异](http://ruby-china.org/topics/19207)
* Proc#call versus yield

```
require 'benchmark/ips'

def slow(&block)
  block.call
end

def fast
  yield
end

Benchmark.ips do |x|
  x.report("slow") { slow { 1 + 1 } }
  x.report("fast") { fast { 1 + 1 } }
end
```
```
slow   770263.8 (±4.8%) i/s -    3849832 in   5.010201s (5 秒钟可运行 3849832 次)
fast  3985294.7 (±8.7%) i/s -   19751563 in   5.001024s (5 秒钟可运行 19751563 次)
```

从上面的 benchmark 结果中可以看出两种写法的显著性能差异，这主要是因为第一种写法中要不断的创建 Proc 对象赋给 block 参数导致的。

* Enumerable#map and Array#flatten versus Enumerable#flat_map

```
def slow
  (1..50).map{ |i| i.divmod(7) }.flatten
end

def fast
  (1..50).flat_map{ |i| i.divmod(7) }
end
```
```
slow   32514.2 (±6.8%) i/s -     162134 in   5.014068s
fast    57858.6 (±7.3%) i/s -     292463 in   5.084633s
```

* Hash#merge versus Hash#merge! (bang methods, in general)

```
def slow
  (1..10).inject({}) { |h, e| h.merge(e => e) }
end

def fast
  (1..10).inject({}) { |h, e| h.merge!(e => e) }
end
```
```
slow    22054.4 (±6.3%) i/s -     110081 in   5.012558s
fast     75393.0 (±9.3%) i/s -     375577 in   5.028409s
```

* Hash#merge! versus Hash#[]=

```
def slow
  (1..10).inject({}) { |h, e| h.merge!(e => e) }
end

def fast
  (1..10).inject({}) { |h, e| h[e] = e; h }
end
```
```
slow    72613.7 (±9.9%) i/s -     364662 in   5.082934s
fast   158245.6 (±7.1%) i/s -     796005 in   5.056857s
```

* Hash#fetch with second argument versus Hash#fetch with block

```
def slow
  {:foo => :bar}.fetch(:foo, (1..10).to_a)
end

def fast
  {:foo => :bar}.fetch(:foo) { (1..10).to_a }
end
```
```
slow   412806.8 (±11.2%) i/s -    2037520 in   5.009145s
fast  1134439.1  (±8.1%) i/s -    5662160 in   5.027080s
```

* String#gsub versus String#sub

```
def slow
  'http://parley.rubyrogues.com/'.gsub(%r{\Ahttp://}, 'https://')
end

def fast
  'http://parley.rubyrogues.com/'.sub(%r{\Ahttp://}, 'https://')
end
```
```
slow   237660.4 (±5.0%) i/s -    1190664 in   5.023559s
fast   320335.6 (±5.1%) i/s -    1614839 in   5.055553s
```

* String#gsub versus String#tr

```
def slow
  'slug from title'.gsub(' ', '_')
end

def fast
  'slug from title'.tr(' ', '_')
end
```
```
slow   187349.7 (±6.8%) i/s -     933140 in   5.012634s
fast  1216071.5 (±8.9%) i/s -    6050762 in   5.024810s
```

* Parallel versus sequential assignment

```
def slow
  a, b = 1, 2
end

def fast
  a = 1
  b = 2
end
```
```
slow   189642.1 (±7.6%) i/s -     947520 in   5.031411s
fast  1180907.4 (±7.1%) i/s -    5872020 in   5.002410s
```

* Explicit versus implicit String concatenation

```
def slow
  "foo" + "bar"
end

def fast
  "foo" "bar"
end
```
```
slow  1998832.8 (±5.5%) i/s -    9974259 in   5.005887s
fast  3559754.8 (±6.8%) i/s -   17747928 in   5.012536s
```

* Using exceptions for control flow

```
def slow
  self.no_method
rescue NoMethodError
  "doh!"
end

def fast
  respond_to?(:no_method) ? self.no_method : "doh!"
end
```
```
slow   194665.7 (±10.9%) i/s -     963144 in   5.029578s
fast  2248844.0  (±6.1%) i/s -   11241017 in   5.020091s
```

* while loops versus each_with_index

```
ARRAY = [1, 2, 3, 1, '2', 4, '5', 6, 7, 8, 9,'10']

def slow
  hash = {}

  ARRAY.each_with_index do |item, index|
    hash[index] = item
  end

  hash
end

def fast
  hash = {}
  index = 0
  length = ARRAY.length

  while index < length
    hash[index] = ARRAY[index]
    index += 1
  end

  hash
end
```
```
slow   147515.1 (±9.6%) i/s -     734100 in   5.038291s
fast   183634.1 (±6.5%) i/s -     918335 in   5.023060s
```
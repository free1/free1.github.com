---
layout: post
title: simple-form
category: gem
description: Rails
disqus: false
---

* select

`<%= f.input :is_private, as: :select, label: false, include_blank: false, priority: ["public", "仅团队成员可见"], collection: [["仅团队成员可见", "true"], ["公开可见", "false"]], label_html: { class: "select optional" } %>`   
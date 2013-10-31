---
layout: post
title: 常见样式总结
category: designs
description: CSS
disqus: false
---

## 登录，注册输入框样式

事例代码:   

```
input {
	padding: 10px 10px;
	border: 1px solid #d5d9da;
	border-radius: 5px;
	box-shadow: 0 0 5px #e8e9eb inset;
	width: 180px;
	font-size: 1em;
	outline:0; /* remove webkit focus styles */
}

/* focos属性不支持ie，需要使用js */
input:focus {
	border:1px solid #b9d4e9;
	border-top-color:#b6d5ea;
	border-bottom-color:#b8d4ea;
	box-shadow:0 0 5px #b9d4e9;
}
```

## 按钮样式

事例代码:   

```
button {
	background: #57a9eb; /* Old browsers */
	background: -moz-linear-gradient(top, #57a9eb 0%, #3a76c4 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#57a9eb), color-stop(100%,#3a76c4)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top, #57a9eb 0%,#3a76c4 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top, #57a9eb 0%,#3a76c4 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top, #57a9eb 0%,#3a76c4 100%); /* IE10+ */
	background: linear-gradient(top, #57a9eb 0%,#3a76c4 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#57a9eb', endColorstr='#3a76c4',GradientType=0 ); /* IE6-9 */
	border:1px solid #326fa9;
	border-top-color:#3e80b1;
	border-bottom-color:#1e549d;
	color:#fff;
	text-shadow:0 1px 0 #1e3c5e;
	font-size:.875em;
	padding:8px 15px;
	width:90px;
	border-radius:5px;
	box-shadow:0 1px 0 #bbb, 0 1px 0 #9cccf3 inset;
}

button:hover {
	background: #13a6dc; /* Old browsers */
	background: -moz-linear-gradient(top, #13a6dc 0%, #57a9eb 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3a76c4), color-stop(100%,#57a9eb)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top, #3a76c4 0%,#57a9eb 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top, #3a76c4 0%,#57a9eb 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top, #3a76c4 0%,#57a9eb 100%); /* IE10+ */
	background: linear-gradient(top, #3a76c4 0%,#57a9eb 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3a76c4', endColorstr='#57a9eb',GradientType=0 ); /* IE6-9 */
	box-shadow:none;
	text-shadow:0 -1px 0 #1e3c5e;
}

button:active {
	background: #3a76c4; /* Old browsers */
	background: -moz-linear-gradient(top, #3a76c4 0%, #57a9eb 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3a76c4), color-stop(100%,#57a9eb)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top, #3a76c4 0%,#57a9eb 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top, #3a76c4 0%,#57a9eb 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top, #3a76c4 0%,#57a9eb 100%); /* IE10+ */
	background: linear-gradient(top, #3a76c4 0%,#57a9eb 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3a76c4', endColorstr='#57a9eb',GradientType=0 ); /* IE6-9 */
	box-shadow:none;
	text-shadow:0 -1px 0 #1e3c5e;
}
```
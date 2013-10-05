---
layout: post
title: 有序数组中找数
category: notes
description: 算法
disqus: false
---

## 给定一个有序数组a，长度为len，和一个数X，判断A数组里面是否存在两个数，他们的和为X，bool judge(int *a, int len, int x)，存在返回true，不存在返回false

```
#include <stdio.h>
#include <stdlib.h>

int judge(int *a, int len, int x)
{
	int begin = 0;
	int end = len - 1;
	int k = 0;
	int key = 0;
	// 判断数组升序还是降序
	if(a[0] < a[len-1])
	{
		// 升序
		k = 1;
		int i = 0;
		while(i < end)
		{
			if(a[i] > x)
			{
				key = i;
				break;
			}
			i++;
		}
	}
	else if(a[0]>a[len-1])
	{
		// 降序
		k = 0;
		int i = end;
		while(i > 0)
		{
			if(a[i] > x)
			{
				key = i;
				break;
			}
			i--;
		}
	}
	
	// 如果是升序
	if(k == 1)
	{
		while(begin < key)
		{
			// 数组首尾相加判断与x的关系
			if(a[begin] + a[key] < x)
			{
				begin++;
			}
			else if(a[begin] + a[key] > x)
			{
				key--;
			}
			else
			{
				return 1;
			}
		}
	}
	else if(k == 0)
	{
		// 如果是降序
		while(end > key)
		{
			// 数组首尾相加判断与x的关系
			if(a[end] + a[key] < x)
			{
				end--;
			}
			else if(a[end] + a[key] > x)
			{
				key++;
			}
			else
			{
				return 1;
			}
		}
	}
	
	return 0;
}

int main()
{
	int a[10] = {20, 17, 15, 13, 11, 9, 7, 5, 3, 1};
	int len = 10;
	int x = 13;
	switch(judge(a, len, x))
    {
        case 0: printf("%d 不存在", x);break;
        case 1: printf("%d 存在", x);break;
        default : break;
    }
	return 0;
}
```
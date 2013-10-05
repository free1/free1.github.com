---
layout: post
title:  最大最小数
category: notes
description: 算法
disqus: false
---

## 设计一个最优算法来查找一n个元素数组中的最大值和最小值。已知一种需要比较2n次的方法，请给一个更优的算法。情特别注意优化时间复杂度的常数。

```
int main()
{
	int a[10] = {12,45,54,11,46,100,240,11,77,88};
	int n = 10;
	int i = 0;
	int max = 0;
	int min = 0;
	
	if(a[0]>a[1])
	{
		max = a[0];
		min = a[1];
	}
	else
	{
		min = a[0];
		max = a[1];
	}
	
	for(i=2;i<n-1;i++)
	{
		if(a[i]>max)
		{
			max = a[i];
		}
		else if(a[i]<min)
		{
			min = a[i];
		}
	}
	
	printf("max=%d ", max);
	printf("min=%d", min);
	return 0;
}
```
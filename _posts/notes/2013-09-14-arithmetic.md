---
layout: post
title: 从1亿个元素数组中找最大的10个数
category: notes
description: 算法
disqus: false
---

## 给定一个有 1 亿个元素以上的数组,如何将里面的最大的 10 个数找出来。

有三种办法解决:

* 从大到小排好序，然后取最后10个元素。
* 利用快排和归并思想。
* 利用最小堆思想。(见下面代码)

基本思想:   
考虑到数组较大，所以尽量遍历一次就把问题解决，利用最小堆结构:  

* 将大数组中前十个数当作最大的十个数，建立最小堆。
* 遍历大数组，将大数组中的元素与最小堆元素对比，如果大就把它与最小堆中最小元素交换。
* 重新调整最小堆。
* 重复以上步骤，直到找出最大的十个数。


代码如下:

```
#include <stdio.h> 
#include <stdlib.h>
#include <time.h>

// 初始化创建最小堆，使它满足堆结构
void MinHeap(int b[],int index,int k)
{  
	int temp;
    int MinIndex = index;  
    //左子节点  
    int LeftIndex = 2*index+1;  
    //右子节点  
    int RightIndex = 2*index+2;  
	
	// 左右节点比较，把最小的数保存
    if(LeftIndex <= k && b[LeftIndex] < b[MinIndex])
	{  
        MinIndex = LeftIndex;  
    }  
    if(RightIndex <= k && b[RightIndex] < b[MinIndex])
	{  
        MinIndex = RightIndex;  
    }  
	
	// 左右节点与跟节点交换位置，使最小的数放到跟节点
    if(MinIndex != index)
	{
        temp = b[index];  
        b[index] = b[MinIndex];  
        b[MinIndex] = temp;  
        //重新调整以MinIndex为根的子树  
        MinHeap(b,MinIndex,k);  
    }  
}
  
//将数组b构造成最小堆 
void BuildMinHeap(int b[],int k)
{  
    int i;   
    for(i = k/2-1;i > 0;i--)
	{  
        //调整根节点使之成为最小堆  
        MinHeap(b,i,k);  
    }   
}  
  
int main(int argc, char* argv[]) 
{
	long i;
    int a[100], k=10, b[10];
    srand(time(NULL));

    // 随机生成1亿个元素的数组
    for(i = 0;i < 100;i++)
    {
		// 可调整数组中的取值
        a[i]=rand()%1000;
    }
	
	// 将数组中前十个数当作最大的元素
	for(i = 0;i < 10;i++)
	{
		b[i] = a[i];
	}

    // 将数组b构造成最小堆  
    BuildMinHeap(b,k);  
	
    // 遍历大数组
    for(i = 100;i > k;i--)
	{    
        int temp;  
		// 与数组b中最小的数比较，如果比b中最小的数小则进行下一轮，否则交换并放入堆中
        if(b[0] < a[i])
		{  
            temp = a[i];  
            a[i] = b[0];  
            b[0] = temp;  
            //重新调整，保持最小堆的性质  
            MinHeap(b,0,k);  
        }  
    }  
	
	// 打印得到的大数组中最大的十个数
    for(i = 0;i < k;i++)
	{  
        printf("%d ",b[i]);  
    }  
}  
```

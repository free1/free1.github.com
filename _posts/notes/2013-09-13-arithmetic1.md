---
layout: post
title:  双向链表交换元素
category: notes
description: 算法
disqus: false
---

## 给定一个双向链表,即给定一个节点 i,i 的可访问属性有:i.data, i.prev, i.next。其 中 prev 为上一个节点的指向,next 为下一个节点的指向。现要求实现一个操作, 只改变 next,prev 的指向,使链表的第 1 个与第 2 个元素交换,使链表的第 3 个 与第 4 个元素交换,使链表的第 5 个与第 6 个元素交换 ...例如:链表 [1, 2, 3, 4, 5, 6, 7]进行变换后得到的新链表可表示为[2, 1, 4, 3, 6, 5, 7]。也即是当链表元素个数是奇数个的时候,链表最后一个元素不进行改变。

代码如下:   

```
#include <stdio.h> 
#include <stdlib.h> 

// 定义节点
typedef struct Node
{
    int data; 
    struct Node *next; 
    struct Node *prev; 
}NODE, *PNODE; 

// 创建链表
PNODE create_list(void)
{
	int len, i, val;
	PNODE pTail;
	// 创建头节点并分配内存 
	PNODE pHead = (PNODE)malloc(sizeof(NODE)); 
	// 内存分配失败
	if(pHead == NULL)
	{
		printf("内存分配失败！");
		exit(-1);
	}
	// 将头节点当成尾节点
	pTail = pHead;
	pTail->next = NULL;
	// 输入链表长度
	printf("输入链表长度:\n");
	scanf("%d",&len);
	
	for(i = 0; i < len; i++)
	{
		// 输入节点的值
		printf("输入第%d个节点的值\n", i+1);
		scanf("%d",&val);
		
		// 给新节点分配内存
		PNODE pNew = (PNODE)malloc(sizeof(NODE));
		// 内存分配失败
		if(pNew == NULL)
		{
			printf("内存分配失败！");
			exit(-1);
		}
		// 将输入的值赋给新节点
		pNew->data = val;
		// 将新节点插入到链表尾部
		pTail->next = pNew;
		pNew->prev = pTail;
		pNew->next = NULL;
		// 将新节点作为尾节点
		pTail = pNew;
	}
	return pHead;
}

// 打印链表
void traverse_list(PNODE pHead)
{
	PNODE p;
	p = pHead->next;
	// 链表为空
    if(p == NULL) 
    { 
        printf("链表为空！\n"); 
    } 
	// 遍历链表
	while(p != NULL)
	{
		// 打印链表中的值
		printf("%d ", p->data);
		// 下一个链表
		p = p->next;	
	}
	
	return;
}

// 链表操作
PNODE change_list(PNODE pHead)
{
	PNODE p, q;
	p = pHead->next;
	
	// 只有一个元素
	if(p->next == NULL)
	{
		return pHead;
	}
	
	while(p && p->next)
	{
		// 使用指针交换两个元素
		p->prev->next = p->next;  // 第一个指向第三个
		p->next->prev = p->prev;  // 第三个指向第一个
		// 记录标记指针
		q = p->next->next;
		p->next->next = p;        // 第三个指向第二个
		p->prev = p->next;        // 第二个指向第三个
		p->next->next->prev = p;  // 第四个指向第二个
		p->next = q;              // 第二个指向第四个
	 	
	 	// 指向下一组需要交换的数
		p = p->next;
	}
	return pHead;
}

// 主函数
int main(int argc, char* argv[]) 
{
	// 初始化头节点
	PNODE pHead = NULL;
	// 创建链表
	pHead = create_list();
	// 遍历输出旧链表
	printf("原链表的值:\n");
	traverse_list(pHead); 
	// 链表操作
	change_list(pHead);
	// 遍历输出新链表
	printf("\n转换后链表的值:\n");
	traverse_list(pHead); 
}
```
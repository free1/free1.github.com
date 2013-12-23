// 全局变量
var timer=null;
var aNow=null;

var g_aImg=[];
var g_oImgWeek=null;
var g_aWeekName=
[
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven"
];

// 主函数
window.onload=function ()
{
	var oDiv=document.getElementById('Clock');
	var aImg=oDiv.getElementsByTagName('img');
	var i=0;
	
	// 获取需要改变的数字
	for(i=0;i<aImg.length;i++)
	{
		if(!isNaN(parseInt(aImg[i].alt)))
		{
			g_aImg.push(aImg[i]);
		}
	}
	
	// 把改变的week放入数组
	g_aImg.push(aImg[aImg.length-1]);
	
	// 获取当前时间的整型数组
	aNow=getTimeArray();
	
	// 固定图片的数字使其不改变
	for(i=0;i<g_aImg.length;i++)
	{
		g_aImg[i].now=-1;
	}
	
	// 处理图片使其对应当前时间
	checkSwitch();
	
	// 设置定时器更新时间
	setInterval(checkSwitch, 1000);
	// 使其不用等待1s即可显示时间
	checkSwitch();
	
}

var g_iImgHeigth=0;
var g_iTarget=0;
var g_iMax=0;

function checkSwitch()
{
	var i=0;
	
	aNow=getTimeArray();
	
	g_imgHeigth=g_aImg[0].offsetHeight;
	g_iTarget=-g_imgHeigth;
	g_iMax=g_imgHeigth;
	
	timer=setInterval(doSwitch, 30);
}

function doSwitch()
{
	var bEnd=false;
	var i=0;
	
	// 计算切换图片停止时间
	g_imgHeigth-=5;
	if(g_imgHeigth<=g_iTarget)
	{
		g_imgHeigth=g_iTarget;
		bEnd=true;
	}
	
	for(i=0;i<g_aImg.length;i++)
	{
		if(g_aImg[i].now!=aNow[i])
		{
			// 翻转图片效果
			if(g_imgHeigth>0)
			{
				g_aImg[i].style.height=g_imgHeigth+'px';
				g_aImg[i].style.top=-(g_iMax-g_imgHeigth)/2+'px';
			}
			// 替换图片使其对应当前时间
			else
			{
				// 如果是week
				if(i==g_aImg.length-1)
				{
					g_aImg[i].src="images/" + g_aWeekName[aNow[i]] + ".png";
				}
				else
				{
					g_aImg[i].src="images/" + aNow[i] + ".png";
				}
				
				// 翻转图片效果
				g_aImg[i].style.height=-g_imgHeigth+'px';
				g_aImg[i].style.top=-(g_iMax+g_imgHeigth)/2+'px';
			}
		}
	}
	
	if(bEnd)
	{
		// 使除了秒以外的数字不会频繁翻转
		for(i=0;i<g_aImg.length;i++)
		{
			g_aImg[i].now=aNow[i];
		}
		
		clearInterval(timer);
	}
}

// 使个位数变成两位数，使其对应图片位置
function toDouble(iNum)
{
	if(iNum<10)
	{
		return '0'+iNum;
	}
	else
	{
		return ''+iNum;
	}
}

// 获取当前时间并加入数组
function getTimeArray()
{
	var oDate=new Date();
	var aNumber=[];
	
	var iYear=oDate.getYear();
	var iMonth=oDate.getMonth();
	var iDay=oDate.getDate();
	var iHour=oDate.getHours();
	var iMin=oDate.getMinutes();
	var iSec=oDate.getSeconds();
	var iWeek=(oDate.getDay()+6)%7;
	
	// 转变成当前年份
	if(iYear<1900)
	{
		iYear+=1900;
	}
	
	// 把获取的时间对象加入数组
	var str=''+(iYear)+toDouble(iMonth+1)+toDouble(iDay)+toDouble(iHour)+toDouble(iMin)+toDouble(iSec)+iWeek;
	// 把时间对象数组变成字符串数组
	var aChar=str.split('');
	// 把字符串数组变成整型数组
	for(i=0;i<aChar.length;i++)
	{
		aNumber[i]=parseInt(aChar[i]);
	}
	
	return aNumber;
}
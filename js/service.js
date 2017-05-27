//获取对象的样式
function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}

// 封装轮播函数
//startMove(oDiv, {width: 400, height: 400})

function startMove(obj, json, fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//假设：所有值都已经到了
		
		for(var attr in json)
		{
			var cur=0;
			
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				cur=parseInt(getStyle(obj, attr));
			}
			
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr])
				bStop=false;
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
						
			if(fnEnd)fnEnd();
		}
	}, 30);
}


// 首页大轮播图
var oBanner=document.getElementById('banner');
var aBtn=oBanner.getElementsByClassName('banner-position')[0].getElementsByTagName('li');
var oUl=oBanner.getElementsByClassName('slides')[0];
var prev_ad=oBanner.getElementsByClassName('prev')[0];
var next_ad=oBanner.getElementsByClassName('next')[0];

var now=0;
	
for(var i=0;i<aBtn.length;i++)
{
	aBtn[i].index=i;
	aBtn[i].onclick=function ()
	{
		now=this.index;
		tab();
	};
}
	
function tab()
{
	for(var i=0;i<aBtn.length;i++)
	{
		aBtn[i].className='';
	}
	aBtn[now].className='active';
	startMove(oUl, {top: -400*now});

}
	
function next()
{
	now++;
	if(now==aBtn.length)
	{
		now=0;
	}
	tab();
}


next_ad.onclick=function(){
	next();
}
prev_ad.onclick=function(){
	next();
}

// 鼠标移入移出清空设置定时器	
var timer=setInterval(next, 5000);
	
oBanner.onmouseover=function ()
{
	clearInterval(timer);
};
	
oBanner.onmouseout=function ()
{
	timer=setInterval(next, 5000);
};

// 横向轮播图

var oItems=document.getElementById('items');
var btn_items=oItems.getElementsByClassName('items-nav')[0].getElementsByTagName('li');
var ul_items=oItems.getElementsByClassName('items')[0];

var now1=0;
	
for(var i=0;i<btn_items.length;i++)
{
	btn_items[i].index=i;
	btn_items[i].onclick=function ()
	{
		now1=this.index;
		tab1();
	};
}
	
function tab1()
{
	for(var i=0;i<btn_items.length;i++)
	{
		btn_items[i].className='';
	}
	btn_items[now1].className='hover';
	startMove(ul_items, {left: -620*now1});

}
	
function next1()
{
	now1++;
	if(now1==btn_items.length)
	{
		now1=0;
	}
	tab1();
}
	
var timer1=setInterval(next1, 5000);
	
oItems.onmouseover=function ()
{
	clearInterval(timer1);
};
	
oItems.onmouseout=function ()
{
	timer1=setInterval(next1, 5000);
};

// 竖向轮播图

var oNews=document.getElementById('news-list');
var btn_news=oNews.getElementsByClassName('news-list')[0].getElementsByTagName('li');
var ul_news=oNews.getElementsByClassName('news-list')[0];


var now2=1;
function next2()
{
	startMove(ul_news, {top: -120*now2});
	now2++;
	if(now2==btn_news.length-2)
	{
		now2=0;
	}
}

var timer2=setInterval(next2, 5000);
	
oNews.onmouseover=function ()
{
	clearInterval(timer2);
};
	
oNews.onmouseout=function ()
{
	timer2=setInterval(next2, 5000);
};
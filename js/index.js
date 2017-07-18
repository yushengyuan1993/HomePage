/**
  * 封装轮播插件
**/ 
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
        var bStop=true;     //假设：所有值都已经到了
        
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
/**
 *  弹出简历浏览框
 */
$(document).ready(function(){
    //初始化：是否开启DIV弹出窗口功能
    //0 表示开启; 1 表示不开启;
    var popupStatus = 0;
    //使用Jquery加载弹窗
    function loadPopup(){
        //仅在开启标志popupStatus为0的情况下加载
        if(popupStatus==0){
            $("#bg-modal").css({
                "opacity": "0.7"
            });
            $("#bg-modal").fadeIn("slow");
            $("#resume-modal").fadeIn("slow");
            popupStatus = 1;
        }
    }
    //使用Jquery去除弹窗效果
    function disablePopup(){
        if(popupStatus==1){
            $("#bg-modal").fadeOut("slow");
            $("#resume-modal").fadeOut("slow");
            popupStatus = 0;
        }
    }
    //将弹出窗口定位在屏幕的中央
    function centerPopup(){
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = $("#resume-modal").height();
        var popupWidth = $("#resume-modal").width();
        //居中设置
        $("#resume-modal").css({
            "position": "absolute",
            "top": windowHeight/2-popupHeight/2+60,
            "left": windowWidth/2-popupWidth/2
        });
        //以下代码仅在IE6下有效
        $("#bg-modal").css({
            "height": windowHeight
        });
    }

    //打开弹出窗口
    $("#scan-resume").click(function(){
        centerPopup();
        loadPopup();
    });
    //关闭弹出窗口
    $("#resume-close").click(function(){
        disablePopup();
    });
    $("#bg-modal").click(function(){
        disablePopup();
    });
    $(document).keydown(function(e){
        if(e.keyCode==27 && popupStatus==1){
            disablePopup();
        }
    });
});

/**
*   回到顶部
*/
var sdelay=0;
function returnTop() {
    window.scrollBy(0,-100);
    if(document.body && document.body.scrollTop) {
        if(document.body.scrollTop>0){
            sdelay = setTimeout("returnTop()",30);
        }
    }
    if(document.documentElement && document.documentElement.scrollTop){
        if(document.documentElement.scrollTop>0) {}{
            sdelay = setTimeout("returnTop()",30);
        }
    }
}
// 导航栏鼠标事件
var nav = document.getElementsByClassName('nav')[0];
var nav_1 = document.getElementsByClassName('nav-1')[0];
var nav_2 = document.getElementsByClassName('nav-2')[0];
var nav_3 = document.getElementsByClassName('nav-3')[0];
var nav_4 = document.getElementsByClassName('nav-4')[0];
nav_1.onmouseover = function (){
    this.childNodes[0].innerHTML = '关 于';
}
nav_1.onmouseout = function (){
    this.childNodes[0].innerHTML = 'About';
}
nav_2.onmouseover = function (){
    this.childNodes[0].innerHTML = '项 目';
    this.childNodes[0].style.color = '#f6f6f6';
}
nav_2.onmouseout = function (){
    this.childNodes[0].innerHTML = 'Projects';
    this.childNodes[0].style.color = '#333';
}
nav_3.onmouseover = function (){
    this.childNodes[0].innerHTML = '手 记';
    this.childNodes[0].style.color = '#f6f6f6';
}
nav_3.onmouseout = function (){
    this.childNodes[0].innerHTML = 'Notes';
    this.childNodes[0].style.color = '#333';
}
nav_4.onmouseover = function (){
    this.childNodes[0].innerHTML = '联 系';
    this.childNodes[0].style.color = '#f6f6f6';
}
nav_4.onmouseout = function (){
    this.childNodes[0].innerHTML = 'Contact';
    this.childNodes[0].style.color = '#333';
}
/**
*   手记
*/

var notesTab=document.getElementById("notes-tab");
var btnNote=notesTab.getElementsByClassName("notes-nav")[0].getElementsByTagName("li");
var ulNotes=notesTab.getElementsByClassName("notes-content")[0];

var now=0;
    
for(var i=0;i<btnNote.length;i++)
{
    btnNote[i].index=i;
    btnNote[i].onclick=function ()
    {
        now=this.index;
        tab();
    };
}
    
function tab()
{
    for(var i=0;i<btnNote.length;i++)
    {
        btnNote[i].className='';
    }
    btnNote[now].className='active';
    startMove(ulNotes, {left: -699*now});

}
    
function next()
{
    now++;
    if(now==btnNote.length)
    {
        now=0;
    }
        
    tab();
}
var timer=setInterval(next, 5000);
    
notesTab.onmouseover=function ()
{
    clearInterval(timer);
};
    
notesTab.onmouseout=function ()
{
    timer=setInterval(next, 5000);
};
/**
*   AJAX 异步留言板
*/
var btSubmit = document.getElementById('btnSubmit');
btnSubmit.onclick = function(){
    var userName = document.getElementById('userName').value;
    var userContact = document.getElementById('userContact').value;
    var userMsg = document.getElementById('userMsg').value;
    // 1-创建xhr对象
    var xhr = new XMLHttpRequest();
    // 2-监听状态
    xhr.onreadystatechange = function(){
      if(xhr.readyState===4){
        if(xhr.status===200){
          doResponse(xhr);
        }else{
          //alert('消息提交异常！');
        }
      }
    }
    //3 打开连接
    xhr.open('POST','php/01_add-msg.php',true);
    //3.5 修改请求头
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //4 发送请求
    xhr.send('name='+userName+'&contact='+userContact+'&msg='+userMsg);
    // 提交成功，将信息添加到下方留言区
    function doResponse(xhr){
        if(xhr.responseText=='succ'){
            var tips = document.getElementById('userMsg');
            tips.value = '提交成功.'+'\n'+'多谢你的关照！';
            tips.style.color = '#c66';
        }else {
            //alert('ERROR！');
        }
    }
}

/**
*    基于ECharts绘制的Canvas图表
*/ 
var myChart = echarts.init(document.getElementById('canvas'));
option = {
    title: {
        text: '我的技能树',
        textStyle: {
            color: '#000',
            fontWeight: 'normal',
            fontFamily: 'microsoft yahei',
            fontSize: '16px',
        }
    },
    tooltip: {
        show: true,
    },
    legend: {
        data: ['查看'],
    },
    radar: {
        //shape: 'circle',
        indicator: [
           { name: 'JavaScript', max: 10},
           { name: 'jqEasyUI', max: 10},
           { name: 'Vue.js', max: 10},
           { name: 'HTML5/CSS3', max: 10},
           { name: 'BootStrap', max: 10},
           { name: 'AJAX', max: 10},
           { name: 'jQuery', max: 10}
        ],
        axisLine: { // 文字以及文字对应线条颜色
            lineStyle: {
                color: '#5BC0DE',
            }
        },
        //radius: '75%',//  图形大小，默认75%
        name: {
            colo : 'green',
        },
        nameGap: '5',
        splitArea: {       // 雷达图的内部填充样式
            areaStyle: {
                color: ['rgba(48,77,140, 0.8)','rgba(48,77,140, 0.6)',
                    'rgba(48,77,140, 0.4)',
                    'rgba(48,77,140, 0.2)'],
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 10
            }
        },
        splitLine: {  // 分割线的颜色
            lineStyle: {
                color: 'rgba(48,77,140,.5)',
            }
        },
        splitNumber: '4',
    },
    series: [{
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [7.5, 8.5, 6, 7.5, 7.5, 8,8.5],
                name : '查看'
            }
        ],
        lineStyle: {
            normal: {
                color: '#F0AD4E',
            }
        },
        itemStyle: {
            normal: {
                color: '#5BC0DE',
            }
        }
    }]
};
myChart.setOption(option);
/**
*   百度地图
*/
var map = new BMap.Map("allmap");
map.enableScrollWheelZoom();
map.addControl(new BMap.NavigationControl());
	// 定位：武汉
var point = new BMap.Point(114.32,30.58);
map.centerAndZoom(point,11.9);
//var marker = new BMap.Marker(point);
var circle = new BMap.Circle(point,300,{
    fillColor : "lightblue",
    fillOpacity : 0.5,
    strokeColor : "lightblue",
    strokeOpacity : 0.4
});
(function(){
    //map.addOverlay(marker);
    map.addOverlay(circle);
})();

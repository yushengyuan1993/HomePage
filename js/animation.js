// 2048缓冲效果
var animation={
  DURATION:50,//总时间
  STEPS:50,//总步数
  interval:0,//每步的时间间隔
  
  moved:0,//保存已经移动的步数
  timer:null,//保存定时器的序号，专用来停止定时器

  tasks:[],//保存本次要移动的所有格子及其步长step

  CSIZE:100,
  OFFSET:16,

  init:function(){//初始化动画的数据
    this.interval=this.DURATION/this.STEPS;
  },
  //将一个要移动的格子及其步长加入steps
  addTask:function(currR,currC,tagR,tagC){
    //找到id为"c"+currR+currC的div,保存在变量cell中
    var cell=document.getElementById("c"+currR+currC);
    var distanceL=(tagC-currC)*(this.CSIZE+this.OFFSET);
    var stepL=distanceL/this.STEPS;
    var distanceT=(tagR-currR)*(this.CSIZE+this.OFFSET);
    var stepT=distanceT/this.STEPS;
    this.tasks.push({cell:cell,stepL:stepL,stepT:stepT});
  },
  startMove:function(fun){
    this.timer=
      setInterval(this.move.bind(this,fun),this.interval);
  },
  move:function(fun){//移动每一步
    for(var i=0;i<this.tasks.length;i++){
      var cell=this.tasks[i].cell;
      var left=parseFloat(getComputedStyle(cell).left);
      var top=parseFloat(getComputedStyle(cell).top);
      cell.style.left=left+this.tasks[i].stepL+"px";
      cell.style.top=top+this.tasks[i].stepT+"px";
    }
    this.moved++;
    if(this.moved==this.STEPS){
      this.moved=0;
      for(var i=0;i<this.tasks.length;i++){
        this.tasks[i].cell.style.left="";
        this.tasks[i].cell.style.top="";
      }
      this.tasks=[];
      clearInterval(this.timer);
      fun();
    }
  }
}
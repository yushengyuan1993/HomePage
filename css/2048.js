#gridPanel{
  width:480px; height:480px;
  margin:0 auto;
  background-color:#bbada0;
  border-radius:10px;
  position:relative;
}
.grid,.cell{
  width:100px; height:100px; border-radius:6px;
}
.grid{
  background-color:#ccc0b3;
  float:left;
  margin-left:16px;
  margin-top:16px;
}
.cell{ 
  position:absolute; 
  font-size:60px;
	text-align:center;
	line-height:100px;
	color:#fff;
}
[id^="c0"]{top:16px;}
[id^="c1"]{top:132px;}
[id^="c2"]{top:248px;}
[id^="c3"]{top:364px;}
[id^="c4"]{top:480px;}
[id^="c5"]{top:596px;}

.cell[id$="0"]{left:16px;}
.cell[id$="1"]{left:132px;}
.cell[id$="2"]{left:248px;}
.cell[id$="3"]{left:364px;}
.cell[id$="4"]{left:480px;}
.cell[id$="5"]{left:596px;}

.n2{background-color:#eee3da}
.n4{background-color:#ede0c8}
.n8{background-color:#f2b179}
.n16{background-color:#f59563}
.n32{background-color:#f67c5f}
.n64{background-color:#f65e3b}
.n128{background-color:#edcf72}
.n256{background-color:#edcc61}
.n512{background-color:#9c0}
.n1024{background-color:#33b5e5}
.n2048{background-color:#09c}
.n4096{background-color:#a6c}
.n8192{background-color:#93c}
.n2,.n4{color:#776e65}
.n1024,.n2048,.n4096,.n8192{font-size:40px}

p{
  width:480px; margin:0 auto;
  font-size:40px; font-family:Arial; font-weight:bold;
  padding-top:15px;
}
#gameOver{display:none;
  width:100%; height:100%;
  position:absolute;
  top:0; left:0;
}
#gameOver>div{
  width:100%; height:100%;
  background-color:#555; opacity:0.5;
}
#gameOver>p{
  width:300px; height:200px;
  /*鄙视题: 用css实现元素居中*/
  position:absolute;
  top:50%; left:50%;
  margin-left:-150px; margin-top:-100px;

  background-color:#fff;
  text-align:center;
  line-height:1.5em;
  border-radius:10px;
  border:1px solid #edcf72;
}
.btn{
  color:#fff; background-color:#9f8d77;
  border-radius:6px; 
  cursor:pointer;
  padding:10px;
}
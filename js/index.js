$(function(){
    var clientW=$(window).width();
    var clientH=$(window).height();
    $(".son").css({
        width:clientW,
        height:clientH
    })
    $(".menu").click(function(){
        $(".son").slideToggle(200);
    })

    //轮播+进度条
    var currentNum=0;
    var nextNum=0;
    var currentTime=0;
    var flag=true;
    function move1(){
        nextNum++;
        if(nextNum==3){
            nextNum=0;
            flag=false;
        }
        $(".list:eq("+currentNum+")").animate({width:'80%',height:'80%'}).css('zIndex',0);
        //$(".list:eq("+currentNum+")").style.transform="scale(1,1)";
        $(".list:eq("+nextNum+")").animate({left:0},function(){
            $(".list:eq("+currentNum+")").css({left:'100%', width:'100%', height:'100%'});
            currentNum=nextNum;
            currentTime=0;
            flag=true;
        }).css("zIndex",1);
    }

    function move2(){
        currentTime+=50;
        var bili=currentTime/3000;
        if(bili>1){
            bili=1;
        }
        $(".progress").eq(currentNum).css({width:bili*100+"%"});
        if(flag===false){
            $(".progress").css('width',0);
        }
    }

    var t1=setInterval(move1,4000);
    var t2=setInterval(move2,50);

    //浏览器获取，失去焦点
    $(window).focus(function(){
         t1=setInterval(move1,4000);
         t2=setInterval(move2,50);
    })
    $(window).blur(function(){
        clearInterval(t1);
        clearInterval(t2);
    })
    //点击轮播点
    $(".btns-list").click(function(){
        nextNum=$(this).index(".btns-list");
        stop();
    })
    //点击左右按钮
    $(".leftBtn").click(function(){
        nextNum--;
        if(nextNum<-1){
            nextNum=2;
        }
        stop();
    })
    $(".right").click(function(){
        nextNum++;
        if(nextNum==3){
            nextNum=0;
        }
        stop();
    })
    function stop(){

        clearInterval(t1);
        clearInterval(t2);

        //按钮变化
        $(".btns-list").find(".progress").css("width",0);
        $(".btns-list").eq(nextNum).find(".progress").css("width","100%");
        //轮播图变化
        if(nextNum>currentNum){
            $(".list:eq("+currentNum+")").animate({width:'80%',height:'80%'}).css('zIndex',0);
            $(".list:eq("+nextNum+")").animate({left:0},function(){
                $(".list:eq("+currentNum+")").css({left:'100%', width:'100%', height:'100%'});
                currentNum=nextNum;
            }).css("zIndex",1);
        }else{
            $(".list:eq("+currentNum+")").animate({left:"100%"}).css("zIndex",1);
            $(".list").eq(nextNum).css({
                width:"80%",height:"80%",left:0
            }).animate({width:"100%",height:"100%"},function(){
                currentNum=nextNum;
            })
        }
    }


    $(".s-column h3").click(function(){
        var index=$(this).index(".s-column h3");
        $(".s-column ul").eq(index).slideToggle(200);
    })
})

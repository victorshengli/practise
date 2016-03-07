(function($) {
	$.fn.typewriter = function(time) {
		this.continueWrite = function(){ 
			this.each(function(i,item){ 
				item.progress++;
			});
		};

		this.replaceValue = function(){
			this.each(function(i,item){
				$("input").each(function(i,dom){
					var id = $(dom).attr('id');
					if($("#"+id).val()!=undefined){
						item.str = item.str.replace(new RegExp("\\$"+id,"g"),$("#"+id).val());
					}
				});
			});
		};

		this.each(function(i,item) {
			var $ele = $(item);
			item.str = $ele.html();//index = 0;
			item.progress = 0;
			$ele.html('');
			var current = null;
			var before = null;
			var timer = setInterval(function() {
				if( current !='|'){ 
					$ele.html(item.str.substring(0, item.progress) + (item.progress & 1 ? '_' : ''));
				}
				current = item.str.substr(item.progress, 1);
				before = item.str.substr(item.progress-1,1);
				if(item.str.substr(item.progress-2,1) =='，'){
					sleep(250);
				}else if(item.str.substr(item.progress-2,1) =='。'){
					sleep(500);
				}
				if (current == '<' && before != '|') {
					item.progress = item.str.indexOf('>', item.progress) + 1;
				} else if(current == '|'){
					$("input").first().focus();
					//$ele.html(item.str.substring(0, item.progress) + (index & 1 ? '_' : ''));
					//index++;
				}else if(before == '|'){ //如果前一位是暂停符，则去除
					item.str = item.str.substring(0,item.progress-1)+item.str.substring(item.progress,item.str.length);
					item.progress++;
				}else{
					item.progress++;
				}

				
				if (item.progress >= item.str.length) {
					clearInterval(timer);
					recall();
				}
			}, time);			
		});
		return this;
	};
})(jQuery);

function sleep(numberMillis) { 
	var now = new Date(); 
	var exitTime = now.getTime() + numberMillis; 
	while (true) { 
		now = new Date(); 
		if (now.getTime() > exitTime) 
		return; 
	} 
}


 		var arr = [];//保存所有的XY坐标，只为验证。实际程序中可删除。  

        var r = 2;  

        var radian;//弧度  

        var i;  

        var radianDecrement;//弧度增量  

        var time = 10;//每个点之间的时间间隔  

        var intervalId;  

        var num = 720;//分割为 360 个点  

        var startRadian = Math.PI;  

        var ctx;  

      
        function startAnimation() {  

            ctx = document.getElementById("myCanvas").getContext("2d");  
            ctx.backgroundAlpha =0;

            //让画布撑满整个屏幕，-20是滚动条的位置，需留出。如滚动条出现则会挤压画布。  

            WINDOW_HEIGHT=document.documentElement.clientHeight-20;  

            WINDOW_WIDTH=document.documentElement.clientWidth-20;  

            //ctx.width = 200;  

            //ctx.heigh = 200;  

            drawHeart();  

        }  

  

        function drawHeart() {  

  

            ctx.strokeStyle = "#F70909";  

            ctx.lineWidth = 0.2;//设置线的宽度  

            radian = startRadian;//弧度设为初始弧度  

            radianDecrement = Math.PI / num * 2;  

            ctx.moveTo(getX(radian), getY(radian));//移动到初始点  

            i = 0;  

            intervalId = setInterval("printHeart()", time);  

        }  

        //x = 16 sin^3 t, y = (13 cos t - 5 cos 2t - 2 cos 3t - cos 4t)  

        function printHeart() {  

            radian += radianDecrement;  

            ctx.lineTo(getX(radian), getY(radian));//在旧点和新点之间连线  

            //arr.push("X:" + getX(radian) + "<br/>Y:" + getY(radian) + "<br/>");  

            i++;  

            ctx.stroke();//画线  

            if (i >= num) {  

                clearInterval(intervalId);  

                //document.getElementById("bs").innerHTML = arr.join("");//打印所有的XY坐标点。  

            }  

        }  

        function getX(t) {//由弧度得到 X 坐标  

            return 50 + r * (16 * Math.pow(Math.sin(t), 3));  

        }  

  

        function getY(t) {//由弧度得到 Y 坐标  

            return 50 - r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));  

        }  
        
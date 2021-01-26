require("./css/bootstrap.css");
require("./css/bootstrap-theme.css");
var $ = require("jquery");
// import $ from "jquery";
        function drawGrid(rowNum,colNum){
            for(var i=0;i<rowNum;i++){
                var $row = $('<div class="row show-grid"></div>');
                for(var j=0;j<colNum;j++){
                    var $grid = $('<div class="col-md-1 col-xs-1" ></div>');
                    var random=Math.random()*100;
                    if(random>90){
                        var color="";
                        // if (random>98){
                        //     color="rgb(0,0,255)";
                        // }else if (random>94 && random<=98){
                        //     color="rgb(0,255,0)";
                        // }else if (random>90){
                        //     color="rgb(255,0,0)";
                        // }
                        $grid.css("background-color",color);
                    }
                    if (i< (rowNum-1)){
                        if(j<(colNum - 1)){
                            $grid.css("border-right-style","none").css("border-bottom-style","none")
                        }else{
                            $grid.css("border-bottom-style","none")
                        }
                    }else{
                        if(j<(colNum - 1)){
                        $grid.css("border-right-style","none")
                        }
                    }
                        
                    $row.append($grid)  
                }
                // $row.append('<div class="col-md-1 col-xs-1" style="border: none"></div>')
                $(".container").append($row);
            }
        }
        function addTip(tipText,hs,ws,x,y){

            var $tip = $('<div style="position:absolute"></div>');
            var left=161,top=120,gridWidth=96,gridHeight=58,width=0,height=0;
            left=$("#firstGrid").offset().left;
            top=$("#firstGrid").offset().top;
            
            gridHeight=$("#firstGrid").outerHeight();
            gridWidth=$("#firstGrid").outerWidth();

            width = gridWidth*ws;
            height = gridHeight*hs ;

            left = left+ (gridWidth)*(y-1) - y/2; 
            top = top + (gridHeight)*(x-1);
            $tip.css("left",left+"px");
            $tip.css("top",top+"px");
            $tip.css("width",width+"px");
            $tip.css("height",height+"px");
            var random=Math.random()*3;
            var tipColor="";
            if(random<1) 
                tipColor="success";
            else if(random<2) 
                tipColor="warning";
            else if(random<3) 
                tipColor="info";

            $tip.addClass("label label-"+tipColor);
            // var $panel = $('<div class="panel panel-'+tipColor+'"></div>');
            // var $panelBody = $('<div class="panel-body"></div>');
            // $panelBody.text(tipText);
            // $panel.append($panelBody);
            // $tip.append($panel);
            var fontSize=8;
            if (ws*hs==1){
                fontSize="p"
            }else if (ws*hs==2){
                fontSize="h5"
            }else if (ws*hs>=4){
                fontSize="h4"
            }
            $tip.append('<'+fontSize+'>'+tipText[0]+'</'+fontSize+'>')
            $tip.append('<'+fontSize+'>'+tipText[1]+'</'+fontSize+'>')
            $tip.append('<'+fontSize+'>'+tipText[2]+'</'+fontSize+'>')
            $(".container").append($tip);
        }
        drawGrid(9,12);
        addTip(["三室两厅","裕园5号院","18638211014"],2,2,1,4);
        addTip(["","裕园5号院","18638211014"],1,1,2,2);
        addTip(["三室两厅","裕园5号院","18638211014"],2,2,3,8);
        addTip(["","裕园5号院","18638211014"],1,1,4,12);
        addTip(["","裕园5号院","18638211014"],1,2,5,2);
        addTip(["","裕园5号院","18638211014"],1,1,6,6);
        addTip(["","裕园5号院","18638211014"],2,1,8,3);
        addTip(["","裕园5号院","18638211014"],1,1,9,12);
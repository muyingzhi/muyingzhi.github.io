import React from "react";

const D3Rotate = React.createClass({
	propTypes: {
		//points:React.PropTypes.array.isRequired
	},
	float: function(container,type){
		//if(!container){
			container = this.refs.svg;
		// }
		var width = 400,height=300;
		var svg = d3.select(container).attr("width",width).attr("height",height).style("background","black");
		var ss=["10","$¥","✹❀✼"];
		var total = 0;
		var len = 0;
		var fillColor = "green";
		if(!type){
			type = parseInt(Math.random()*(ss.length+1))+1;
		}
		if(type==4){
			fillColor = "white";
		}
		console.log("type:",type);
		var ival = d3.interval(function(){
			len++;
			for(var i=0;i<len;i++){
				total++;
				setTimeout(function(){
					var x = parseInt(Math.random()*parseInt(width/10))*10;
					var y = parseInt(Math.random()*10)*10;
					var v = "o";
					switch(type){
						case 1:
							v = String.fromCharCode(Math.random()*26+65);
							break;
						default:
							if(type - 1 <= ss.length){
								var str = ss[type - 2];
								v = str.substr(parseInt(Math.random()*str.length),1);

							}else{
								v = "*";
							}
							break;
					}
					
					var t1 = svg.append("text").text(v).attr("fill",fillColor).attr("x",x).attr("y",y);
					if(parseInt(Math.random()*10000)>9500){
						t1.attr("fill","red");
					}
					moveText(t1,height);

					// d3.timeout(function(){
					// 	t1.remove();
					// 	total--;
					// },Math.random()*1000);
				},500*Math.random())
			};
			if(total>10000){
				ival.stop();
			}
		});
	},
	shouldComponentUpdate:function(newProps,newStates){
		this.float(this.refs.svg);
		return false;
	},
	componentDidMount: function(){
		this.float(this.refs.svg)
	},
	render: function(){
		return <svg ref="svg" onClick={this.float} />;
	}
});
function draw(ele){
	if( d3.select(ele)){
		console.log("draw1ss");
	}
}
function moveText(text,height){
	text.transition().duration(750)
	            .attrTween("dy", function(d, i) {
	                return function(t) {
	                	if(t==1){
	                		//text.attr("dy",0);
	                		d3.timeout(function(){
								text.remove();
							},Math.random()*1000);
							return (height - 50 )+Math.random()*50;
	                	}else{
		                    return (height - 100)*t;
		                }
	                };
	            });
}
module.exports = D3Rotate;
import React from "react";

var svg,bgArc,frArc;
const Obj = React.createClass({
	propTypes: {
		
	},
	draw:function(value){
		var margin = {top: 20, left: 20, right: 20, bottom: 20};
	    var width = 400;
	    var height = 300;
	    var svg = d3.select(this.refs.ele).select("svg")
	            .attr("width", width).attr("height", height)
	            .style("background", "#ccc")
	            .select("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");	
	
		var datum = value;//50
		
		if(datum<0 || datum>100){return;}
	    var bgArc = d3.arc().outerRadius(150).innerRadius(50)
	            .startAngle((-70 / 360) * 2 * Math.PI).endAngle((70 / 360) * 2 * Math.PI);
	    var end_angle = getEndAngle(20, 100);
	    var needlePositon = getNeedlePosition(20, 100);
	    var frArc = d3.arc().outerRadius(150).innerRadius(50).startAngle((-70 / 360) * 2 * Math.PI);
	    var wrap = svg.select("g")
	            .attr("class", "wrap")
	            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	    wrap.select("#bg").attr("d", bgArc).attr("fill", "green");
	    
	    d3.select("#cir").attr("cx", 0).attr("cy", 0).attr("r", 10).attr("fill", "red");
	    var front = d3.select("#fg").attr("class", "front").attr("d", frArc.endAngle(end_angle)).attr("fill", "yellow");
	    wrap.select(".needle").attr("d", needlePositon).attr("fill", "red");
	    front.datum(datum).transition().duration(1500)
	            .attrTween("d", function(d, i) {
	                var end_angle = getEndAngle(d, 100);
	                return function(t) {
	                    frArc.endAngle(end_angle * t + getEndAngle(20, 100) * (1 - t));
	                    return frArc();
	                };
	            });
	    var transition = d3.select(".needle").datum(datum).transition().duration(1000)
	    	.attrTween("d",function (d, i) {
	        return function (t) {
	            return getNeedlePosition(t * d + (1 - t) * 20, 100);
	        };
	    });
	    // transition.each(function (d) {
	    //             needlePositon = getNeedlePosition(d, 100);
	    //         });
	    function getNeedlePosition(data, max) {
	    	//----画指针，返回指针的路径
	        var angle = data / max * (140 / 360) * 2 * Math.PI + 20 / 360 * 2 * Math.PI;
	        var x_one =  -150 * Math.cos(angle);
	        var y_one = -150 * Math.sin(angle);
	        var x_two = -10 * Math.cos(Math.PI / 2 - angle);
	        var y_two = 10 * Math.sin(Math.PI / 2 - angle);
	        var x_three = 10 * Math.cos(Math.PI / 2 - angle);
	        var y_three = -10 * Math.sin(Math.PI / 2 - angle);
	        return "M" + [x_one, y_one].join(" ") + "L" + [x_two, y_two].join(" ") + "L" + [x_three, y_three].join(" ");
	    }
	    function getEndAngle(data, max) {
	        return data / max * 140 / 360 * 2 * Math.PI + (-70 / 360) * 2 * Math.PI;
	    }
	},
	shouldComponentUpdate:function(newProps,newStates){
		this.draw(newProps.value);
		return false;
	},
	componentDidMount: function(){
		this.draw(0);
		// d3.select(this.refs.ele).select("svg").transition()
		// 	.delay(750)
		// 	.each(function(){d3.select(this).style("background","rgb(255,255,255)");})
		// 	.style("background","rgb(204,204,204)");
		
	},
	render: function(){
		return <div ref="ele">
			<svg width="400" height="400" style={{background: "rgb(204, 204, 204)"}}>
				<g transform="translate(20,20)">
					<g className="wrap" transform="translate(200,200)">
						<path id="bg" fill="green"></path>
						<circle id="cir" cx="0" cy="0" r="10" fill="white"></circle>
						<path id="fg" className="front" fill="yellow"></path>
						<path className="needle" d="M-9.184850993605149e-15 -150L-10 0L10 0" fill="red"></path>
					</g>
				</g>
			</svg>
		</div>;
	}
});

module.exports = Obj;
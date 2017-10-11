import React from "react";

const D3Path = React.createClass({
	propTypes: {
		points:React.PropTypes.array.isRequired
	},
	drawB: function(a0){
		console.log(a0);
		var lineData = [ { "x": 1,   "y": 5},  { "x": 80,  "y": 20},
                 { "x": 100,  "y": 10}, { "x": 160,  "y": 40},
                 { "x": 350,  "y": 5},  { "x": 400, "y": 100}];
 		var lineData2 = [ { "x": 100,   "y": 50},  { "x": 180,  "y": 120},
                 { "x": 190,  "y": 100}, { "x": 260,  "y": 140},
                 { "x": 150,  "y": 105},  { "x": 400, "y": 100}];
 
		//线生成器
		var lineFunction1 = d3.line()
		                         .x(function(d) { return d.x; })
		                         .y(function(d) { return Math.sin(d.x/160*2*Math.PI)*100+100; })
		                         .curve(d3.curveCatmullRom.alpha(0.5));
		var lineFunction2 = d3.line()
		                         .x(function(d) { return d.x; })
		                         .y(function(d) { return d.y; })
		                         .curve(d3.curveBundle.beta(0.85));
		var lineFunction3 = d3.line()
		                         .x(function(d) { return d.x; })
		                         .y(function(d) { return d.y; })
		                         //.curve(d3.curveBasisClosed.bate(0.5));
		 
		//svg容器
		var svgContainer = d3.select(this.refs.svg);
		 
		//把path扔到容器中，并给d赋属性
		var lineGraph1 = svgContainer.append("path")
		                            .attr("d", lineFunction1(lineData))
		                            .attr("stroke", "red")
		                            .attr("stroke-width", 2)
		                            .attr("fill", "none");
		var lineGraph2 = svgContainer.append("path")
		                            .attr("d", lineFunction2(lineData))
		                            .attr("stroke", "green")
		                            .attr("stroke-width", 2)
		                            .attr("fill", "none");
		var lineGraph3 = svgContainer.append("path")
		                            .attr("d", lineFunction3(lineData))
		                            .attr("stroke", "yellow")
		                            .attr("stroke-width", 2)
		                            .attr("fill", "none");
		svgContainer.selectAll("circle")
		.data(lineData)
		.enter()
		.append("circle")
		.transition().duration(1500)
		.attr("cx",function(data){return data.x})
		.attr("cy",function(data){return data.y})
		.attr("r",5)
		.attr("fill","white")
		.attr("stroke","green")
		.attr("stroke-width",2);

		svgContainer.selectAll("circle")
		.data(lineData2)
		.enter()
		.append("circle")
		.transition().duration(1500)
		.attr("cx",function(data){return data.x})
		.attr("cy",function(data){return data.y})
		.attr("r",5)
		.attr("fill","white")
		.attr("stroke","green")
		.attr("stroke-width",2);
		svgContainer.select("circle").transition().duration(2000)
		.attrTween("cy",function(){
			//return d3.interpolate(0,400);
			return function(t){
				return 100 - Math.sin((t)*2*Math.PI*2)*100;
			}
		}).attrTween("cx",function(){
			var endx = 400;
			return function(t){
				return t*endx;
			};
		})
	},
	render: function(){

		var path = d3.path();
		// this.props.points.map(function(one,index){
		// 	if(index==0){
		// 		path.moveTo(one.x, one.y);
		// 	}else{
		// 		path.lineTo(one.x, one.y);
		// 	}
		// });
		path.moveTo(0,0);
		path.bezierCurveTo(0,0,0,200,400,200)
		path.bezierCurveTo(100,200,400,200,400,100)
		path.closePath();
		return <svg ref="svg" width={400} height={200} style={{"background":"black"}} onClick={this.drawB}>
		<path d={path.toString()} fill="none" stroke="blue" strokeWidth="2"></path>
		<circle cx="0" cy="0" r="10" fill="white" stroke="green" stroke-width="2"/>
		</svg>;
	}
});

module.exports = D3Path;
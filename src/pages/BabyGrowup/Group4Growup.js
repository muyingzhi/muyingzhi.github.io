import React from "react";
import datas from "../../json/datas.json"
import {Button} from "react-bootstrap"

class Growup extends React.Component {
	constructor(props) {
		super(props)
		this.width = props.width || 600
		this.height= props.height || 250
		this.points = props.points || []
		this.datas = [ ];
	}
	componentDidMount() {
		// var _this = this;
		// fetch(`json/datas.json`,{
		// 			method:"GET",
		// 		    headers:{
		// 		    	'Content-type' : "application/json;charset=utf-8"
		// 		    }
		// }).then(function(response){
		// 	return response.text()
		// }).then(function(responseText){
		// 	_this.datas = JSON.parse(responseText);
		// 	_this.drawB();
		// })
		console.log(datas);
		this.datas = datas;
		this.drawB();
	}

	drawB(a0){
		console.log("draw")
		//svg容器
		var svgContainer = d3.select(this.refs.svg);
		var lineData = this.datas;
		var circleData = [];

 		lineData.forEach(function(element){
 			var old = {};
 			old.x = element.x;
 			old.y = element.y;
 			old.z = element.z;
 			element.y = 200 - 50 - element.y
 			element.x = Math.round(400/6) * element.x +50
 			element.z = 200 - Math.round(element.z/100)
 			circleData.push({x:element.x, y:200 , type: 0, value: old.x+"月"});
 			circleData.push({x:element.x, y:element.y , type: 1, value: old.y+"cm"});
 			circleData.push({x:element.x, y:element.z, type:2, value: old.z+"g"}); 		
 		})
		//----------身长  线生成器
		var lineFun1 = d3.line()
		                         .x(function(d) { return d.x; })
		                         .y(function(d) { return d.y; })
		                         //.curve(d3.curveBasisClosed.bate(0.5));
		 
		//把path扔到容器中，并给d赋属性
		var lineGraph1 = svgContainer.append("path")
		                            .attr("d", lineFun1(lineData))
		                            .attr("stroke", "green")
		                            .attr("stroke-width", 1)
		                            .attr("fill", "none")
		                            ;

		//--------------体重 线生成器
		var lineFun2 = d3.line()
		                         .x(function(d) { return d.x; })
		                         .y(function(d) { return d.z; })
		                         //.curve(d3.curveBasisClosed.bate(0.5));
		
		//把path扔到容器中，并给d赋属性
		var lineGraph2 = svgContainer.append("path")
		                            .attr("d", lineFun2(lineData))
		                            .attr("stroke", "red")
		                            .attr("stroke-width", 1)
		                            .attr("fill", "none")
		                            ;
		// ------数据点标记
		svgContainer
		.selectAll("circle")
		.data(circleData.filter(function(data){
			return data.type!==0
		}))
		.enter()
		.append("circle")
		.attr("cx",function(data){return data.x})
		.attr("cy",function(data){return data.y})
		.attr("r",3)
		.attr("fill","white")
		.attr("stroke",function(data){ return data.type==2? "red" : "green"})
		.attr("stroke-width",2)

		svgContainer
		.selectAll("text")
		.data(circleData)
		.enter()
		.append("text")
		.attr("x",function(data){return data.x})
		.attr("y",function(data){return data.y})
		.text(function(data){return data.value=="0月"?"出生":data.value})

		
		// svgContainer.selectAll("circle")
		// .data(lineData2)
		// .enter()
		// .append("circle")
		// .transition().duration(1500)
		// .attr("cx",function(data){return data.x})
		// .attr("cy",function(data){return data.y})
		// .attr("r",5)
		// .attr("fill","white")
		// .attr("stroke","green")
		// .attr("stroke-width",2);
		// svgContainer.select("circle").transition().duration(2000)
		// .attrTween("cy",function(){
		// 	//return d3.interpolate(0,400);
		// 	return function(t){
		// 		return 100 - Math.sin((t)*2*Math.PI*2)*100;
		// 	}
		// }).attrTween("cx",function(){
		// 	var endx = 400;
		// 	return function(t){
		// 		return t*endx;
		// 	};
		// })
	}
	render(){

		var path = d3.path();
		// this.props.points.map(function(one,index){
		// 	if(index==0){
		// 		path.moveTo(one.x, one.y);
		// 	}else{
		// 		path.lineTo(one.x, one.y);
		// 	}
		// });
		path.moveTo(0,0);
		path.bezierCurveTo(100,100,0,200,400,200)
		path.bezierCurveTo(100,200,400,200,400,100)
		path.closePath();
		return <div>
			<svg ref="svg" width={this.width} height={this.height} 
			style={{"background":"white"}}>
		</svg>
			<Button>编辑</Button>
		</div>;
	}
}

export default Growup

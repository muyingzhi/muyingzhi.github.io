import React from "react";

const BindData = React.createClass({
	render : function(){
		var data1 = this.props.leftData;
		var data2 = this.props.rightData;
		var t1 = d3.max(data1),t2 = d3.max(data2);
		var tt = d3.max([t1,t2]);
		return <div>
			<HalfBindData float={"right"} datas={data1} domainValue = {tt} background={"red"}>
				<div>o</div><div>ok</div>
			</HalfBindData>
			<div style={{float:"left",width:"10px",height:"100px",background:"white"}}></div>
			
			<HalfBindData float={"left"} datas={data2} domainValue = {tt} background={"green"}>
				<div>o</div><div>ok</div>
			</HalfBindData>
		</div>
	}
})
const HalfBindData = React.createClass({
	componentDidMount:function(){
		var width=300;
		var data = this.props.datas;
		var x = d3.scaleLinear()
			    .domain([0, this.props.domainValue])
			    .range([0, width]);
		var marginType = "margin-left";
		if(this.props.float=="left"){
			marginType = "margin-right";
		}
		var d = d3.select(this.refs.bindData)
			.selectAll("div")
			.data(data)
			.enter().append("div")
			// .style("width",function(d){ return x(d) + "px";})
			// .style(marginType,function(d){ console.log(width - x(d));return (width - x(d)) + "px";})
			.style("background",this.props.background)
			.style("color","white")
			.style("margin","1px")
			.style("float",this.props.float)
			.style("display","inline-block")
			.style("text-align",this.props.float)
			.text(function(d){ return d});
			
		d.transition()
			.duration(1000)
			.styleTween("width",function(d,i){
				return function(t){
					var a = (t)*x(d);
					return a+"px";
				}
			})
			.styleTween(marginType,function(d,i){
				return function(t){
	        	// console.log("d:"+d+" i:"+i);
					var a = (t)*x(d);
					return (width - a)+"px";
				}
			})
			//.style("background","rgb(204,204,204)");
	},
	render:function(){
		return <div ref="bindData" style={{float:"left",width:300}} >
			</div>
	}
});

module.exports = BindData;

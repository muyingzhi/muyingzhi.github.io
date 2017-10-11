import React from "react";
// import Processing from "processing";
var D3path = require("./d3path");
var D3BindData = require("./D3BindData");
var D3Needle = require("./D3Needle");
var D3Rotate = require("./D3Rotate");
const d3test = React.createClass({
	getInitialState: function(){
		return {
			points:[{x:10,y:10},{x:110,y:20},{x:780,y:130},{x:203,y:450},{x:345,y:90}],
			a1:50
		}
	},
	componentDidMount: function(){
		function sketchProc(processing){
			processing.draw = function(){

			}
		}
		var canvas = this.refs.canvas;
		//var processingInstance = new Processing(canvas, sketchProc);
	},
	changeA1:function(){
		var a1 = this.refs.a1.value;
		console.log("changeA1",a1);
		if(parseInt(a1)!=NaN){
			this.setState({a1: parseInt(a1)});
		}
	},
	render: function(){
		var deNeedle = null;
		var data1 = [4,7,8,13,0,2,4,3,5,9,3,10];
		var data2 = [4,8,9,10,1,2,1,4,2,8,4,34];
		console.log("render a1:",this.state.a1);

		return (
			<div>
				<canvas ref="canvas"></canvas>
				<div style={{height:300}}>
					<D3BindData leftData={data1} rightData={data2}>
					</D3BindData>
				</div>
				<div>
					输入0-100的数字：<input ref="a1" onChange={this.changeA1}/>
					<D3Needle value={this.state.a1}/>
					<D3Rotate />
				</div>
				<D3path points={this.state.points}/>
								{/*<svg ref="d3" width="900" height="600">
					
					<defs>
					    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
					      <stop offset="0%" style={{"stop-color":"rgb(255,255,255)","stop-opacity":0} }/>
					      <stop offset="100%" style={{"stop-color":"rgb(0,0,255)","stop-opacity":1}} />
					    </radialGradient>
			  		</defs>
			  		<ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
				</svg>*/}
			</div>
		);
	},
	createPoint:function(){
		var xr = parseInt(900*Math.random());
		var yr = parseInt(600*Math.random());
		return {
			x: xr,
			y: yr
		}
	},
	drawLine : function(path){
		var p1 = this.createPoint(),p2 = this.createPoint();
		var ptop = {x :(p1.x + p2.x )/2,y:50}
		path.attr("d","M "+p1.x+ " "+p1.y+ " Q "+ptop.x+ " "+ptop.y+" "+p2.x+ " "+p2.y);
		path.attr("fill","none");
		path.attr("stroke","blue").attr("stroke-width",5);
		return path;
	}
})
module.exports = d3test;
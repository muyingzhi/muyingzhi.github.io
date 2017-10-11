import React from 'react'

class Note extends React.Component {
	constructor(props) {
	    super(props);
	    this.city = props.city || ''
	    this.state = {city: this.city}
	    this.search = this.search.bind(this)
	    navigator.geolocation.getCurrentPosition(function(position){
	    	console.log("positon",position);
	    },function(error){
	    	console.log("error",error);
	    });
	}
	
	onSelect() {

	}

	search() {
		var city = this.refs.city.value;
		this.setState({city: city,x:114,y:40})
	}

	componentDidMount(){
		// 先获取元素
		var lbsGeo = document.getElementById('geo');
		//监听定位失败事件 geofail	
		lbsGeo.addEventListener("geofail",function(evt){ 
			console.log(evt)
			alert("定位失败");
		});
		//监听定位成功事件 geosuccess
		lbsGeo.addEventListener("geosuccess",function(evt){ 
			console.log(evt.detail);
			var address = evt.detail.address;
			var coords = evt.detail.coords;
			var x = coords.lng;
			var y = coords.lat;
			alert("地址："+address);
			alert("地理坐标："+x+','+y);
			// this.setState({x:x,y:y})
		});
	}
	render() {
		return <div>
			<label>标题：</label><input ref='city' defaultValue={this.city} />
			<button onClick={this.search}>记录</button>
			<lbs-map center={""+this.state.x+","+this.state.y+""} height="100%"> </lbs-map>
			<lbs-geo id="geo" city="北京" enable-modified="false"></lbs-geo>
		</div>

	}
}
module.exports = Note
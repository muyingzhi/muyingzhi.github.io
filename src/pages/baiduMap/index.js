import React from 'react'
import BaiduMap from './BaiduMap'
import Weather from "./weather"
import NoteOfMap from "./NoteOfMap"

class Apimap extends React.Component {
	constructor(props) {
	    super(props);
	}
	
	onSelect() {

	}

	render() {
		<BaiduMap id= "bdmap" onSelect={this.onSelect} style={{height: 500}} ></BaiduMap>
	}
}

class MapIndex extends React.Component {
	
	render() {
		var comp = null;
		if (this.props.params.type == 'api'){
			comp = <Apimap/>
		} else if (this.props.params.type == 'weather'){
			comp = <Weather city=''/>
		} else if (this.props.params.type == 'note'){
			comp = <NoteOfMap/>
		}
		return comp;
	}
}

module.exports = MapIndex
import React from 'react'

class Weather extends React.Component {
	constructor(props) {
	    super(props);
	    this.city = props.city || '北京'
	    this.state = {city: this.city}
	    this.search = this.search.bind(this)
	}
	
	onSelect() {

	}

	search() {
		var city = this.refs.city.value;
		this.setState({city: city})
	}
	render() {
		return <div>
			<input ref='city' defaultValue={this.city} /><button onClick={this.search}>查询</button>
			<lbs-weather city={this.state.city}></lbs-weather>
		</div>

	}
}
module.exports = Weather
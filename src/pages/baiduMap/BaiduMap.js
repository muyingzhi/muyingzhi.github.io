import React from 'react'

class BaiduMap extends React.Component{
	constructor(props) {
	    super(props);
	    this.id = props.id || 'allmap';
	}

	componentDidMount() {
    	this._map = new BMap.Map(this.id);
    	this._map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    	this._local = new BMap.LocalSearch(this._map, {
    		renderOptions: { map: this._map },
    		onInfoHtmlSet: poi => {
		        if (typeof this.props.onSelect === 'function') {
		          this.props.onSelect(poi.marker.getPosition());
		        }
	    	}
    	});
  	}

	render() {
		return <div id={this.id} {...this.props}>cccc</div>
	}
}
BaiduMap.propTypes = {
  /**
   * the id to create DOM id
   */
  id: React.PropTypes.string,
  /**
   * this function will be fired when user click a marker and the info bubble is shown
   */
  onSelect: React.PropTypes.func
};


export default BaiduMap
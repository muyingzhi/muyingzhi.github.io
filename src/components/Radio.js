import React from "react";
import {FormGroup, Col, Radio,ControlLabel} from "react-bootstrap";
const RadioButton = React.createClass({
	handleChange : function(value){
		this.setState({selectValue:value});
		if(this.props.onSelectedValueChanged){
			this.props.onSelectedValueChanged(value);
		}
	},
	render : function(){
		return <Radio inline style={{marginLeft:"10px",width:"60px"}}
					value={this.props.value}
					checked={this.props.checked}
					onChange={this.handleChange.bind(this,this.props.value)}>
				{this.props.text}
				</Radio>
		{/*<label htmlFor={this.props.id} style={{width:"60px"}}>
			<input type="radio" style={{width:"20px"}}
					id={this.props.id}
					name={this.props.name}
					value={this.props.value}
					checked={this.props.checked}
					onChange={this.handleChange}/>
			{this.props.text}
			</label>*/};
	}
})
const RadioList = React.createClass({
	propTypes: {
		name: React.PropTypes.string,
		listItems: React.PropTypes.array,
		// selectedValue: React.PropTypes.string
	},
	getInitialState: function(){
		return {selectedValue: this.props.selectedValue }
	},
	onSelectedValueChanged: function(value){
		this.setState({selectedValue : value});
		if(this.props.onSelectedChanged){
			this.props.onSelectedChanged(value);
		}
	},
	render: function() {
		return <span>{this.renderRadioButtons()}</span>;
	},
	renderRadioButtons : function(){
		return this.props.listItems.map(function(item,index){
			return (<RadioButton key={this.props.name+"_"+index} 
						value={item.value||item}
						text={item.text||item}
						checked={this.state.selectedValue==(item.value||item)}
						onSelectedValueChanged = {this.onSelectedValueChanged}/>);
		}.bind(this))
	}
})
export default RadioList;
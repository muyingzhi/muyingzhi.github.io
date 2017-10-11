import React from "react";
function forID18(id17){
	var weight = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];//十七位数字本体码权重
		var validate = [ '1','0','X','9','8','7','6','5','4','3','2'];//mod11,对应校验码字符值  
		var total=0;
		for(var i=0;i<17;i++){
			var one = id17.charAt(i);
			if(!isNaN(parseInt(one))) {
				var m = parseInt(one);
				total += m*weight[i];
			} else {
				alert("输入必须是数字")
				return null;
			}
		}
		var y = (total % 11);
		return validate[y];
	}
const id18 = React.createClass({
	propTypes: {
		defaultValue: React.PropTypes.string
	},
	getInitialState: function(){
		var value,ma=null;
		

		return {inputValue: value ,validate:ma}
	},
	// componentDidMount: function(){
	// 	var value,ma=null;
	// 	console.log(this.props.defaultValue);
	// 	if(this.props.defaultValue && this.props.defaultValue.length==17){
	// 		value = this.props.defaultValue;
	// 		ma = forID18(this.props.defaultValue);
	// 	}
	// 	this.setState({inputValue: value ,validate:ma});
	// },
	onChange: function(e){
		var id17 = e.target.value;

		if(id17.length!=17){
			this.setState({inputValue:id17, validate:null});
			return;
		}
		var ma = forID18(id17);

		this.setState({inputValue:id17, validate:ma});
	},
	render: function(){
		return (<div>身份证验证码计算，请输入（固定17位）：<input onChange={this.onChange}  value={this.state.inputValue}/><label>验证码：{this.state.validate}</label></div>);
	}
})

export default id18;
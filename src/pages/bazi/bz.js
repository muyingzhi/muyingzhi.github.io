import React from "react";
import {Col, Breadcrumb,ListGroupItem,ListGroup, Form, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar,Button, Radio,Label,Modal,Glyphicon} from "react-bootstrap";
import RadioList from "../../components/Radio";
import {History } from 'react-router';
const FieldGroup1 = React.createClass({
	render: function(){
	  return (
	    <FormGroup controlId={this.props.id}>
	      <ControlLabel>{this.props.label}</ControlLabel>
	      <FormControl {...this.props} />
	      {/*this.props.help && <HelpBlock>{this.props.help}</HelpBlock>*/}

	    </FormGroup>
	  );
	}
});
// function FieldGroup({ id, label, help, ...props }) {
//   return (
//     <FormGroup controlId={id}>
//       <ControlLabel>{label}</ControlLabel>
//       <FormControl {...props} />
//       {help && <HelpBlock>{help}</HelpBlock>}
//     </FormGroup>
//   );
// }
var BzForm = React.createClass({
	mixins : [History],
	getInitialState: function(){
		return {birthday:new Date(),month:1,clock:0,bz:""};
	},
	handleSubmit: function(e){
		e.preventDefault();
		var d = this.state.birthday
		// d = d.replace(/-/g,"");
		if(d==null || d==""){
			alert('请输入出生日期')
			return;
		}else{
			d = new Date(d)
		}
		this.props.dispatch(czService
			(d,
			this.state.month,
			this.state.clock)
		);
		this.setState({showBz:true});
	},
	onChangeBirthday : function(e){
		if(e.target.id==="birthday"){
			var d = e.target.value;
			
			this.setState({birthday:d});
		}
	},
	getValidationState : function(){
		var d = this.state.birthday;
		if(d){
			return "success";
		}else{
			return "error";
		}
	},
	monthSelect : function(value){
		this.setState({month:value});
	},
	clickClock : function(value){
		this.setState({clock:value});
	},
	close : function(){
		this.setState({showBz:false});
	},
	render: function(){
		var months = [1,2,3,4,5,6,7,8,9,10,11,12];
		var clocks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
		var ss = this.props.result?(this.props.result.shishen?this.props.result.shishen:[]):[]
		var ssRow =[];
		for(var i=0;i<ss.length;i++){
			var href = "https://www.bing.com/search?q="+ss[i]
			ssRow.push(<Button href={href} target="_blank">{ss[i]}</Button>)
		}
		var gz = splitBySpace(this.props.result?this.props.result.gz:"");
		var yinyang = splitBySpace(this.props.result?this.props.result.yinyang:"");
		var wx = splitBySpace(this.props.result?this.props.result.wx:"");
		return (<div>
			<Col lg={3} md={4} sm={6}xs={12}>
				<Breadcrumb>
				    <Breadcrumb.Item href="#" onClick={()=>this.history.goBack()}>
				      <Glyphicon glyph="chevron-left" />返回
				    </Breadcrumb.Item>
				    <Breadcrumb.Item active>
				      干支历
				    </Breadcrumb.Item>
				</Breadcrumb>
				<Form inline onSubmit={this.handleSubmit}>
					<FormGroup controlId="birthday"
						validationState={this.getValidationState()}>
				      <ControlLabel>出生日期</ControlLabel>
				      <FormControl type="date" value={this.state.birthday} onChange={this.onChangeBirthday}/>
				      <HelpBlock>*必填</HelpBlock>
				    </FormGroup>
					
					<FormGroup
					controlId="month" 
					label="" >
						<div><label style={{marginRight:20}}>农历月份</label></div>
						<RadioList name="month" listItems={months} 
								selectedValue={this.state.month}
								onSelectedChanged={this.monthSelect}/>
					</FormGroup>
					<FormGroup
						controlId="clock" 
						label="" >
						<div><label style={{marginRight:20}}>出生时刻</label></div>
						
						<RadioList name="clock" listItems={clocks} 
							selectedValue={this.state.clock}
							onSelectedChanged={this.clickClock}/>				
					</FormGroup>
					<Button type="submit" bsStyle="primary" bsSize="large"block>计算</Button>
					
				</Form>
			</Col>
			<Modal show={this.state.showBz} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>结果</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListGroup>
					<ListGroupItem>八字：{gz}</ListGroupItem>
					<ListGroupItem>阴阳：{yinyang}</ListGroupItem>
					<ListGroupItem>五行：{wx}</ListGroupItem>
					<ListGroupItem>十神：<ButtonToolbar>{ssRow}</ButtonToolbar></ListGroupItem>
					</ListGroup>
				</Modal.Body>
			</Modal>
		</div>)
	}
})

function splitBySpace(tmp){
		var result="";
		tmp = tmp.split("");
		for(var i=0;i<tmp.length;i++){
			result += tmp[i]
			if(i>0 && i%2==1){
				result += " "
			}
		}
		return result;
}

import {connect} from "react-redux";
function select(state){
	var result;
	if(state.bz.type=="RECEIVE_POSTS"){
		result = state.bz.msg;
		//bz = bz.substring(4,bz.length - 6);
	}else{
		result = state.bz.msg;
	}
	return {
		result: result
	}
}
BzForm = connect(select)(BzForm);

import {czService} from "./bz-action";
import reducer from "./bz-redux";
import thunkMiddleware from 'redux-thunk';
import { createStore ,applyMiddleware } from "redux";
import { Provider } from "react-redux";

var store = createStore(reducer,applyMiddleware(thunkMiddleware));
const BzFormProvider = React.createClass({
	render: function(){
		return <Provider store={store}>
			<BzForm />
		</Provider>
	}
})
export default BzFormProvider;
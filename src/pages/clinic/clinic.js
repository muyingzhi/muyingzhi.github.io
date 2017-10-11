import React from "react";
import ReactDom from "react-dom";

var Clinic = React.createClass({
	getInitialState : function(){
		return {
			pageNo:1,
			datas:{},
			html:{__html:""},
			logic:""
		}
	},
	componentDidMount: function(){
		this.setState(this.getFormPage(1,{}));
	},
	componentDidUpdate: function (prevProps, prevState) {
		//-----使用datas，为html里的form元素赋值；
		var datas = this.state.datas;
		var key ;
		var form = ReactDom.findDOMNode(this.refs.main);
		for(key in datas){
			var one = form.querySelector("#"+key);
			if (one!=null){
				one.value = datas[key];
			}		}
	},
	setStep : function (ele) {
		var pageNo = this.state.pageNo;
		var datas = this.state.datas;
		if(ele.target.name=="btnnext"){
			pageNo++;
		}else{
			pageNo--;
		}
		if(pageNo<1){
			alert("没有上一步了");return;
		}
		if (pageNo>3) {
			alert("没有下一步了");return;
		};
		this.setState(this.getFormPage(pageNo,datas));//-----通过改变pageNo来设置表单页
	},
	getFormPage : function(pageNo,datas){
		var html = "";
		var logic = "";
		//----当前表单取值
		var form = ReactDom.findDOMNode(this.refs.main);
		var inputs = form.querySelectorAll("input");
		
		for(var i=0;i<inputs.length;i++){
			var one = inputs[i];
			datas[one.id] = one.value;
		}
		//----通过action请求数据，其结果将通过this.props获得
		this.props.dispatch( service(pageNo) );
		return {
			pageNo : pageNo,
			html : {__html : html},
			logic : logic,
			datas : datas
		};
	},
	render : function (argument) {

		return (
			<div>
				<h1>Page {this.state.pageNo}</h1>
				<label>{this.props.message}</label>
				<form ref="main" >
					<div dangerouslySetInnerHTML={this.props.html}/>
				</form>
				<button name="btnpre" onClick={this.setStep}>上一步</button><button name="btnnext" onClick={this.setStep}>下一步</button>
			</div>
		);
	}
})
//---------------react redux 处理
import {connect} from "react-redux";
function select(state){
	var rtn={};
	if(state.clinicForm.type=="RECEIVE_POSTS"){
		//-----收到结果
		rtn = {
			html: {
					__html: state.clinicForm.data.html
			}, 
			logic: state.clinicForm.data.logic
		};
	}else{
		rtn = {message:"请求处理中"};
	}
	//------
	return rtn;
}
Clinic = connect(select)(Clinic);
//----
import {service} from "./clinic-action";
import reducer from "./clinic-redux";
import thunkMiddleware from 'redux-thunk';
import { createStore ,applyMiddleware } from "redux";
import { Provider } from "react-redux";

var store = createStore(reducer,applyMiddleware(thunkMiddleware));
const ClinicProvider = React.createClass({
	render: function(){
		return <Provider store={store}>
			<Clinic />
		</Provider>
	}
})

module.exports = ClinicProvider;


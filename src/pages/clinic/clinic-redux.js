import {combineReducers} from "redux";
import {Action, REQUEST_POSTS, RECEIVE_POSTS} from "./clinic-action";

function service(state = [], action){
	switch(action.type){
		case REQUEST_POSTS:
			return {type:action.type,msg:"请求中"};
		case RECEIVE_POSTS:
			return {type:action.type,data:action.result};
		default:
		  return state;
	}
}

//----这里相当于定义了state，
//----以上三个function对应state的三个属性；若干action.type影响某个属性，从而实现reduce（降低）
const Reducer = combineReducers({
	clinicForm : service
});

export default Reducer;
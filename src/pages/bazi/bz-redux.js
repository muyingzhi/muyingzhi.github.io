import {combineReducers} from "redux";
import {CZ, REQUEST_POSTS, RECEIVE_POSTS} from "./bz-action";

function bzService(state = [], action){
	switch(action.type){
		case REQUEST_POSTS:
			return {type:action.type,msg:"请求中"};
		case RECEIVE_POSTS:
			return {type:action.type,msg:action.result};
		default:
		  return state;
	}
}

//----这里相当于定义了state，
//----以上三个function对应state的三个属性；若干action.type影响某个属性，从而实现reduce（降低）
const Reducer = combineReducers({
	bz : bzService
});

export default Reducer;
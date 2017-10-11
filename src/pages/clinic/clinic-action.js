
import fetch from 'isomorphic-fetch';
/*
 * action 类型
 */
export const Service = "Service";

/*
 * action 创建函数
 */
export function service( pageNo ){
	return function(dispatch){
		dispatch( requestPosts());
		return fetch(`/app.html?pageNo=${pageNo}`,{
					method:"GET",
				    headers:{
				    	'Content-type' : "application/json;charset=utf-8"
				    }
				}).then(function(response){
					return response.text();
				}).then(function(json){
					json={html:"",logic:""}
					switch(pageNo){
						case 1:
							json.html = '<form><label>身高</label><input id="sg"/><p><label>体重</label><input id="tz"/></form>';
							break;
						case 2:
							json.logic="xy:tz>140;";
							json.html = '<form><label id>血压</label><input id="xy"/><p><label>血糖</label><input id="xt"/></form>';
							break;
						case 3:
							json.logic="cy:tz>140;";
							json.html = '<form><label>抽烟</label><input id="cy"/><p><label>喝酒</label><input id="hj"/></form>';
							break;
						default:
							json.html = '<div>defalut</div>';
							break;
					}
				    dispatch( receivePosts(json) );
				});
	}
}

export const REQUEST_POSTS="REQUEST_POSTS";
function requestPosts(){
	return {
		type: REQUEST_POSTS
	}
}
export const RECEIVE_POSTS = "RECEIVE_POSTS"
function receivePosts(datas){
	return {
		type: RECEIVE_POSTS,
		result : datas
	}
}
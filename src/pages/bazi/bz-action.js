
import fetch from 'isomorphic-fetch';
import BzCounter from './BzCounter'

/*
 * action 类型
 */
export const CZ = "CZ";

/*
 * action 创建函数
 */
export function czService(birthday,month,clock){
	return function(dispatch){
		dispatch( requestPosts());
		var p = new Promise((resolve,reject)=>{
			var counter = new BzCounter();

			resolve(counter.count(birthday,month,clock))
			return;
		});
		return p.then(function(text){
			dispatch( receivePosts(text) );
		})
		// return fetch(`/stars/bz?birthday=${birthday}&month=${month}&clock=${clock}`,{
		// 			method:"POST",
		// 		    headers:{
		// 		    	'Content-type' : "text/html;charset=utf-8"
		// 		    }
		// 		}).then(function(response){
		// 			return response.text();
		// 		}).then(function(text){
		// 		    dispatch( receivePosts(text) );
		// 		});
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
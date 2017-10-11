
import fetch from 'isomorphic-fetch';

module.exports={
	setCookie : function(c_name,value){

		var newCookie = c_name + "=" + JSON.stringify(value)+";";
		var c_start,c_end=0;
		var oldCookie = document.cookie;
		// if (document.cookie.length>0){
		// 	c_start=document.cookie.indexOf(c_name + "=")
		// 	if (c_start!=-1){ 
		//     	c_start=c_start + c_name.length+1 
		//     	c_end=document.cookie.indexOf(";",c_start)
		//     	if (c_end==-1) c_end=document.cookie.length
		//     	document.cookie = document.cookie.substring(0,c_start) + (value) + document.cookie.substring(c_end);
		// 	} else {
		// 		document.cookie = oldCookie + "; " + newCookie;
		// 	}
		// }else{
			document.cookie = newCookie;
		// }
	},
	getCookie : function(c_name){
		var value = "";
		var c_start,c_end=0;
		if (document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1){ 
		    	c_start=c_start + c_name.length+1 
		    	c_end=document.cookie.indexOf(";",c_start)
		    	if (c_end==-1) c_end=document.cookie.length
		    	value =  (document.cookie.substring(c_start,c_end))
			} 
		}
		try{
			value = JSON.parse(value)
		}catch(ex){
			//console.log("json ex:",ex);
		}
		return value;
	},
	//删除Cookie
	delCookie: function(name){
		var  exp  =  new  Date();
		exp.setTime  (exp.getTime()  -  1);
		var  cval  =  this.getCookie  (name);
		document.cookie  =  name  +  "="  +  cval  +  ";  expires="+  exp.toGMTString();
	},
	post: function(url, data){
		var token = this.getCookie("token");
		if(!token){
			alert("token未获取，请重新登录。");
			//return;
		}
		data.token = token;
		var p = new Promise(function(resolve,reject){
			fetch( url,{
				    method:"POST",
				    headers:{
				    	'Content-type' : "application/json"
				    },
				    body:JSON.stringify(data)
				}).then(function(result){
				    console.log("post success",result);
					if(result.code==200){
						if(resolve){
							resolve(result);
						}else{
							console.log("resolve is not ",result);
						}
					}else{
						alert("异常："+result.msg)
					}
				}).catch(function(ex){
					console.error("err",arguments);
					alert("error");
			  	});
		});
		return p;
	}
}
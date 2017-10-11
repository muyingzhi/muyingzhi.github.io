
require("./css/bootstrap.css");
// require("./css/bootstrap.min.css.map");
require("./css/bootstrap-theme.css");
// require("./css/bootstrap-theme.min.css.map");

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, browserHistory, createMemoryHistory } from 'react-router';
import Layout from "./components/layout"
import Main from "./components/mainBody"
import First from "./pages/first"
import Bazi from "./pages/bazi/bz"
import Clinic from "./pages/clinic/clinic"
import D3test from "./pages/d3/index"
import BaiduMap from "./pages/BaiduMap"
import BabyGrowup from "./pages/BabyGrowup"

// var history = createMemoryHistory(location);
ReactDOM.render(
		<Router history={hashHistory}>
		    <Route path="/" component={Layout}>
		    	<IndexRoute component={First}/>
		    	<Route path="/main" component={Main}/>
		    	<Route path="/first" component={First}/>
		    	<Route path="/clinic" component={Clinic}/>
		    	<Route path="/d3" component={D3test}/>
		    	<Route path="/baiduMap/:type" component={BaiduMap}/>
		    	<Route path="/babyGrowup/:id" component={BabyGrowup}/>
		    </Route>
		    <Route path="/bazi" component={Bazi}/>
		</Router>
,document.getElementById('main'));
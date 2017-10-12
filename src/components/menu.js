import React from "react";
import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Glyphicon} from "react-bootstrap";
import {Link} from 'react-router';
// import auth from "../pages/login/auth";
var Const = require("./Const")

const Obj = React.createClass({
  getInitialState:function(){
    return {};
  },
  changeBread: function(items){
    this.setState({breadItems: items});//---改变bread
  },
  onSelect: function(obj){
    if(obj.key!=="logout"){
      Const.setCookie("menu0",obj.key);
    }
  },
  render: function(){
    var _this = this;
    var user = {};//auth.getUser();

    var defaultKeys = [];
    defaultKeys.push(Const.getCookie("menu0"));
    //-----
    var data = [
      {router:"userManage",text:"用户管理",icon:"user",code:"01",parentCode:"root"},
      {router:"lisCharts",text:"统计图",icon:"line-chart",code:"02",parentCode:"01"},
      {router:"search",text:"搜寻",icon:"search",code:"03",parentCode:"01"},
      {router:"qua4name/2",text:"资质名称维护",icon:"chrome",code:"04",parentCode:"root"},
      {router:"message",text:"消息通知",icon:"star",code:"05",parentCode:"04"},
      {router:"d3",text:"D3",icon:"star",code:"0501",parentCode:"04"},
    ]
    function findChildren(menus,parentCode,startIndex){
      var menuItems = [];

      for(var i=0;i<menus.length;i++){
        var one = menus[i];
        if(one.parentCode == parentCode){
          var items = findChildren(menus,one.code,i+1);
          if(items.length>0){
            var title = one.text;
            menuItems.push(
              <NavDropdown id={"Menu_"+i} key={"Menu_"+i} title={title}>
                {items}
              </NavDropdown >
            );
          }else{
            if(startIndex==0){
              menuItems.push(
              <NavItem id={"Menu_"+i} key={"Menu_"+i} >
                {one.text}
              </ NavItem > );
            }else{
              menuItems.push(
                <MenuItem id={"Menu_"+i} key={"Menu_"+i} >
                  {one.text}
                </ MenuItem >);
            }
          }
        }
      };
      return menuItems;
    }
    var navChildren = findChildren(data,"root",0);

      return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="main">Stars</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={2} ><Link to="first">First</Link></NavItem>
              <NavItem eventKey={3} ><Link to="bazi">八字</Link></NavItem>
              <NavDropdown eventKey={4} title="Download" id="basic-nav-download">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another Action</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav>
              {navChildren}
            </Nav>
            <Nav key="logout">
              <NavItem  eventKey={0}>
                <Glyphicon glyph="folder" />
                <span className="nav-text">退出({user && user.name?user.name:""})</span>
              </NavItem>          
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        );
  }
});
export default Obj;
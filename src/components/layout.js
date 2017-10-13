import React from 'react'
import {Lifecycle} from 'react-router'
import {Grid, Row, Col } from "react-bootstrap";
import Body from './mainBody';
import NavMenu from "./menu";
export default React.createClass({
    getInitialState() {
        return {
            menuKey: "",
            collapse: true,
        };
    },
    mixins: [Lifecycle],
    routerWillLeave(){
        return "确定退出吗？"
    },
    onCollapseChange() {
        this.setState({
          collapse: !this.state.collapse,
        })
    },
    handleClick(e){
        this.setState({menuKey: e.key});
    },
    render(){
        const collapse = this.state.collapse;

        return <Grid fluid={true}>
            <Row>
                <NavMenu/>
            </Row>
            <Row>
                {this.props.children}
            </Row>
        </Grid>
    }
});
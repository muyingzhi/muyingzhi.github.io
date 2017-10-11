import React from "react";
import {Grid, Row, Col, Jumbotron, Button } from "react-bootstrap";

const Container = React.createClass({
    propTypes: {
        //breadItems: React.PropTypes.Array.isRequired
    },
    getInitialState:function(){
        return {};
    },
    render: function(){
        const wellStyles = {margin: '0 auto 10px'};

        const buttonsInstance = (
          <div className="well" style={wellStyles}>
            <Button bsStyle="primary" bsSize="large" block>Block level button</Button>
            <Button bsSize="large" block>Block level button</Button>
          </div>
        );
        return (
            <div>
              <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                  {buttonsInstance}
                  </Col>
              </Row>
              <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                  <Jumbotron>
                      <h1>Hello, world!</h1>
                      <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                      <p><Button bsStyle="primary">Learn more</Button></p>
                  </Jumbotron>
                  </Col>
              </Row>
              <Row>
                  {this.props.children}
              </Row>
            </div>
        );  
    }
});

export default Container;
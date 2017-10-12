import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router";
const First = React.createClass({
  render: function () {
    const wellStyles = { margin: "0 auto 10px" };

    const buttonsInstance = (
      <div className="well" style={wellStyles}>
        <Link to="bazi"><Button bsStyle="primary" bsSize="large" block>干支历</Button></Link>
        <Link to="main"><Button bsStyle="primary" bsSize="large" block>hello world</Button></Link>
        <Link to="clinic"><Button bsStyle="primary" bsSize="large" block>CLINIC</Button></Link>
        <Link to="d3"><Button bsStyle="primary" bsSize="large" block>D3</Button></Link>
        <Link to="baiduMap/api"><Button bsStyle="primary" bsSize="large" block>BaiduMap</Button></Link>
        <Link to="baiduMap/weather"><Button bsStyle="primary" bsSize="large" block>Weather</Button></Link>
        <Link to="baiduMap/note"><Button bsStyle="primary" bsSize="large" block>Note</Button></Link>
        <Link to="babyGrowup/01"><Button bsStyle="primary" bsSize="large" block>Baby Grow Up</Button></Link>

      </div>
    );
    return (
      <div>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            {buttonsInstance}
          </Col>
        </Row>
      </div>);
  }
});

module.exports = First;
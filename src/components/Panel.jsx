import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Panel extends Component {
  render() {
    return (
      <div style={{marginBottom:"4%"}}>
        {/* home page link */}
          <Link to="/"><button className="buttonStyle" style={{width:"25%",marginRight:"5%",fontWeight:"bold",height:"40px"}}>home page</button></Link>
          {/* fevorite list link */}
          <Link to="/fevorite"><button className="buttonStyle" style={{width:"25%",fontWeight:"bold",height:"40px"}}>fevorite citys weather</button></Link>
      </div>
    );
  }
}

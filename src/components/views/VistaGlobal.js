import React, { Component } from "react";
import Sunburst from "react-sunburst-d3-v4";
import data from "./data";
import "./VistaGlobal.css";

class VistaGlobal extends Component {
  render() {
    return (
      <div className="sun">
        <Sunburst
          data={data}
          onSelect={this.onSelect}
          scale="linear"
          tooltipContent={
            <div
              class="sunburstTooltip"
              style="position:absolute; color:'black'; z-index:10; background: #e2e2e2; padding: 5px; text-align: center;"
            />
          }
          tooltip
          tooltipPosition="right"
          keyId="anagraph"
          width="400"
          height="400"
        />
      </div>
    );
  }
}
export default VistaGlobal;

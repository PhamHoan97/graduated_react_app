import React, { Component } from "react";
import OrgChart from "@balkangraph/orgchart.js/orgchart";
class ChartOrganization extends Component {
  shouldComponentUpdate() {
    return true;
  }
  componentDidUpdate() {
    this.chart = new OrgChart(this.refs.tree, {
      tags: {
        "Company": {
            template: "ula"
        },
        "Department": {
            template: "belinda"
        },
        "Role": {
            template: "mery"
        },
        "Employee": {
            template: "deborah"
        }
      },
      layout: OrgChart.mixed,
      nodeBinding: {
        img_0: "img",
        field_0: "name",
        field_1: "title",
      },
      nodes: this.props.nodes,
    });
  }
  render() {
    return <div id="tree" ref="tree"></div>;
  }
}

export default ChartOrganization;

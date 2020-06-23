import React, { Component } from "react";
import OrgChart from "@balkangraph/orgchart.js/orgchart";
class ChartOrganization extends Component {
  shouldComponentUpdate() {
    return true;
  }
  componentDidUpdate() {
    this.chart = new OrgChart(this.refs.tree, {
      enableSearch: false,
      collapse: {
        level: 3,
        allChildren: true
      },
      zoom: {
        speed: 80,
        smooth: 10
      },
      showXScroll: OrgChart.scroll.visible,
      showYScroll: OrgChart.scroll.visible,
      mouseScrool: OrgChart.action.zoom,
      layout: OrgChart.mixed,
      nodeMouseClick: OrgChart.action.none,
      menu: {
        pdf: { text: "Xuất PDF" },
        png: { text: "Xuất PNG" },
        csv: { text: "Xuất CSV" }
      },
      tags: {
        "Công ty": {
            template: "ula"
        },
        "Phòng ban": {
            template: "belinda"
        },
        "Chức vụ": {
            template: "mery"
        },
        "Nhân viên": {
            template: "diva"
        }
      },
      nodeBinding: {
        img_0: "ảnh",
        field_0: "tên",
        field_1: "tiêu đề",
      },
      nodes: this.props.nodes,
    });
    this.chart.editUI.on('field', function(sender, args){
      if (args.name === 'email'){
              return false;
      }
      if (args.name === 'ảnh'){
        return false;
      }
    });
  }
  render() {
    return <div id="tree" ref="tree"></div>;
  }
}

export default ChartOrganization;

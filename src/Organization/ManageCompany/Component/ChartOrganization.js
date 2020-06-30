import React, { Component } from "react";
import OrgChart from "@balkangraph/orgchart.js/orgchart";
import {clickRedirectPageNode} from "../Action/Index";
import { connect } from "react-redux";
class ChartOrganization extends Component {
  shouldComponentUpdate() {
    return true;
  }
  componentDidUpdate() {
    var self =  this;
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
        // field_0: function (sender, node) {
        //   var data = sender.get(node.id);
        //   var name = data["tên"];
        //   var link = data["link"];
        //   return '<a target="_self" href="' + link + '">' + name + '</a>'
        // },
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
    this.chart.on('click', function (sender, args) {
      var data = sender.get(args.node.id);
      self.props.redirectPage(data.link);
    });
  }
  render() {
    return <div id="tree" ref="tree"></div>;
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirectPage: (properties) => {
      dispatch(clickRedirectPageNode(properties))
    }
  };
};
export default connect(null, mapDispatchToProps) (ChartOrganization);


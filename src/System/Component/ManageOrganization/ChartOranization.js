import React, { Component } from 'react';
import OrgChart from '@balkangraph/orgchart.js/orgchart';
class ChartOranization extends Component {
    shouldComponentUpdate() {
        return true;
    }
    componentDidUpdate() {
        OrgChart.templates.company = Object.assign({}, OrgChart.templates.ana);
        OrgChart.templates.company.size = [310, 310];
        OrgChart.templates.company.node =
            '<circle cx="150" cy="150" r="150" fill="hsl(0, 6%, 7%);" stroke-width="1" stroke="hsl(0, 6%, 7%);"></circle>';
        OrgChart.templates.company.field_0 = '<text style="font-size: 13px;font-weight: 700;" fill="hsl(0, 6%, 7%);" x="150" y="150" text-anchor="middle">{val}</text>';
        OrgChart.templates.company.ripple = {
            radius: 20,
            color: "#039BE5",
            rect: null
        };

        OrgChart.templates.department = Object.assign({}, OrgChart.templates.ana);
        OrgChart.templates.department.size = [330, 50];
        OrgChart.templates.department.node =
            '<rect x="0" y="0" width="330" height="50" fill="#ffffff" stroke-width="1" stroke="hsl(0, 6%, 7%);"></rect>';
        OrgChart.templates.department.field_0 = '<text style="font-size: 24px;font-weight: 700;" fill="hsl(0, 6%, 7%);" x="165" y="30" text-anchor="middle">{val}</text>';

        OrgChart.templates.department.ripple = {
            radius: 0,
            color: "#F57C00",
            rect: null
        };

        OrgChart.templates.role = Object.assign({}, OrgChart.templates.ana);
        OrgChart.templates.role.size = [330, 50];
        OrgChart.templates.role.node =
            '<rect x="0" y="0" width="330" height="50" fill="#ffffff" stroke-width="1" stroke="hsl(0, 6%, 7%);"></rect>';
        OrgChart.templates.role.field_0 = '<text style="font-size: 24px;font-weight: 700;" fill="hsl(0, 6%, 7%);" x="165" y="30" text-anchor="middle">{val}</text>';

        OrgChart.templates.role.ripple = {
            radius: 0,
            color: "#F57C00",
            rect: null
        };

        OrgChart.templates.staff = Object.assign({}, OrgChart.templates.ana);
        OrgChart.templates.staff.size = [50, 300];
        OrgChart.templates.staff.node =
            '<rect x="0" y="0" width="50" height="300" fill="#ffffff" stroke-width="1" stroke="hsl(0, 6%, 7%);"></rect>';
        OrgChart.templates.staff.field_0 = '<text transform="rotate(90)"  style="font-size: 22px;font-weight: 700;" fill="hsl(0, 6%, 7%);" x="150" y="-15" text-anchor="middle">{val}</text>';

        OrgChart.templates.staff.ripple = {
            radius: 0,
            color: "#FFCA28",
            rect: null
        };
        this.chart = new OrgChart(this.refs.tree , {
            nodes: this.props.nodes,
            nodeBinding: {
                field_0: "name"
            },
            tags: {
                "Company": {
                    template: "company"
                },
                "Department": {
                    template: "department"
                },
                "Role": {
                    template: "role"
                },
                "Staff": {
                    template: "staff"
                }
            },
        });
    }
    render() {
        return (
             <div id="tree" ref="tree"></div>
        );
    }
}

export default ChartOranization;
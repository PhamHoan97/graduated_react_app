import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Tooltip,
} from 'recharts';
import "../../Style/Notification/chartNotification.css";
export default class PieChartStatistic extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';
  render() {
    return (
        <div>
            <PieChart width={400} height={300}>
                <Pie dataKey="value"
                isAnimationActive={false}
                data={this.props.data}
                cx={200} cy={200}
                outerRadius={80} fill={this.props.color} label />
                <Tooltip />
            </PieChart>
            <div className="question">
                <span className="title-question">Câu {this.props.index} :</span> 
                <span className="name-question">{this.props.title}</span>
            </div>
        </div>
    );
  }
}
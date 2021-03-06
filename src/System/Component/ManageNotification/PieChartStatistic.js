import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell,Tooltip
} from 'recharts';
import "../../Style/Notification/chartNotification.css";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default class PieChartStatistic extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';
  render() {
    return (
        <div>
            <PieChart width={400} height={300}>
              <Pie
                isAnimationActive={false}
                data={this.props.data}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {
                  this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
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